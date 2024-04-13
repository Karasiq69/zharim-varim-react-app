import {useMutation} from "@tanstack/react-query";
import {addUsersAddress, createOrder, deleteUsersAddresses, updateUser, updateUsersAddress} from "@/api/api";
import {queryClient} from "@/lib/QueryProvider";
import {useToast} from "@/components/ui/use-toast";
import {router} from "next/client";
import {useRouter} from "next/navigation";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {User} from "@/redux/features/authApiSlice";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";

export function useCreateOrderMutation() {
    const {toast} = useToast()
    const router = useRouter();
    const [, setLatestOrder] = useLocalStorage('latest_order', '');
    const {clearCart} = useShoppingCart();


    return useMutation({
        mutationFn: (data: any) => createOrder(data),
        onSuccess: (data) => {
            const yookassaURL = data.data.url
            const order_id = data.data.order_id
            console.log(yookassaURL, order_id, '================')
            if (yookassaURL && order_id) {
                setLatestOrder(order_id);
                window.location.href = yookassaURL
                clearCart();
            } else {
                toast({
                    title: "Успешно!",
                    description: "Благодарим за заказ!",
                    variant: "success",
                    duration: 2000,
                });
                router.push('/checkout/thank-you-page');
                clearCart();
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

export function useUpdateUserMutation() {
    const {toast} = useToast()
    return useMutation({
        mutationFn: (data: any) => updateUser(data),
        onSuccess: (data) => {
            toast({
                title: "Успешно!",
                description: "",
                variant: "success",
                duration: 2000,
            });

        },
        onError: () => {
            toast({
                title: "Возникла ошибка.",
                description: "Попробуйте обновить страницу и попробуйте еще раз",
                variant: "destructive",
                duration: 2000,
            })
        },

        // onSettled: async (_, error) => {
        //     // await queryClient.invalidateQueries({queryKey: ['orders']})
        // },


    })
}


export function useDeleteAddressMutation() {
    const {toast} = useToast()
    return useMutation({
        mutationFn: (id: number) => deleteUsersAddresses(id),
        onSuccess: (data) => {
            toast({
                title: "Успешно!",
                description: "",
                variant: "success",
                duration: 2000,
            });

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
            await queryClient.invalidateQueries({queryKey: ['users-addresses']})
        },


    })
}


export function useAddAddressMutation() {
    const {toast} = useToast()
    return useMutation({
        mutationFn: (data: any) => addUsersAddress(data),
        onSuccess: (data) => {
            toast({
                title: "Успешно!",
                description: "",
                variant: "success",
                duration: 2000,
            });

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
            await queryClient.invalidateQueries({queryKey: ['users-addresses']})
        },


    })
}

export function useUpdateAddressMutation() {
    const {toast} = useToast()
    return useMutation({
        mutationFn: ({id, data}: { id: number; data: any }) => updateUsersAddress(id, data),
        onSuccess: (data) => {
            toast({
                title: "Успешно!",
                description: "Адрес изменен",
                variant: "success",
                duration: 2000,
            });

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
            await queryClient.invalidateQueries({queryKey: ['users-addresses']})
        },


    })
}