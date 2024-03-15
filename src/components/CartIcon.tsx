'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {ShoppingCart} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {formatPrice} from "@/lib/utils";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";
import CartItem from "@/components/CartItem";
import Image from "next/image";

type Props = {};
const CartIcon = (props: Props) => {
    const {
        cartQuantity,
        cartItems,
        calculateTotalCost,
    } = useShoppingCart();

    const totalCost = calculateTotalCost();


    return (
        <Sheet>
            <SheetTrigger className={'group -m-2 flex items-center p-5'}>
                <ShoppingCart
                    aria-hidden="true"
                    className={'h-6 w-6 flex-shrink-0 text-gray-900 group-hover:text-gray-500'}/>
                <span className={'ml-1 text-sm font-bold text-gray-600 group-hover:text-gray-500'}>{cartQuantity}</span>
            </SheetTrigger>
            <SheetContent className={'bg-muted overflow-auto p-0 h-svh'}>
                <SheetHeader>
                    <SheetTitle className={'p-5'}>
                        <p>Корзина</p>
                        <Separator className={'my-5'}/>
                    </SheetTitle>
                </SheetHeader>
                <div>
                    <div>
                        {cartQuantity > 0
                            ? (
                                <>
                                    <div className={'space-y-3 '}>
                                        {cartItems.map(item => (
                                            <div key={item.product.id} className={'bg-white p-3 drop-shadow-sm'}>
                                                <CartItem
                                                    product={item.product}
                                                    quantity={item.quantity}
                                                />
                                            </div>
                                        ))}

                                    </div>
                                </>
                            ) : (<>
                                <div className={'flex  h-full flex-col items-center justify-center space-y-3'}>
                                    <div>
                                        <Image width={'500'} height={'500'} src="/empty-cart-icon.webp"
                                               className={'mix-blend-darken'} alt=""/>
                                    </div>
                                    <p>В корзине пусто</p>
                                    <Link className={buttonVariants({
                                        variant: 'link',
                                        size: 'sm'
                                    })} href={'/menu'}>Перейти в меню</Link>
                                </div>
                            </>)}
                    </div>
                </div>
                <div className={'p-5 space-y-5 bg-white  absolute bottom-0 w-full'}>

                    <div className={'text-sm'}>
                        <div className={'flex justify-between'}>
                            <p>Товаров в корзине: <span className={'font-medium'}>{cartQuantity}</span></p>
                            <p>{formatPrice(300)}</p>
                        </div>
                        <div className={'flex justify-between'}>
                            <p>Доставка</p>
                            <p>{formatPrice(0)} </p>
                        </div>
                        <Separator className={'my-5'}/>
                        <div className={'flex justify-between font-bold'}>
                            <div>Сумма заказа</div>
                            <div>{formatPrice(totalCost)}</div>
                        </div>
                    </div>
                    <SheetClose asChild>
                        <Link
                            href={'/checkout/'}
                            className={buttonVariants({className: 'w-full'})}>
                            Перейти к оформлению заказа
                        </Link>
                    </SheetClose>
                </div>
            </SheetContent>

        </Sheet>
    );
};
export default CartIcon;
