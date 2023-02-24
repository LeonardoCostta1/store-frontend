import axios from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_REQUEST,
  headers: {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  }
});
