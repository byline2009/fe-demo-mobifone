import axios from "axios";

const APICount = axios.create({
  baseURL: `https://api.countapi.xyz/hit/dashboard-business.com/visits`,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default APICount;
