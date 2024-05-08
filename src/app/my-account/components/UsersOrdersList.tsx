import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge";
import {formatPrice} from "@/lib/utils";

type Props = {
    orders: any[]
};
const UsersOrdersList = ({orders}: Props) => {

    return (
        <>
            <Table>
                <TableCaption>Всего заказов: {orders?.length}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Номер заказа </TableHead>
                        <TableHead>Дата заказа</TableHead>
                        <TableHead>Статус заказа</TableHead>
                        <TableHead>Метод оплаты</TableHead>
                        <TableHead className="text-right">Сумма</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders?.map((order) => {
                        return (<TableRow key={order.id}>
                            <TableCell className="font-medium"># {order?.id}</TableCell>
                            <TableCell className={'text-muted-foreground'}>{order?.created_at}</TableCell>
                            <TableCell><Badge variant={'outline'}>{order?.status_display}</Badge></TableCell>
                            <TableCell>{order?.payment_method_display}</TableCell>
                            <TableCell className="text-right">{formatPrice(order?.total_cost)}</TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>


        </>
    );
};
export default UsersOrdersList;
