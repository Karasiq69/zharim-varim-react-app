import {useQuery} from "@tanstack/react-query";
import {getLastOrder, getOrderById, getProducts, getProductsByCategory} from "@/api/api";
import {Category} from "@/types/types";

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        enabled: false

    })
}

export const useProductsByCategory = () => {
    return useQuery<Category[]>({
        queryKey: ['productsByCat'],
        queryFn: getProductsByCategory,
        staleTime: 1000 * 60 * 60 * 24,
    })
}
export const useGetLastOrder = () => {
    return useQuery({
        queryKey: ['last_order'],
        queryFn: getLastOrder,
        enabled: true

    })
}
export const useGetOrderById = (id: number) => {
    return useQuery({
        queryKey: ['order', id],
        queryFn: () => getOrderById(id),
        enabled: !!id,
    });
};

