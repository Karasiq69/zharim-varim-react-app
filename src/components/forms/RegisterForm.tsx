'use client'
import {useRegister} from "@/hooks";
import {Form} from "@/components/forms/index";

type Props = {};
const RegisterForm = (props: Props) => {
    const {
        first_name,
        last_name,
        email,
        password,
        re_password,
        phone,
        onChange,
        isLoading,
        onSubmit,
    } = useRegister()

    const config = [
        {
            labelText: 'Имя',
            labelId: 'first_name',
            type: 'text',
            value: first_name,
            required: true,
            placeholder: 'Имя',
        },
        {
            labelText: 'Фамилия',
            labelId: 'last_name',
            type: 'text',
            value: last_name,
            required: false,
            placeholder: 'Фамилия',
        },
        {
            labelText: 'Email',
            labelId: 'email',
            type: 'email',
            value: email,
            required: true,
            placeholder: 'Email',
        },
        {
            labelText: 'Телефон',
            labelId: 'phone',
            type: 'text',
            value: phone,
            required: true,
            placeholder: 'Телефон!',
        },
        {
            labelText: 'Пароль',
            labelId: 'password',
            type: 'password',
            value: password,
            required: true,
            placeholder: 'Придумайте пароль',
        },
        {
            labelText: 'Повторите пароль',
            labelId: 're_password',
            type: 'password',
            value: re_password,
            required: true,
            placeholder: 'Повторите пароль',
        },
    ]

    return (
        <>
            <Form
                config={config}
                isLoading={isLoading}
                btnText={'Регистрация'}
                onChange={onChange}
                onSubmit={onSubmit}
            />
        </>
    );
};
export default RegisterForm;
