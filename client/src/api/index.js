import axios from "axios";
import { BASE_URL } from "../utils/constants";

const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

API.interceptors.request.use((req) => {
    // configure request
    return req;
});

API.interceptors.response.use(
    (response) => {
        // Do something with the response data
        return response;
    },
    (error) => {
        // Do something with the response error
        console.log(error)
        if (error?.response?.data?.err?.name === "TokenExpiredError") {
            console.log('token expired')
            window.location.href = '/signin?expired=true';
        }
        return Promise.reject(error);
    }
);

export default API


