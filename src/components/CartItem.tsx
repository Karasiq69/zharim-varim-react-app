'use client'
import {formatPrice} from "@/lib/utils";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";
import {CartItem as CartItemType} from "@/types/types";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import Image from "next/image";
import {Badge} from "@/components/ui/badge"
import placeholderImage from "../../public/placeholder.webp";

type CartItemProps = {
    item: CartItemType;
};

const CartItem: React.FC<CartItemProps> = ({item}) => {
    const {
        removeFromCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        getProductPrice,
    } = useShoppingCart();

    const {
        id,
        product,
        quantity,
        selectedAttribute,
        selectedOptions,
    } = item;

    const {
        title,
        description,
        product_image,
        weight,
    } = product;
    const productImageSrc = product?.product_image?.[0]?.image || placeholderImage


    const price = getProductPrice(id);
    const totalPrice = price * quantity;
    const formattedPrice = formatPrice(totalPrice);
    return (
        <div>
            <div className={'flex gap-3'}>
                <div className={'flex-shrink-0'}>
                    {product_image && (
                        <Image
                            width={500} height={360}
                            className={'rounded-md w-auto h-20'}
                            src={productImageSrc}
                            alt={product_image[0]?.alt_text || ''}
                        />
                    )}
                </div>
                <div className={'space-y-1 flex-col'}>
                    <p className={'font-bold'}>{title} <span
                        className={'text-muted-foreground font-light text-sm'}>{weight && `${weight}г`}</span></p>
                    {selectedAttribute && <span
                        className={'text-xs text-muted-foreground'}><Badge
                        variant="outline">{selectedAttribute?.value} мл</Badge></span>}
                    {selectedOptions && selectedOptions.map((option) => (
                        <span key={option.id} className="text-xs text-muted-foreground">
                            <Badge variant="outline">{option.option_value.label}</Badge>
                        </span>
                    ))}
                    <p className={'text-muted-foreground text-sm'}>{description}</p>
                </div>
            </div>
            <Separator className={'my-3'}/>
            <div className={'flex justify-between items-center '}>
                <div className={'font-bold'}>{formattedPrice} </div>
                <div className={'flex items-center gap-3 rounded-xl bg-muted'}>
                    <div>
                        <Button variant="ghost" size="icon" className={' hover:bg-gray-300'}
                                onClick={() => decreaseCartQuantity(id)}>
                            <Minus/>
                        </Button>
                    </div>
                    <div>
                        <p className={'font-bold text-gray-600'}>{quantity}</p>
                    </div>
                    <div>
                        <Button variant="ghost" className={'  hover:bg-gray-300'} size="icon"
                                onClick={() => increaseCartQuantity(id)}>
                            <Plus/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;