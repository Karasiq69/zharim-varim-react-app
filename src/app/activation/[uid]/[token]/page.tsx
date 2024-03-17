'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Container from "@/components/Container";
import {useActivationMutation} from "@/redux/features/authApiSlice";
import {useCallback, useEffect} from "react";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

type Props = {
    params: {
        uid: string
        token: string
    }
};
const Page = ({params}: Props) => {
        const [activation] = useActivationMutation();
    const router = useRouter();

    const activateAccount = useCallback(async () => {
        const { uid, token } = params;

        try {
            await activation({ uid, token }).unwrap();
            toast({
                title: "Аккаунт активирован",
                description: "Приятных покупок!",
                variant: "default",
                className: "bg-green-200",
            });
        } catch (error) {
            toast({
                title: "Возникла ошибка.",
                description:
                    "Не удалось активировать аккаунт. Возможно ссылка устарела или уже была использована.",
                variant: "destructive",
            });
        } finally {
            router.push("/auth/login");
        }
    }, [activation, params, router]);

    useEffect(() => {
        activateAccount();
    }, [activateAccount]);


    return (
        <section className={``}>
            <MaxWidthWrapper className={'flex items-center justify-between'}>
                <div className={'flex items-center my-10'}>

                    <h3>Активируем аккаунт....</h3>

                </div>
            </MaxWidthWrapper>

        </section>
    );
};
export default Page;
