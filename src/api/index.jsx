import axios from "axios";
import { useAuth } from "../hooks/useAuth";



export const axiosInstance = axios.create({
    baseURL: "http://localhost/stok-takip/api",
    /* other custom settings */
});

 // Set the AUTH token for any request
 axiosInstance.interceptors.request.use(function (config) {
    const user = useAuth();
    config.headers.Authorization =  user && user.token ? `Bearer ${user.token}` : '';
    return config;
});

export const login = async (username, password) => {
    return axiosInstance.post("/login", {username, password}).then(data => data.data);
}

export const getProducts = async () => {
    return axiosInstance.get("/products").then(data => data.data);
}