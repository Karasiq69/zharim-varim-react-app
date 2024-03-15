import {Product} from "@/types/types";
import {formatPrice} from "@/lib/utils";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";

type CheckoutItemProps = {
    product: Product;
};

const CheckoutItem: React.FC<CheckoutItemProps> = ({product}) => {
    const {getItemQuantity} = useShoppingCart();
    const quantity = getItemQuantity(product);

    const {title, description, regular_price} = product;
    if (!product) {
        return null;
    }
    return (
        <div className={'flex justify-between gap-5'}>
            <div>
                <p className={'font-bold'}>
                    {title} <span className={'text-muted-foreground font-light'}>x {quantity}</span>
                </p>
                <span className={'text-xs text-muted-foreground'}>{description}</span>
            </div>
            <p className={'font-bold flex-shrink-0'}>{regular_price && formatPrice(regular_price)}</p>
        </div>
    );
};

export default CheckoutItem;