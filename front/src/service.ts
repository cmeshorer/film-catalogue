import axios from "axios";

const token = localStorage.getItem("token");
const options = {
  headers: { Authorization: `Bearer ${token}` },
};

export const loginService = async (email: string, password: string) => {
  const response = await axios.post(`http://localhost:3000/login`, {
    email,
    password,
  });
  return response;
};

export const logoutService = async () => {
  const response = await axios.post(
    `http://localhost:3000/logout`,
    undefined,
    options
  );
  return response;
};

export const getFilmListService = async () => {
  const response = await axios.get("http://localhost:3000/films", options);
  return response;
};

export const getFilmCommentsService = async (filmId: string) => {
  const response = await axios.get(
    `http://localhost:3000/${filmId}/comments`,
    options
  );
  return response;
};
