'use client'
import {formatPrice} from "@/lib/utils";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";
import {Product} from "@/types/types";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";


const CartItem = ({id, description, title, product_image, regular_price, quantity}: Product) => {
    const {
        removeFromCart,
        increaseCartQuantity,
        decreaseCartQuantity
    } = useShoppingCart()

    const numericPrice = typeof regular_price === 'string' ? parseFloat(regular_price) : regular_price ?? 0;
    const totalQuantity = quantity ?? 0;
    const totalPrice = numericPrice * totalQuantity;
    const formattedPrice = formatPrice(totalPrice);


    return (

        <div>
            <div className={'flex gap-3'}>
                <div className={'flex-shrink-0'}>
                    {product_image &&
                        <img height={80} width={80}
                             className={'rounded-md'}
                             src={product_image[0]?.image} alt={product_image[0]?.alt_text || ''}/>}
                </div>
                <div className={'space-y-1 flex-col'}>
                    <p className={'font-bold'}>{title}</p>
                    <p className={'text-muted-foreground text-sm'}>{description}</p>
                </div>
            </div>
            <Separator className={'my-3'}/>
            <div className={'flex justify-between items-center'}>
                <div className={'font-bold'}>{formattedPrice}</div>

                <div className={'flex items-center gap-3  rounded-xl'}>
                    <div>
                        <Button variant="outline" size={'sm'} onClick={() => increaseCartQuantity(id)}>
                            <Plus size={15}/>
                        </Button>
                    </div>
                    <p className={'font-medium text-gray-600 items-center'}>{quantity}</p>
                    <div>
                        <Button variant="outline" size={'sm'} onClick={() => decreaseCartQuantity(id)}>
                            <Minus size={15}/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default CartItem;
