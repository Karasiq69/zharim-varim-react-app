import {Category, MenuItem} from "@/types/types";
import {axiosInstance} from './axiosInstance';

export const getProducts = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return (await axiosInstance.get<MenuItem[]>('v1/')).data;
}

export const getProductsByCategory = async () => {
    return (await axiosInstance.get<Category[]>('v1/products-by-category/')).data;
}

export const getProduct = async (slug: string) => {
    return (await axiosInstance.get<MenuItem>(`v1/${slug}`)).data;
}

export const createOrder = async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return (await axiosInstance.post('v1/add/', data))
}

export const getLastOrder = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return (await axiosInstance.get('v1/get-last-order/')).data
}
export const getOrderById = async (id: number) => {
    return (await axiosInstance.get(`v1/orders/${id}`)).data;
};
