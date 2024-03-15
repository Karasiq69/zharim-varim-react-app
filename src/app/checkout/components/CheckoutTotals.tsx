import Divider from "@/components/ui/Divider";

type Props = {};
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";
import CheckoutItem from "@/components/CheckoutItem";
import {formatPrice} from "@/lib/utils";
import {Product} from "@/types/types";
import {CartItem} from "@/types/cart";

const CheckoutTotals = (props: Props) => {
    const {
        cartQuantity,
        cartItems,
        calculateTotalCost
    } = useShoppingCart()
    const totalCost = calculateTotalCost()


    return (
        <div className={''}>
            <Card className={'drop-shadow-xl border-0'}>
                <CardHeader className={'pb-0'}>
                    <CardTitle>Состав заказа:</CardTitle>
                </CardHeader>
                <Divider className={'my-0'}/>
                <CardContent className={'space-y-2 mt-5'}>
                    {cartItems.map((item: CartItem) => {
                        return (
                            <div key={item.product.id}>
                                <CheckoutItem product={item.product}/>
                            </div>
                        );
                    })}
                </CardContent>
                <Separator className="my-5"/>
                <CardContent>
                    <div className={'flex justify-between'}>
                        <p className={'text-xs text-muted-foreground'}>Доставка</p>
                        <p className={'text-xs font-bold'}>Бесплатно</p>
                    </div>
                    <div className={'flex justify-between'}>
                        <p className={'text-xs text-muted-foreground'}>Позиций: {cartQuantity}
                        </p>
                        <p className={'text-xs font-bold'}>{formatPrice(totalCost)}</p>
                    </div>
                </CardContent>
                <Separator className="my-2"/>

                <CardContent className={'my-5'}>
                    <div className={'flex justify-between'}>
                        <p className={'text-md font-bold'}>Итого:</p>
                        <p className={'text-md font-bold'}>{formatPrice(totalCost)}</p>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
};
export default CheckoutTotals;
