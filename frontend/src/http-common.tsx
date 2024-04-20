import axios, { AxiosInstance } from "axios";

console.log('Base URL:', process.env.REACT_APP_API_URL);

const baseURL = process.env.REACT_APP_API_URL;

const instance: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    }
});

export default instance;
