import {Button} from "@/components/ui/button";
import {formatPrice} from "@/lib/utils";
import {Attribute, AttributeValue, Product, Specifications} from "@/types/types";
import {Minus, Plus} from "lucide-react";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import placeholder from '../../public/placeholder.webp'

type ProductItemProps = {
    product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({product}) => {
    const {
        title,
        regular_price,
        description,
        attribute_values,
        weight,
    } = product;

    const {getItemQuantity, decreaseCartQuantity, increaseCartQuantity, addToCart} = useShoppingCart()
    const quantity = getItemQuantity(product)
    const isSpecifications = attribute_values?.length > 0

    const productImage = product?.product_image?.[0];

    return (
        <>

            <div className="flex flex-col h-full rounded-t-sm">
                <Image width={260} height={195} className="rounded-t-sm" src={productImage?.image}
                       alt={productImage?.alt_text || ''}/>

                <div className="p-4 pb-3 space-y-2 flex-grow">
                    <h4 className="font-bold">
                        {title}
                        {weight && <span className={'text-xs font-normal text-muted-foreground ml-2'}>{weight}г</span>}
                    </h4>
                    <p className="text-muted-foreground text-sm">{description}</p>
                </div>

                <div className="p-4 pt-0 mt-auto flex justify-between items-center">
                    <span className="font-bold">{regular_price && formatPrice(regular_price)}</span>
                    <div>
                        {isSpecifications ?
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className={'bg-emerald-300'}>Выбрать</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Выберите размер:</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        {attribute_values?.map((spec: AttributeValue) => (
                                            <DropdownMenuItem key={spec.value}
                                                              onClick={() =>
                                                                  addToCart({
                                                                      ...product,
                                                                      selectedAttribute: spec,
                                                                  })
                                                              }>
                                                <div className={'flex justify-between gap-3'}>
                                                    <span
                                                        className="h-6 w-6 font-bold flex items-center">{spec.value}</span>
                                                    <div className={'flex gap-3'}>
                                                        <p className={'text-gray-600'}>Добавить за</p>
                                                        <span
                                                            className={'font-bold flex items-center'}>{formatPrice(spec.price)}</span>
                                                    </div>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </>
                            :
                            <>
                                {quantity === 0 ?
                                    <Button onClick={() => addToCart(product)} className={'bg-emerald-300'}
                                            size={'icon'}
                                            variant="ghost"><Plus/></Button> :
                                    <div className={'flex items-center gap-2'}>
                                        <div>
                                            <Button variant="ghost" size="icon"
                                                    onClick={() => decreaseCartQuantity(product)}>
                                                <Minus/>
                                            </Button>
                                        </div>
                                        <div>
                                            <p className={'font-bold text-gray-600'}>{quantity}</p>
                                        </div>

                                        <div>
                                            <Button variant="ghost" size="icon"
                                                    onClick={() => increaseCartQuantity(product)}>
                                                <Plus/>
                                            </Button>
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>

        </>
    );
};
export default ProductItem;
