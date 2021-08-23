import axios from "axios";

export default axios.create({
  // baseURL: "https://api.rmuti.ac.th/km_api/api",
  baseURL: "http://localhost:4000/api",

  headers: {
    "Content-type": "application/json",
  },
});
