'use client'
import {useAppSelector} from "@/redux/hooks";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";

type Props = {
    children: React.ReactNode
};
const RequireAuth = ({children}: Props) => {
    const router = useRouter()
    const {toast} = useToast()
    const {isLoading, isAuthenticated} = useAppSelector(state => state.auth)

    if (!isAuthenticated) {
        toast({
            title: "Произошла ошибка",
            description: "Отказано в доступе.",
            variant: "destructive",
        })
        router.push('/auth/login')
    }


    return (
        <>{children}</>
    );
};
export default RequireAuth;
