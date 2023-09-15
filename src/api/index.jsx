import axios from "axios";
import { useAuth } from "../hooks/useAuth";

import History from '../history'

import {logout} from '../utils'

export const axiosInstance = axios.create({
    baseURL: "https://stoktakip.gorkembayraktar.com/server/api",
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

export const getList = async () => {
    return axiosInstance.get("/list").then(data => data.data).catch(unAuthorizeRedirect);
}

export const getProducts = async () => {
    return axiosInstance.get("/products").then(data => data.data).catch(unAuthorizeRedirect);
}
export const productDelete = async (product_id) => {
    return axiosInstance.delete(`/product/${product_id}`).then(data => data.data).catch(unAuthorizeRedirect);
}
export const productUpdate = async (product_id, title) => {
    return axiosInstance.post(`/product/${product_id}`, { title }).then(data => data.data).catch(unAuthorizeRedirect);
}
export const productCreate = async (title) => {
    return axiosInstance.post(`/product/create`, { title }).then(data => data.data).catch(unAuthorizeRedirect);
}

export const variantCreate = async ({ product_id, title, stock }) => {
    return axiosInstance.post(`/variant/create`, { product_id, title, stock }).then(data => data.data).catch(unAuthorizeRedirect);
}

export const variantUpdate = async ({ id, title, stock }) => {
    return axiosInstance.post(`/variant/${id}`, { title, stock }).then(data => data.data).catch(unAuthorizeRedirect);
}
export const variantDelete = async (id) => {
    return axiosInstance.delete(`/variant/${id}`).then(data => data.data).catch(unAuthorizeRedirect);
}

export const listCreate = async (data) => {
    return axiosInstance.post(`/list/create`, data).then(data => data.data).catch(unAuthorizeRedirect);
}

export const listDelete = async (id) => {
    return axiosInstance.delete(`/list/${id}`).then(data => data.data).catch(unAuthorizeRedirect);
}
export const listUpdate= async (id, data) => {
    return axiosInstance.post(`/list/${id}`, data).then(data => data.data).catch(unAuthorizeRedirect);
}

export const calculate = async (data) => {
    return axiosInstance.post(`/calculate`, data).then(data => data.data).catch(unAuthorizeRedirect);
}

export const unAuthorizeRedirect = (error) => {
    if(error?.response?.status == 401){
        logout();
        History.navigate('/login');
        return;
    }
    throw new Error(error);
}