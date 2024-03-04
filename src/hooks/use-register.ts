'use client'
import {useRouter} from "next/navigation";
import {useRegisterMutation} from "@/redux/features/authApiSlice";
import {useToast} from "@/components/ui/use-toast";
import {ChangeEvent, FormEvent, useState} from "react";

export default function useRegister() {
    const router = useRouter();
    const [register, {isLoading}] = useRegisterMutation();
    const {toast} = useToast()

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
        phone: '',
    });

    const {first_name, last_name, email, password, re_password, phone} = formData;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        register({email, phone, password, re_password})
            .unwrap()
            .then(() => {
                toast({
                    title: "Успешно!",
                    description: "Подтвердите свой Email на почте, мы только что отправили письмо",
                    variant: "default",
                })
                router.push('/auth/login')
            })
            .catch(() => {
                toast({
                    title: "Возникла ошибка.",
                    description: "Проверьте правильность введенных данных и повторите попытку позднее",
                    variant: "destructive",
                })
            })
    }
    return {
        first_name,
        last_name,
        email,
        password,
        re_password,
        phone,
        onChange,
        isLoading,
        onSubmit,
    }
}
