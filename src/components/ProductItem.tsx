import {Button} from "@/components/ui/button";
import {formatPrice} from "@/lib/utils";
import {Product} from "@/types/types";
import {Minus, Plus} from "lucide-react";
import {generateCartItemId, useShoppingCart} from "@/app/context/ShoppingCartContext";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import placeholderImage from '../../public/placeholder.webp';
import ProductModalTrigger from "@/components/ProductModalTrigger";
import ProductModal from "@/components/ProductModal";

type ProductItemProps = {
    product: Product;
};

const ProductItem: React.FC<ProductItemProps> = ({product}) => {
    const {
        title,
        regular_price,
        description,
        weight,
    } = product;
    const isProductOptions = product.options?.length > 0
    const isProductAttrs = product.attribute_values?.length > 0
    const productImageSrc = product?.product_image?.[0]?.image || placeholderImage;


    const {getItemQuantity, decreaseCartQuantity, increaseCartQuantity, addToCart} = useShoppingCart();

    const cartItemId = generateCartItemId(product);
    const quantity = getItemQuantity(cartItemId);
    return (
        <>
            <Dialog>
                <div className="flex flex-col ">
                    <ProductModalTrigger>
                        <Image
                            width={500} height={360}
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
                                className="font-bold text-xl"> {(isProductOptions || isProductAttrs) && 'от '} {regular_price && formatPrice(regular_price)}
                        </span>
                            <p className="text-muted-foreground text-sm hidden ">{description}</p>
                        </div>
                    </ProductModalTrigger>
                    <div className="mt-2 justify-between items-center">

                        <div className={'bg-muted rounded-xl'}>
                            <>
                                {quantity === 0 ?
                                    <Button
                                        onClick={() => addToCart(product, product.selectedAttribute, product.selectedOptions)}
                                        className="w-full rounded-sm hover:bg-primary hover:text-white"
                                        size="default"
                                        variant="ghost"
                                    >
                                        <Plus size={15} className="mr-2"/> В корзину
                                    </Button> :

                                    <div className={'flex items-center gap-2'}>
                                        <>
                                            <Button
                                                variant="ghost"
                                                className="hover:bg-gray-300 w-full"
                                                onClick={() => decreaseCartQuantity(cartItemId)}
                                            >
                                                <Minus size={16}/>
                                            </Button>
                                        </>
                                        <>
                                            <p className={'font-bold text-gray-600 mx-0 md:mx-5 text-center'}>{quantity}</p>
                                        </>

                                        <>
                                            <Button
                                                variant="ghost"
                                                className="hover:bg-gray-300 w-full"
                                                onClick={() => increaseCartQuantity(cartItemId)}
                                            >
                                                <Plus size={16}/>
                                            </Button>
                                        </>
                                    </div>
                                }
                            </>
                        </div>
                    </div>
                </div>
                <DialogContent className={'max-w-5xl lg:max-w-screen-lg overflow-y-auto max-h-screen  p-0 md:p-5 '}>
                    <ProductModal
                        productImageSrc={productImageSrc}
                        product={product} onClose={() => {
                    }}/>
                </DialogContent>
            </Dialog>
        </>
    );
};
export default ProductItem;
