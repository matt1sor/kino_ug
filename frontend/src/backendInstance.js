import axios from "axios";

export const backendInstance = axios.create({
  baseURL: "https://localhost:5556/",
});
