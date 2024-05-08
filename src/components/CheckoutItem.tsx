import {CartItem, Product} from "@/types/types";
import {formatPrice} from "@/lib/utils";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";
import {Badge} from "@/components/ui/badge";

type CheckoutItemProps = {
    item: CartItem;
};

const CheckoutItem: React.FC<CheckoutItemProps> = ({item}) => {
    const {getItemQuantity, getProductPrice} = useShoppingCart();
    const quantity = getItemQuantity(item.id);
    const price = getProductPrice(item.id);
    const totalPrice = price * quantity;

    const {product} = item;
    const {title, description, selectedAttribute, attribute_values, options} = product;

    if (!item) {
        return null;
    }
    console.log(item)

    return (
        <div className={'flex justify-between gap-5'}>
            <div>
                <div className={'font-bold'}>
                    {title} {selectedAttribute && <Badge variant="secondary"> {selectedAttribute.value} мл </Badge>}
                    <span className={'text-muted-foreground font-light'}> x {quantity} </span>
                </div>

                    {item.selectedAttribute &&
                    <Badge variant="secondary">{item.selectedAttribute?.value} мл</Badge>
                    }
                {item.selectedOptions &&
                    <div>{item.selectedOptions?.map((opt) => (
                        <Badge key={opt.id} className={'mr-2'} variant="secondary"> + {opt.option_value.label} </Badge>
                    ))}</div>
                }

                <span className={'text-xs text-muted-foreground'}>{description}</span>
            </div>
            <p className={'font-bold flex-shrink-0'}>{formatPrice(totalPrice)}</p>
        </div>
    );
};

export default CheckoutItem;