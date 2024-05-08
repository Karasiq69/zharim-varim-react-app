'use client';

import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice';
import useSocialAuth from "@/hooks/use-social-auth";
import { Loader } from "lucide-react";
import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <SocialAuthHandler />
        </Suspense>
    );
}

function SocialAuthHandler() {
    const [yandexAuthenticate] = useSocialAuthenticateMutation();
    useSocialAuth(yandexAuthenticate, 'yandex-oauth2');

    return (
        <div className='my-8'>
            <div className='flex justify-center my-8'>
                <span className={'animate-spin'}><Loader/></span>
            </div>
        </div>
    );
}

function Loading() {
    return (
        <div className='my-8'>
            <div className='flex justify-center my-8'>
                <span className={'animate-spin'}><Loader/></span>
            </div>
        </div>
    );
}