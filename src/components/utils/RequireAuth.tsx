'use client'
import {useAppSelector} from "@/redux/hooks";
import {redirect, useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {Loader} from "lucide-react";

type Props = {
    children: React.ReactNode
};
const RequireAuth = ({children}: Props) => {
    const router = useRouter()
    const {toast} = useToast()
    const {isLoading, isAuthenticated} = useAppSelector(state => state.auth);

    if (isLoading) {
		return (
			<div className='flex justify-center my-8'>
				<span className={'animate-spin'}><Loader /></span>
			</div>
		);
	}

    if (!isAuthenticated) {
        // toast({
        //     title: "Произошла ошибка",
        //     description: "Отказано в доступе.",
        //     variant: "destructive",
        // })
        redirect('/auth/login')
    }


    return (
        <>{children}</>
    );
};
export default RequireAuth;
