'use client';

import {useLogoutMutation, useRetrieveUserQuery} from '@/redux/features/authApiSlice';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {Input} from "@/components/ui/input"
import LoadingButton from "@/components/ui/loading-button";
import {Button} from "@/components/ui/button";
import {useAppDispatch} from "@/redux/hooks";
import {logout as setLogout} from '@/redux/features/authSlice';
import {Loader} from "lucide-react";
import {useUpdateUserMutation} from "@/api/mutations";
import UpdateUserForm from "@/components/forms/UpdateUserForm";
import UsersOrdersList from "@/app/my-account/components/UsersOrdersList";
import {Separator} from "@/components/ui/separator";

function ProfileForm() {
    return null;
}

export default function Page() {
    const {data: user, isLoading, isFetching} = useRetrieveUserQuery();
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    if (isLoading) {
        return (
            <div className='flex justify-center my-8'>
                <span className={'animate-spin'}><Loader/></span>
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

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Профиль</h3>
                    <p className="text-sm text-muted-foreground">
                        Здесь вы можете отредактировать свои данные.
                    </p>
                </div>
                <Separator/>
                <div className={'space-y-6'}>

                    {user && <UpdateUserForm user={user}/>}
                </div>
                <ProfileForm/>
            </div>


        </>
    );
}