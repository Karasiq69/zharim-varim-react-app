import {useMutation} from "@tanstack/react-query";
import {createOrder} from "@/api/api";
import {queryClient} from "@/lib/QueryProvider";
import {useToast} from "@/components/ui/use-toast";
import {router} from "next/client";
import {useRouter} from "next/navigation";
import {useLocalStorage} from "@/hooks/useLocalStorage";

export function useCreateOrderMutation() {
    const {toast} = useToast()
    const router = useRouter();
    const [, setLatestOrder] = useLocalStorage('latest_order', '');


    return useMutation({
        mutationFn: (data: any) => createOrder(data),
        onSuccess: (data) => {
            const yookassaURL = data.data.url
            const order_id = data.data.order_id
            if (yookassaURL && order_id) {
                setLatestOrder(order_id);
                window.location.href = yookassaURL
            } else {
                toast({
                    title: "Успешно!",
                    description: "Благодарим за заказ!",
                    variant: "success",
                    duration: 2000,
                });
                // Перенаправление на страницу благодарности в той же вкладке
                router.push('/checkout/thank-you-page');
            }
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