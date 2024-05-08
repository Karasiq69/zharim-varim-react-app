'use client';

import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice';
import useSocialAuth from "@/hooks/use-social-auth";
import {Loader} from "lucide-react";
// import { useSocialAuth } from '@/hooks';
// import { Spinner } from '@/components/common';

export default function Page() {
	const [googleAuthenticate] = useSocialAuthenticateMutation();
	useSocialAuth(googleAuthenticate, 'google-oauth2');

	return (
        <div className='my-8'>
            <div className='flex justify-center my-8'>
                <span className={'animate-spin'}><Loader/></span>
            </div>
        </div>
    );
}