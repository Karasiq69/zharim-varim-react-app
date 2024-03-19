import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {store} from "@/redux/store";
import {logout, setAuth} from "@/redux/features/authSlice";

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api`;
export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
    _retry?: boolean;
}

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfigWithRetry;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshResult = await axios.post(
                    `${baseUrl}/jwt/refresh/`,
                    {},
                    {withCredentials: true}
                );
                store.dispatch(setAuth());
                return axiosInstance(originalRequest);
            } catch (_error) {
                store.dispatch(logout());
                return Promise.reject(_error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;