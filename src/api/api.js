import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  api_key: process.env.REACT_APP_API_KEY,
  language: "ko-KR",
});
