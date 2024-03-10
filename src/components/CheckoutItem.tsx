import {Product} from "@/types/types";
import {formatPrice} from "@/lib/utils";

type Props = {
    item: Product
};
const CheckoutItem = (props: Props) => {
    return (
        <div className={'flex justify-between gap-5'}>
            <div className={''}>
                <p className={'font-bold'}>{props.item.title} <span className={'text-muted-foreground font-light'}>x {props.item.quantity}</span></p>
                <span
                    className={'text-xs text-muted-foreground'}>{props.item.description}</span>
            </div>
            <p className={'font-bold flex-shrink-0'}>{props.item.regular_price && formatPrice(props.item.regular_price)}</p>
        </div>
    );
};
export default CheckoutItem;
