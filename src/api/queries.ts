import {useQuery} from "@tanstack/react-query";
import {getProducts, getProductsByCategory} from "@/api/api";
import {Category} from "@/types/types";

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        enabled: true

    })
}

export const useProductsByCategory = () => {
    return useQuery<Category[]>({
        queryKey: ['productsByCat'],
        queryFn: getProductsByCategory,
        staleTime: 1000 * 60 * 60 * 24,
        enabled: true
    })
}