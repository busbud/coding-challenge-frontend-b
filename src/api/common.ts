import axios from "axios";

export default axios.create({
  baseURL: "https://napi.busbud.com",
  headers: {
    "Content-type": "application/json",
    "X-Busbud-Token" : "PARTNER_c9g6z7V0SNqUlnar2EFsxw"
  }
});
