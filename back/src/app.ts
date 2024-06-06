import express, { NextFunction, Request, Response } from "express";
import axios from "axios";
import { TokenData } from "./interfaces/auth.interface";
import { authenticateToken } from "./middlewares/auth.middleware";
import { User } from "./interfaces/users.interface";
import { allowedUsers } from "./mockDatabase";

const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const router = express.Router();
const port = 3000;
require("dotenv").config();

const generateAccessToken = (user: { email: string }) => {
  const expiresIn: number = 60 * 60;
  return {
    expiresIn,
    token: jwt.sign(user, process.env.AUTH_TOKEN_SECRET, {
      expiresIn,
    }),
  };
};

const generateCookie = (tokenData: TokenData) => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

const options = {
  headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
};

const comparePassword = (plainPass: string, hashword: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(
      plainPass,
      hashword,
      function (err: Error | null, isPasswordMatch?: boolean) {
        return err == null ? resolve(isPasswordMatch) : reject(err);
      }
    );
  });
};

const matchingCredentials = async (userData: User) => {
  const foundUser = Object.values(allowedUsers).find(
    (allowedUser) => userData.email === allowedUser.email
  );
  if (!foundUser) return false;
  return await comparePassword(userData.password, foundUser.password);
};

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: { email: string; password: string } = req.body;
      const match = await matchingCredentials(userData);

      if (match) {
        const authToken = generateAccessToken({ email: userData.email });
        const cookie = generateCookie(authToken);

        res.setHeader("Auth-Cookie", [cookie]);
        res.status(200).json({
          data: { email: userData.email },
          authToken,
          message: "login",
        });
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      res.sendStatus(401);
      console.error(err);
    }
  }
);

router.post("/logout", authenticateToken, (req: Request, res: Response) => {
  try {
    res.setHeader("Auth-Cookie", ["Authorization=; Max-age=0"]);
    res.status(200).json({ message: "logout" });
  } catch (err) {
    console.error(err);
  }
});

router.get("/films", authenticateToken, (req: Request, res: Response) => {
  const getFilms = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=fr&page=1",
        options
      );
      res.status(200).json({ films: response.data });
    } catch (err) {
      console.error(err);
    }
  };
  getFilms();
});

router.get(
  "/:filmId/comments",
  authenticateToken,
  (req: Request, res: Response) => {
    const getComments = async () => {
      try {
        const filmId = req.params.filmId;
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${filmId}/reviews?language=en-US&page=1`,
          options
        );
        res.status(200).json({ comments: response.data });
      } catch (err) {
        console.error(err);
      }
    };
    getComments();
  }
);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/", router);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} 🚀`);
});
