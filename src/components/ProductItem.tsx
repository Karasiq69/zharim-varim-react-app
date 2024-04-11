import {Button} from "@/components/ui/button";
import {formatPrice} from "@/lib/utils";
import {AttributeValue, Product} from "@/types/types";
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
import placeholderImage from '../../public/placeholder.webp';

type ProductItemProps = {
    product: Product;
};
import {Badge} from "@/components/ui/badge"

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

    const productImageSrc = product?.product_image?.[0]?.image || placeholderImage;
    return (
        <>

            <div className="flex flex-col h-full rounded-t-sm">
                <Image
                    width={360} height={195} className="rounded-t-sm" src={productImageSrc}
                    alt={product?.product_image?.[0]?.alt_text || ''}
                />

                <div className="p-4 pb-3 space-y-2 flex-grow">
                    <h4 className="font-bold">
                        {title}
                        {weight && <span className={'text-xs font-normal text-muted-foreground ml-2'}>{weight}г</span>}
                    </h4>
                    <p className="text-muted-foreground text-sm">{description}</p>
                </div>




                <div className="p-4 pt-0 mt-auto flex justify-between items-center">
                    <span className="font-bold">
                        {isSpecifications && 'от '}
                        {regular_price && formatPrice(regular_price)}</span>
                    <div className={'bg-muted rounded-xl'}>
                        {isSpecifications ?

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="default">Выбрать</Button>
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
                                                <div className={'flex justify-between gap-3 hover:cursor-pointer'}>
                                                    <Badge variant="outline">{spec.value}мл</Badge>

                                                    <div className={'flex gap-3'}>

                                                        <span
                                                            className={'font-bold flex items-center'}>{formatPrice(spec.price)}</span>
                                                    </div>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            :
                            <>
                                {quantity === 0 ?
                                    <Button onClick={() => addToCart(product)} className={' '}
                                            size={'icon'}
                                            variant="default">
                                        <Plus/>
                                    </Button> :

                                    <div className={'flex items-center gap-2'}>
                                        <div>
                                            <Button variant="ghost" size="icon" className={' hover:bg-gray-300'}
                                                    onClick={() => decreaseCartQuantity(product)}>
                                                <Minus/>
                                            </Button>
                                        </div>
                                        <div>
                                            <p className={'font-bold text-gray-600'}>{quantity}</p>
                                        </div>

                                        <div>
                                            <Button variant="ghost" className={'  hover:bg-gray-300'} size="icon"
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
