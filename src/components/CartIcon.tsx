'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {ShoppingBasket, ShoppingCart} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {cn, formatPrice} from "@/lib/utils";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";
import CartItem from "@/components/CartItem";
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";

type Props = {};
const CartIcon = (props: Props) => {
    const {
        cartQuantity,
        cartItems,
        calculateTotalCost,
    } = useShoppingCart();

    const totalCost = calculateTotalCost();
    const {isLoading} = useRetrieveUserQuery();


    return (
        <Sheet>
            <SheetTrigger className={'group -m-2 flex items-center p-5'}>
                <ShoppingCart
                    aria-hidden="true"
                    className={'h-6 w-6 flex-shrink-0 text-gray-900 group-hover:text-gray-500'}/>
                <span className={'ml-1 text-sm font-bold text-gray-600 group-hover:text-gray-500'}>{!isLoading && cartQuantity}</span>
            </SheetTrigger>
            <SheetContent className={'bg-muted overflow-auto p-0 h-svh'}>
                <div className="flex flex-col h-full">
                    <SheetHeader>
                        <SheetTitle className={'p-5'}>
                            <p>Корзина</p>
                        </SheetTitle>
                    </SheetHeader>
                    <div className={'flex-grow overflow-y-auto py-3'}>
                        {cartQuantity > 0
                            ? (
                                <>
                                    <div className={'space-y-3'}>
                                        {cartItems.map(item => (
                                            <div key={item?.product?.id} className={'bg-white p-3 drop-shadow-sm'}>
                                                <CartItem
                                                    product={item?.product}
                                                    quantity={item?.quantity}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={'flex h-full flex-col items-center justify-center space-y-3'}>
                                        <div>
                                            {/*<Image width={'500'} height={'500'} src="/empty-cart-icon.webp"*/}
                                            {/*       className={'mix-blend-darken'} alt=""/>*/}
                                            <ShoppingBasket className={'text-emerald-600'} size={80}/>
                                        </div>
                                        <p className={'font-bold'}>В корзине пусто :(</p>

                                    </div>
                                </>
                            )}
                    </div>
                    <div className={'p-5 space-y-5 bg-white drop-shadow-sm'}>
                        <div className={'text-sm'}>
                            <div className={'flex justify-between'}>
                                <p>Товаров в корзине: <span className={'font-medium'}>{cartQuantity}</span></p>
                                <p>{formatPrice(totalCost)}</p>
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
                                className={cn(
                                    buttonVariants({variant: 'default', className: 'w-full'}),
                                    cartQuantity == 0 && 'pointer-events-none opacity-50',
                                )}
                            >
                                Оформить заказ
                            </Link>
                        </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
export default CartIcon;
