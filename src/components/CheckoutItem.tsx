import { Product } from "@/types/types";
import { formatPrice } from "@/lib/utils";
import { useShoppingCart } from "@/app/context/ShoppingCartContext";
import { Badge } from "@/components/ui/badge";

type CheckoutItemProps = {
    product: Product;
};

const CheckoutItem: React.FC<CheckoutItemProps> = ({ product }) => {
    const { getItemQuantity, getProductPrice } = useShoppingCart();
    const quantity = getItemQuantity(product);
    const price = getProductPrice(product);
    const totalPrice = price * quantity;

    const { title, description, selectedAttribute } = product;

    if (!product) {
        return null;
    }

    return (
        <div className={'flex justify-between gap-5'}>
            <div>
                <div className={'font-bold'}>
                    {title} {selectedAttribute && <Badge variant="secondary"> {selectedAttribute.value} </Badge>}
                    <span className={'text-muted-foreground font-light'}> x {quantity} </span>
                </div>
                <span className={'text-xs text-muted-foreground'}>{description}</span>
            </div>
            <p className={'font-bold flex-shrink-0'}>{formatPrice(totalPrice)}</p>
        </div>
    );
};

export default CheckoutItem;