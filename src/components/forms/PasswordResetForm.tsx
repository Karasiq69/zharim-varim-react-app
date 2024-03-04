'use client'

import Form from '@/components/forms/Form'
import useResetPassword from "@/hooks/use-reset-password";

const PasswordResetForm = () => {
    const { email, isLoading, onChange, onSubmit } = useResetPassword();

	const config = [
		{
			labelText: 'Email',
			labelId: 'email',
			type: 'email',
            placeholder: 'Введите email',
			onChange,
			value: email,
			required: true,


		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Восстановить пароль'
			onChange={onChange}
			onSubmit={onSubmit}

		/>
    );
};
export default PasswordResetForm;
