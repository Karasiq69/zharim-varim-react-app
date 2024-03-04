'use client'
import Form from '@/components/forms/Form'
import {useLogin} from "@/hooks";

export default function LoginForm() {
    const {
        email,
        password,
        onChange,
        isLoading,
        onSubmit,
    } = useLogin()

    const config = [

        {
            labelText: 'Email',
            labelId: 'email',
            type: 'email',
            value: email,
            required: true,
            placeholder: 'Email',
        },

        {
            labelText: 'Пароль',
            labelId: 'password',
            type: 'password',
            value: password,
            required: true,
            placeholder: 'Придумайте пароль',
            link: {
                linkText: 'Забыли пароль?',
                linkUrl: '/auth/password-reset/'
            }
        },

    ]
    return (
        <>
            <Form
                config={config}
                isLoading={isLoading}
                btnText={'Войти'}
                onChange={onChange}
                onSubmit={onSubmit}
            />
        </>
    )
}