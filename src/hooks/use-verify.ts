import {useCallback, useEffect} from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setAuth, finishInitialLoad } from '@/redux/features/authSlice';
import { useVerifyMutation } from '@/redux/features/authApiSlice';

export default function useVerify() {
    const dispatch = useAppDispatch();
    const [verify] = useVerifyMutation();

    const verifyUser = useCallback(async () => {
        try {
            await verify(undefined).unwrap();
            dispatch(setAuth());
        } finally {
            dispatch(finishInitialLoad());
        }
    }, [dispatch, verify]);

    useEffect(() => {
        verifyUser();
    }, [verifyUser]);
}