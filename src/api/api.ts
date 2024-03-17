import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {Category, MenuItem} from "@/types/types";
import {axiosInstance} from './axiosInstance';

// const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/v1`;
// export const axiosInstance = axios.create({
//     baseURL: baseUrl,
//     withCredentials: true,
// })



export const getProducts = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return (await axiosInstance.get<MenuItem[]>('/')).data;
}

export const getProductsByCategory = async () => {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    return (await axiosInstance.get<Category[]>('/products-by-category/')).data;
}

export const getProduct = async (slug: string) => {
    return (await axiosInstance.get<MenuItem>(`${slug}`)).data;
}

export const createOrder = async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return (await axiosInstance.post('/add/', data))
}

export const getLastOrder = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return (await axiosInstance.get('/get-last-order/')).data
}
export const getOrderById = async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return (await axiosInstance.get(`/orders/${id}`)).data;
};
