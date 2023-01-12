import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: "ko-KR",
  },
});
