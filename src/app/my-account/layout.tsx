'use client'
import {SidebarNav} from "@/app/my-account/components/sidebar-nav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {Separator} from "@/components/ui/separator"
import RequireAuth from "@/components/utils/RequireAuth";

const sidebarNavItems = [
    {
        title: "Профиль",
        href: "/my-account",
    },
    {
        title: "Мои заказы",
        href: "/my-account/orders",
    },
    {
        title: "Мои адреса",
        href: "/my-account/addresses",
    },
]

type Props = {
    children: React.ReactNode
};


const Layout = ({children}: Props) => {
    return (
        <>
            <RequireAuth>
                <MaxWidthWrapper className={'my-10 space-y-5'}>
                    <div className={'container'}>
                        <div className="space-y-5">
                            <h2 className="text-3xl font-bold tracking-tight">Профиль</h2>
                            <p className="text-muted-foreground max-w-2xl">

                                Из главной страницы аккаунта вы можете посмотреть ваши недавние заказы, настроить
                                платежный
                                адрес и адрес доставки, а также изменить пароль и основную информацию.

                            </p>
                        </div>
                        <Separator className="my-10"/>
                        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                            <aside className="-mx-4 lg:w-1/5">
                                <SidebarNav items={sidebarNavItems}/>
                            </aside>
                            <div className="flex-1">{children}</div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </RequireAuth>
        </>
    )
        ;
};
export default Layout;
