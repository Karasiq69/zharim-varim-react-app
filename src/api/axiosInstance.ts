import axios, {AxiosError,  AxiosRequestConfig, AxiosResponse} from 'axios';


import {store} from "@/redux/store";
import {logout, setAuth} from "@/redux/features/authSlice";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/v1`;
export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axiosInstance.post('/jwt/refresh/');
                if (refreshResponse.status === 200) {
                    store.dispatch(setAuth());
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                store.dispatch(logout());
                window.location.href = '/auth/login';
            }
        }

        return Promise.reject(error);
    }
);