import { useState, ChangeEvent, FormEvent } from 'react';
import { useResetPasswordMutation } from '@/redux/features/authApiSlice';
import {useToast} from "@/components/ui/use-toast";

export default function useResetPassword() {
    const {toast} = useToast()
	const [resetPassword, { isLoading }] = useResetPasswordMutation();

	const [email, setEmail] = useState('');

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		resetPassword(email)
			.unwrap()
			.then(() => {
				toast({
                    title: "Успешно!",
                    description: "На Вашу почту было отправлено письмо со ссылкой для восстановления пароля",
                    variant: "default",
                })
			})
			.catch(() => {
				toast({
                    title: "Возникла ошибка.",
                    description: "Проверьте правильность введенных данных и повторите попытку позднее",
                    variant: "destructive",
                })
			});
	};

	return {
		email,
		isLoading,
		onChange,
		onSubmit,
	};
}