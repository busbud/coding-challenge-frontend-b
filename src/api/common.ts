import axios from "axios";

export default axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-type": "application/json",
  }
});
