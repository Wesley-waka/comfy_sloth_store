import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:
        "https://comfy-sloth-backend.fly.dev",
});
