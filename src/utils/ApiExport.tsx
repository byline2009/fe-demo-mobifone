import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const APIExport = axios.create({
  baseURL: `${API_URL}`,
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "blob",
});

export default APIExport;
