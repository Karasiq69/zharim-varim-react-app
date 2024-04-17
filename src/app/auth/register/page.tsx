import RegisterForm from "@/components/forms/RegisterForm";

type Props = {};
import type {Metadata} from "next";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export const metadata = {
    title: 'Регистрация',
    description: '| Жарим Варим'
}

const Register = (props: Props) => {


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Регистрация
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <RegisterForm/>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Уже есть профиль?{' '}
                        <Button asChild variant={'link'}>
                            <Link href={'login'}
                            className="font-semibold leading-6 px-0">
                            Войти
                        </Link>
                        </Button>
                    </p>
                </div>
            </div>
        </>
    );
};
export default Register;
