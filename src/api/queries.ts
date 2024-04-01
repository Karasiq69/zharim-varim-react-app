import {useQuery} from "@tanstack/react-query";
import {
    getLastOrder,
    getOrderById,
    getProducts,
    getProductsByCategory,
    getUsersAddresses,
    getUsersOrders
} from "@/api/api";
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

export const useGetUsersOrders = () => {
    return useQuery({
        queryKey: ['users-orders'],
        queryFn: () => getUsersOrders()
    });
};

export const useGetUsersAddresses = () => {
    return useQuery({
        queryKey: ['users-addresses'],
        queryFn: () => getUsersAddresses()
    });
};

