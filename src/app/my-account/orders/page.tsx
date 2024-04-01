'use client'
import {Separator} from "@/components/ui/separator";
import UpdateUserForm from "@/components/forms/UpdateUserForm";
import {useGetUsersOrders} from "@/api/queries";
import {Loader} from "lucide-react";
import UsersOrdersList from "@/app/my-account/components/UsersOrdersList";

type Props = {};
const Page = (props: Props) => {
    const {data: orders, isLoading, isError} = useGetUsersOrders()

    if (isLoading) {
        return (
            <div className='flex justify-center my-8'>
                <span className={'animate-spin'}><Loader/></span>
            </div>
        );
    }
    return (
        <>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Заказы</h3>
                    <p className="text-sm text-muted-foreground">
                        Здесь вы можете посмотреть свои заказы.
                    </p>
                </div>
                <Separator/>
                <div className={'space-y-6'}>
                    {!orders ?
                        <div className={'bg-muted max-w-md text-center p-10 rounded-xl'}>
                            <p className={'text-muted-foreground'}>За последние 120 дней заказов нет.</p>
                        </div>
                        :
                        <UsersOrdersList orders={orders}/>
                    }


                </div>
            </div>


        </>
    );
};
export default Page;
