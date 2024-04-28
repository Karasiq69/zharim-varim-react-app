'use client'
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {User} from "lucide-react";
import {useAppSelector} from "@/redux/hooks";
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import Image from "next/image";

import logoblack from '../../public/logoblack.svg'
import ButtonSkeleton from "@/components/ButtonSkeleton";
import CartSheet from "@/components/CartSheet";

type Props = {};



const Navbar = (props: Props) => {
    const {isLoading} = useRetrieveUserQuery();
    const {isAuthenticated} = useAppSelector(state => state.auth);


    return (
        <div className={' p-3 shadow-md '}>
            <header className="flex justify-between items-center container max-w-6xl">

                <Link className="flex items-center" href="/">
                    <Image
                        alt="Logo"
                        className="rounded-full"
                        src={logoblack}
                        width="150"
                    />
                </Link>
                <div className={'flex gap-5 items-center'}>
                    <CartSheet/>
                    {isLoading ? (
                        <ButtonSkeleton/>
                    ) : (
                        <>
                            {isAuthenticated ? (
                                <Button className={''} variant="outline" asChild>
                                    <Link href={'/my-account/'} className={'flex items-center gap-2 font-medium'}>
                                        <User/> Профиль
                                    </Link>
                                </Button>
                            ) : (
                                <Button variant="outline" asChild>
                                    <Link href={'/auth/login/'}>
                                        Войти
                                    </Link>
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </header>
        </div>
    );
};
export default Navbar;
