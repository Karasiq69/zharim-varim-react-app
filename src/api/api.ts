import axios from "axios";
import {Category, MenuItem} from "@/types/types";

const baseUrl = 'https://api.zharim-varim.top/api/v1';
export const axiosInstance = axios.create({baseURL: baseUrl})

export const getProducts = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
     return (await axiosInstance.get<MenuItem[]>('/')).data;
}

export const getProductsByCategory = async () => {
    // await new Promise(resolve => setTimeout(resolve, 1000));
     return (await axiosInstance.get<Category[]>('/products-by-category/')).data;
}

export const getProduct = async (slug:string) => {
    return (await axiosInstance.get<MenuItem>(`${slug}`)).data;
}