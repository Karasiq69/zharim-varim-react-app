import {Button} from "@/components/ui/button";
import {formatPrice} from "@/lib/utils";
import {AttributeValue, Product} from "@/types/types";
import {CircleFadingPlusIcon, Minus, Plus, PlusCircle} from "lucide-react";
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

            <div className="flex flex-col h-full  ">
                <Image
                    width={360} height={200}
                    className="rounded-sm w-auto h-auto transition-all duration-300 group-hover:-translate-y-1"
                    src={productImageSrc}
                    alt={product?.product_image?.[0]?.alt_text || ''}
                />

                <div className="mt-2 md:px-2 flex-grow">
                    <p>{weight &&
                        <span className={'text-xs font-normal text-muted-foreground  '}>{weight}г</span>}</p>
                    <div className="mt-2 md:min-h-[3.5rem]">
                        <p className="overflow-hidden line-clamp-2 truncate-chars text-sm md:text-base	">{title}</p>
                    </div>
                    <span
                        className="font-bold text-xl"> {isSpecifications && 'от '} {regular_price && formatPrice(regular_price)}
                        </span>
                    <p className="text-muted-foreground text-sm hidden ">{description}</p>
                </div>


                <div className="mt-2 justify-between items-center">

                    <div className={'bg-muted rounded-xl'}>
                        {isSpecifications ?

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild key={product.id}>
                                    <Button className={'w-full rounded-sm hover:bg-primary hover:text-white'}
                                            size={'default'}
                                            variant="ghost">
                                        <Plus size={15} className={'mr-2'}/> В корзину
                                    </Button>
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
                                    <Button onClick={() => addToCart(product)}
                                            className={'w-full rounded-sm hover:bg-primary hover:text-white'}
                                            size={'default'}
                                            variant="ghost">
                                        <Plus size={15} className={'mr-2'}/> В корзину
                                    </Button> :

                                    <div className={'flex items-center gap-2'}>
                                        <>
                                            <Button variant="ghost" className={' hover:bg-gray-300 w-full '}
                                                    onClick={() => decreaseCartQuantity(product)}>
                                                <Minus size={16}/>
                                            </Button>
                                        </>
                                        <>
                                            <p className={'font-bold text-gray-600 mx-0 md:mx-5 text-center'}>{quantity}</p>
                                        </>

                                        <>
                                            <Button variant="ghost" className={'hover:bg-gray-300 w-full'}
                                                    onClick={() => increaseCartQuantity(product)}>
                                                <Plus size={16}/>
                                            </Button>
                                        </>
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
