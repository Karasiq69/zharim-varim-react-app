'use client'

import {useGetLastOrder, useGetOrderById} from "@/api/queries";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {BadgeCheck, Ban, Loader} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useEffect} from "react";
import {useRouter, useSearchParams} from "next/navigation";

const Page = () => {
    // const {data, isLoading, isSuccess, isError, error} = useGetLastOrder();
    const searchParams = useSearchParams();
    const order_id = searchParams.get('order_id');
    const { data, isLoading, isSuccess, isError, error, refetch } = useGetOrderById(Number(order_id));

    useEffect(() => {
        if (order_id) {
            refetch();
        }
    }, [order_id, refetch]);

    let cardTitle, cardDescription, cardIcon;

    if (isLoading) {
        cardTitle = 'Проверяем оплату...'
        cardDescription = 'Пожалуйста, подождите..'
        cardIcon = <Loader className="mr-2 h-8 w-8 animate-spin"/>
    } else if (isError) {
        cardTitle = 'Произошла ошибка'
        cardDescription = `${error?.message}`
        cardIcon = <Ban className="mr-2 h-8 w-8 text-red-600"/>
    } else if (isSuccess) {
        if (data.paid === true) {
            cardTitle = "Успешно!";
            cardDescription = "Оплата прошла успешно. Спасибо за ваш заказ!";
            cardIcon = <BadgeCheck className="mr-2 h-8 w-8 text-green-600"/>
        } else {
            cardTitle = "Упс..";
            cardDescription = "Оплата не прошла. Пожалуйста, попробуйте снова.";
            cardIcon = <Ban className="mr-2 h-8 w-8 text-red-600"/>
        }
    }
    return (
        <div>
            <MaxWidthWrapper className={'mt-10 mb-20 '}>

                <div className={'max-w-md mx-auto'}>
                    <Card>
                        <CardHeader className={'space-y-5'}>
                            {cardIcon}
                            <CardTitle>
                                {!order_id && <div className={'text-destructive'}>Не удалось найти ваш заказ. Повторите попытку позже</div>}
                                {cardTitle}
                            </CardTitle>
                            <CardDescription>
                                {cardDescription}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <div className={'mt-10 text-center'}>
                        <Button variant={'default'} asChild>
                            <Link href={'/'}>Вернуться на главную</Link>
                        </Button>
                    </div>
                </div>

            </MaxWidthWrapper>


        </div>
    );
};

export default Page;
