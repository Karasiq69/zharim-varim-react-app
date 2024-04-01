import {Metadata} from "next";
import {LoginForm} from "@/components/forms";
import Link from "next/link";
import PasswordResetForm from "@/components/forms/PasswordResetForm";

export const metadata: Metadata = {
    title: 'Восстановление пароля',
    description: 'Страница восстановления пароля'
}

type Props = {};



const Page = (props: Props) => {
    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>

                <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                    Восстановление пароля
                </h2>
            </div>

            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <PasswordResetForm/>

                <p className='mt-10 text-center text-sm text-gray-500'>
                    Не зарегистрированы?
                    <Link
                        href='/auth/register/'
                        className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                    >
                        Зарегистрироваться
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default Page;
