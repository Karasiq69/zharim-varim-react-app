import {useEffect, useRef} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useAppDispatch} from '@/redux/hooks';
import {setAuth} from '@/redux/features/authSlice';
import {toast} from "@/components/ui/use-toast";


export default function useSocialAuth(authenticate: any, provider: string) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const effectRan = useRef(false);

    useEffect(() => {
        const state = searchParams?.get('state');
        const code = searchParams?.get('code');

        if (state && code && !effectRan.current) {
            authenticate({provider, state, code})
                .unwrap()
                .then(() => {
                    dispatch(setAuth());
                    toast({
                        title: "Успешно!",
                        description: "Вы вошли.",
                        variant: "success",
                        duration: 2000,
                    });
                    router.push('/');
                })
                .catch(() => {
                    toast({
                        title: "Возникла ошибка.",
                        description: "Попробуйте обновить страницу и попробуйте еще раз",
                        variant: "destructive",
                        duration: 2000,
                    })
                    router.push('/auth/login');
                });
        }

        return () => {
            effectRan.current = true;
        };
    }, [authenticate, provider]);
}