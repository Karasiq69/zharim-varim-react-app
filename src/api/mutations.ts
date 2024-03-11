import {useMutation} from "@tanstack/react-query";
import {createOrder} from "@/api/api";
import {queryClient} from "@/lib/QueryProvider";
import {useToast} from "@/components/ui/use-toast";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export function useCreateOrder() {
    const {toast} = useToast()
    const router = useRouter();

    return useMutation({
        mutationFn: (data: any) => createOrder(data),
        onMutate: () => {
        },
        onSuccess: () => {
            toast({
                title: "Успешно!",
                description: "Переход на главную страницу..",
                variant: "default",
                duration: 2000,
            })
            router.push('/checkout/thank-you-page')
        },
        onError: () => {
            toast({
                title: "Возникла ошибка.",
                description: "Попробуйте обновить страницу и попробуйте еще раз",
                variant: "destructive",
                duration: 2000,
            })
        },

        onSettled: async (_, error) => {
            // await queryClient.invalidateQueries({queryKey: ['orders']})
        },


    })
}