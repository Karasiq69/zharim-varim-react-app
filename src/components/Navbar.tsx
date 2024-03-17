'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ShoppingCart, User} from "lucide-react";
import CartIcon from "@/components/CartIcon";
import {useAppSelector, useAppDispatch} from "@/redux/hooks";
import {logout as setLogout} from "@/redux/features/authSlice";
import {state} from "sucrase/dist/types/parser/traverser/base";
import {useLogoutMutation, useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import {useRouter} from "next/navigation";
import Image from "next/image";


type Props = {};
const Navbar = (props: Props) => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();
    const {isLoading, isFetching} = useRetrieveUserQuery();
    const {isAuthenticated} = useAppSelector(state => state.auth);

    // const isAuthenticated = false
    const handleLogout = () => {
        logout(undefined).unwrap()
            .then(() => {
                dispatch(setLogout())
            }).finally(() => {
            router.push('/')
        })
    }

    const authLinks = (
        <div>auth links</div>
    )
    const guestLinks = (
        <div>guest links</div>
    )

    const user = 1;
    return (
        <div className={' p-3 shadow-md '}>
            <header className="flex justify-between items-center container max-w-6xl">

                <Link className="flex items-center" href="/">
                    <Image
                        alt="Logo"
                        className="rounded-full"
                        height="70"
                        src="/logoblack.svg"
                        style={{

                            objectFit: "cover",
                        }}
                        width="150"
                    />
                </Link>
                <div className={'flex gap-5 items-center'}>

                    {!isLoading && <>
                        <CartIcon/>
                        {isAuthenticated ?
                            <Button className={''} variant="outline" asChild>
                                <Link href={'my-account/'} className={'flex items-center gap-2 font-medium'}>
                                    <User/> Профиль
                                </Link>
                            </Button>
                            :
                            <Button variant="outline" asChild>
                                <Link href={'/auth/login/'}>
                                    Войти
                                </Link>
                            </Button>}
                    </>}
                </div>
            </header>
        </div>
    );
};
export default Navbar;
