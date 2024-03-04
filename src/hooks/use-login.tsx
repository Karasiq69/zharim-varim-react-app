'use client'
import {useRouter} from "next/navigation";
import {useLoginMutation} from "@/redux/features/authApiSlice";
import {useToast} from "@/components/ui/use-toast";
import {ChangeEvent, FormEvent, useState} from "react";
import {useAppDispatch} from "@/redux/hooks";
import {setAuth} from "@/redux/features/authSlice";

export default function useLogin() {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const [login, {isLoading}] = useLoginMutation();
    const {toast} = useToast()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        login({email, password})
            .unwrap()
            .then(() => {
                dispatch(setAuth())
                toast({
                    title: "Успешно!",
                    description: "Переход на главную страницу..",
                    variant: "default",
                })
                router.push('/')
            })
            .catch(() => {
                toast({
                    title: "Возникла ошибка.",
                    description: "Проверьте правильность введенных данных и повторите попытку",
                    variant: "destructive",
                })
            })
    }
    return {
        email,
        password,
        onChange,
        isLoading,
        onSubmit,
    }
}
