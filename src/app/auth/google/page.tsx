'use client';

import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice';

import LoaderSpinner from "@/components/common/LoaderSpinner";
import useSocialAuth from "@/hooks/use-social-auth";

export default function Page() {
	const [googleAuthenticate] = useSocialAuthenticateMutation();
	useSocialAuth(googleAuthenticate, 'google-oauth2');

	return (
		<div className='my-8'>
			<LoaderSpinner />
		</div>
	);
}