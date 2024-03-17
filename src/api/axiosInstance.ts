import axios, { AxiosError, AxiosResponse } from 'axios';
import { store } from "@/redux/store";
import { logout, setAuth } from "@/redux/features/authSlice";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/v1`;
export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config: any) => {
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
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await axios.post(`${baseUrl}/jwt/refresh/`, null, {
                    withCredentials: true,
                });

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