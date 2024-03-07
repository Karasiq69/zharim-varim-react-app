'use client';

import {useLogoutMutation, useRetrieveUserQuery} from '@/redux/features/authApiSlice';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {Input} from "@/components/ui/input"
import LoadingButton from "@/components/ui/loading-button";
import {Button} from "@/components/ui/button";
import {useAppDispatch} from "@/redux/hooks";
import { logout as setLogout } from '@/redux/features/authSlice';

export default function Page() {
    const {data: user, isLoading, isFetching} = useRetrieveUserQuery();
    const config = [

        {
            label: 'ID',
            value: user?.id,
        },
        {
            label: 'Email',
            value: user?.email,
        },
    ];
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    if (isLoading || isFetching) {
        return (
            <div className='flex justify-center my-8'>
                loding...
            </div>
        );
    }

    const handleLogout = () => {
        logout(undefined)
            .unwrap()
            .then(() => {
                dispatch(setLogout());
            });
    };

    return (
        <>
            <section className={'my-10'}>
                <MaxWidthWrapper>
                    <h2 className={'my-5'}>Профиль</h2>
                    <div className={'max-w-md p-5 border-2  border-gray-200'}>
                        <ul role='list' className='divide-y divide-gray-100'>
                            {config.map(({label, value}) => (
                                <li key={label} className='flex justify-between gap-x-6 py-5'>
                                    <div>
                                        <p className='text-sm font-semibold leading-6 text-gray-900'>
                                            {label}
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-sm font-semibold leading-6 text-gray-900'>
                                            {value || <div>loading...</div>}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </MaxWidthWrapper>
            </section>

            <section>
                <MaxWidthWrapper className={'space-y-5'}>
                    <h3>Личные данные</h3>
                    <div className={'max-w-xs space-y-5'}>
                        <Input type={'email'} placeholder={'email'} autoComplete={'email'}/>
                        <Input type={'text'} placeholder={'Имя'} autoComplete={'name'}/>
                        <Input type={'tel'} placeholder={'Телефон'} autoComplete={'tel'}/>
                        <LoadingButton isLoading={isLoading} variant={'secondary'}>Сохранить</LoadingButton>
                    </div>


                </MaxWidthWrapper>
            </section>

            <section className={'my-10'}>
                <MaxWidthWrapper className={'space-y-5'}>
                    <h3>История заказов</h3>
                    <div>
                        <p className={'text-muted-foreground'}>За последние 120 дней заказов нет.</p>
                    </div>


                </MaxWidthWrapper>
            </section>

            <section className={'my-15'}>
                <MaxWidthWrapper>
                    <div>
                        <hr className={'divider'}></hr>
                    </div>
                </MaxWidthWrapper>
            </section>
            <section className={'mt-10'}>
                <MaxWidthWrapper className={'space-y-5'}>
                    <Button variant={'destructive'} onClick={handleLogout}>Выйти из аккаунта</Button>
                </MaxWidthWrapper>
            </section>

        </>
    );
}