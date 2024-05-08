import {useEffect, useRef} from 'react';
import {useAppDispatch} from '@/redux/hooks';
import {setAuth, finishInitialLoad} from '@/redux/features/authSlice';
import {useVerifyMutation} from '@/redux/features/authApiSlice';

export default function useVerify() {
    const dispatch = useAppDispatch();

    const [verify] = useVerifyMutation();

    const isCalled = useRef(false);

    useEffect(() => {
        //TODO isCalled это херня или не?
        if (isCalled.current) return;
        isCalled.current = true;
        verify(undefined)
            .unwrap()
            .then(() => {
                dispatch(setAuth());
            })
            .catch((error) => {

            })
            .finally(() => {
                dispatch(finishInitialLoad());
            });
    }, []);
}