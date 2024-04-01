"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"

import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button";
import {useLogoutMutation, useRetrieveUserQuery} from "@/redux/features/authApiSlice";
import {useAppDispatch} from "@/redux/hooks";
import LoadingButton from "@/components/ui/loading-button";
import {Separator} from "@/components/ui/separator";
import {logout as setLogout} from "@/redux/features/authSlice";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
    }[]
}

export function SidebarNav({className, items, ...props}: SidebarNavProps) {
    const pathname = usePathname()
    const {data: user, isLoading, isFetching} = useRetrieveUserQuery();
    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        logout(undefined)
            .unwrap()
            .then(() => {
                dispatch(setLogout());
            });
    };
    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        buttonVariants({variant: "ghost"}),
                        pathname === item.href
                            ? "bg-muted hover:bg-muted"
                            : "hover:bg-transparent hover:underline",
                        "justify-start"
                    )}
                >
                    {item.title}
                </Link>
            ))}
            <div>
                <Separator/>
                <LoadingButton size={'sm'} variant={'link'}
                               onClick={handleLogout}
                               className={'hover:bg-transparent hover:underline justify-start px-4 text-destructive'}
                               isLoading={isLoading}>
                    Выйти
                </LoadingButton>

            </div>
        </nav>
    )
}