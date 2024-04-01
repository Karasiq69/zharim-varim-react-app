import {Badge} from "@/components/ui/badge";


type Props = {
    order: any
};
const OrderItem = ({order}: Props) => {
    return (
        <div className={'flex p-5 rounded-xl gap-5 bg-stone-100'}>
            <div className={'flex-none'}>
                <Badge variant="outline">#{order.id}</Badge>
            </div>
            <div className={'flex-none'}>2</div>
            <div>dsdsadsa</div>
            <div>dsdsadsa</div>
            <div>dsdsadsa</div>
        </div>
    );
};
export default OrderItem;
