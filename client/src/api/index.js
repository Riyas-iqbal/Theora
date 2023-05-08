import axios from "axios";
import { BASE_URL } from "../utils/constants";

const API = axios.create({ baseURL: BASE_URL });

// API.interceptors.request.use((req) => {
//     // do something
//     return req;
// });


export function createCourseAPI(body, route) {
    return API.post(`/tutor/courses/create`,
        body, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })
}