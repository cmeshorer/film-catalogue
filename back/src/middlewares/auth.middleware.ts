import { NextFunction, Response, Request } from "express";

const jwt = require("jsonwebtoken");

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")
    ? req.header("Authorization")?.split("Bearer ")[1]
    : null;

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.AUTH_TOKEN_SECRET as string,
    (error: any, user: any) => {
      console.error(error);
      if (error) return res.sendStatus(403);
      //@ts-ignore
      req.user = user;
      next();
    }
  );
};
