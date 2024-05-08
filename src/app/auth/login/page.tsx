import Link from 'next/link';
// import { LoginForm } from '@/components/forms';
// import { SocialButtons } from '@/components/common';
import type {Metadata} from 'next';
import {LoginForm} from "@/components/forms";
import {Button} from "@/components/ui/button";
import SocialButtons from "@/components/common/SocialButtons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {Separator} from "@/components/ui/separator";

export const metadata: Metadata = {
    title: 'Логин',
    description: 'Жарим Варим',
};

export default function Page() {
    return (
        <MaxWidthWrapper>
            <div className='flex flex-1 flex-col flex-grow justify-center px-6 py-12 lg:px-8   '>
                <div className=' mx-auto sm:w-full sm:max-w-sm'>

                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Войти в профиль
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-10 rounded-md'>
                    <LoginForm/>
                    <div className="my-6 flex items-center justify-between">
                        <span className="border-b w-1/2 lg:w-1/3"></span>
                        <a href="#" className="text-xs text-center text-gray-500 uppercase">или</a>
                        <span className="border-b w-1/2 lg:w-1/3"></span>
                    </div>
                    <SocialButtons/>
                    <Separator className={'mt-6'}/>
                    <p className='mt-10 text-center text-sm text-gray-500'>
                        Не зарегистрированы?{' '}
                        <Button asChild variant={'link'}>
                            <Link href={'/auth/register/'}
                                  className="font-semibold leading-6 px-0">
                                Зарегистрироваться
                            </Link>
                        </Button>

                    </p>

                </div>

            </div>
        </MaxWidthWrapper>
    )
        ;
}