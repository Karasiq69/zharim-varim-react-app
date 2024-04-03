import {Category, MenuItem} from "@/types/types";
import {axiosInstance} from './axiosInstance';
import {User} from "@/redux/features/authApiSlice";

export const getProducts = async () => {
    return (await axiosInstance.get<MenuItem[]>('v1/')).data;
}

export const getProductsByCategory = async () => {
    return (await axiosInstance.get<Category[]>('v1/products-by-category/')).data;
}

export const getProduct = async (slug: string) => {
    return (await axiosInstance.get<MenuItem>(`v1/${slug}`)).data;
}

export const createOrder = async (data: any) => {
    return (await axiosInstance.post('v1/add/', data))
}

export const getLastOrder = async () => {
    return (await axiosInstance.get('v1/get-last-order/')).data
}
export const getOrderById = async (id: number) => {
    return (await axiosInstance.get(`v1/orders/${id}`)).data;
};

export const updateUser = async (data: User) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return (await  axiosInstance.put(`/users/me/`, data))
}
export const getUsersOrders = async () => {
    return (await  axiosInstance.get(`/v1/get-users-orders/`)).data
}

export const getUsersAddresses = async () => {
    return (await  axiosInstance.get(`/user-addresses/`)).data
}

export const deleteUsersAddresses = async (id:number) => {
    return (await  axiosInstance.delete(`/user-addresses/${id}`))
}

export const addUsersAddress = async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return (await  axiosInstance.post(`/user-addresses/`, data))
}

export const updateUsersAddress = async (id:number, data: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return (await  axiosInstance.put(`/user-addresses/${id}/`, data))
}