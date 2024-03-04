import {Button} from "@/components/ui/button";
import {formatPrice} from "@/lib/utils";
import {Product} from "@/types/types";
import {Minus, Plus} from "lucide-react";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";

type ProductItemProps = Pick<Product, 'id' | 'title' | 'regular_price' | 'discount_price' | 'description'> & {
    imageURL: string;
    alt_text: string | undefined;
};

const ProductItem: React.FC<ProductItemProps> = ({
                                                     id,
                                                     title,
                                                     imageURL,
                                                     regular_price,
                                                     discount_price,
                                                     alt_text,
                                                     description,
                                                 }) => {

    const {getItemQuantity, removeFromCart, decreaseCartQuantity, increaseCartQuantity} = useShoppingCart()
    const quantity = getItemQuantity(id)


    const handleClickAddToCart = (id: number) => {
        console.log(id, 'clicked!!')
    }
    return (
        <>
            <div className="flex flex-col h-full rounded-t-sm">
                <img className="rounded-t-sm" src={imageURL} alt={alt_text}/>

                <div className="p-4 pb-3 space-y-2 flex-grow">
                    <h4 className="font-bold">{title}</h4>
                    <p className="text-muted-foreground text-sm">{description}</p>
                </div>

                <div className="p-4 pt-0 mt-auto flex justify-between items-center">
                    <span className="font-bold">{regular_price && formatPrice(regular_price)}</span>
                    <div>

                        {quantity === 0 ?
                            <Button onClick={() => increaseCartQuantity(id)} className={'bg-emerald-100'} size="icon"
                                    variant="ghost"><Plus/></Button> :


                            <div className={'flex items-center gap-2'}>
                                <div>
                                    <Button variant="ghost" size="icon" onClick={() => increaseCartQuantity(id)}>
                                        <Plus/>
                                    </Button>
                                </div>
                                <div>
                                    <p className={'font-bold text-gray-600'}>{quantity}</p>
                                </div>
                                <div>
                                    <Button variant="ghost" size="icon" onClick={() => decreaseCartQuantity(id)}>
                                        <Minus/>
                                    </Button>
                                </div>
                            </div>
                        }

                    </div>

                </div>
            </div>

        </>
    );
};
export default ProductItem;
