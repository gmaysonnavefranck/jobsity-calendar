import axios from "axios";

export const apiClient = axios.create({
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});
