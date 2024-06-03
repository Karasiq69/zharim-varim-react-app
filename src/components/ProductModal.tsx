import {DialogClose} from "@/components/ui/dialog";
import {AttributeValue, OptionValue, Product} from "@/types/types";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {formatPrice} from "@/lib/utils";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";

import AttrsSelector from "@/components/AttrsSelector";
import AdditionsSelector from "@/components/AdditionsSelector";
import {useMemo, useState} from "react";
import {CheckedState} from "@radix-ui/react-menu";


type ProductModalProps = {
    product: Product;
    onClose: () => void;
    // isSpecifications: boolean
    // isOptions?: boolean
    productImageSrc: any
};

const ProductModal: React.FC<ProductModalProps> = ({
                                                       product,
                                                       onClose,
                                                       productImageSrc
                                                   }) => {

    const isProductOptions = product.options?.length > 0
    const isProductAttrs = product.attribute_values?.length > 0

    const [selectedAttribute, setSelectedAttribute] = useState<AttributeValue | undefined>(undefined);
    const [selectedOptions, setSelectedOptions] = useState<OptionValue[]>([]);
    const {addToCart} = useShoppingCart();


    const calculateModalPrice = useMemo(() => {
    let basePrice = 0;

    if (selectedAttribute && selectedAttribute.price) {
      basePrice = parseFloat(selectedAttribute.price);
    } else if (product && product.regular_price) {
      basePrice = parseFloat(product.regular_price);
    }

    const optionsPrice = selectedOptions.reduce((total, option) => {
      if (option.option_value && option.option_value.price) {
        return total + parseFloat(option.option_value.price);
      }
      return total;
    }, 0);

    return basePrice + optionsPrice;
  }, [selectedAttribute, product, selectedOptions]);

  const modalPrice = useMemo(() => formatPrice(calculateModalPrice), [calculateModalPrice]);


    const handleAddToCart = () => {
        addToCart(product, selectedAttribute, selectedOptions);
        onClose();
    };
    const handleAttributeChange = (attribute: AttributeValue) => {
        setSelectedAttribute(attribute);
    };
    const handleOptionChange = (option: OptionValue, checked: CheckedState) => {
        if (checked) {
            setSelectedOptions([...selectedOptions, option]);
        } else {
            setSelectedOptions(selectedOptions.filter((o) => o.id !== option.id));
        }
    };


    return (
        <>
            <div>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-3 items-center '}>
                    <div className={'p-5'}>
                        <Image width={500} height={360} className={'h-auto w-full  rounded-sm   '}
                               src={productImageSrc}
                               alt={product?.product_image?.[0]?.alt_text || ''}/>
                    </div>
                    <div className={'space-y-5'}>
                        <div className={'px-5 space-y-3'}>
                            <h3 className={'font-bold'}>{product.title}</h3>
                            {product.weight && <p className={'text-muted-foreground'}>{product.weight} г.</p>}
                            <p>{product.description && <>{product.description}</>}</p>
                        </div>

                        {isProductAttrs &&
                            <div className={'space-y-5 px-5'}>
                                <Separator/>
                                <AttrsSelector onAttributeChange={handleAttributeChange} product={product}/>

                            </div>
                        }


                        {isProductOptions &&
                            <div className={'space-y-5 px-5'}>
                                <Separator/>
                                <AdditionsSelector onOptionChange={handleOptionChange} product={product}/>
                            </div>
                        }

                        <div
                            className={'sticky bottom-0 bg-white p-5 md:p-5 drop-shadow-mid md:drop-shadow-none'}>
                            <Separator className={'mb-3 hidden md:block'}/>
                            <div className={'flex gap-10 items-center flex-wrap justify-between'}>
                                <h4 className={'font-bold text-2xl text-nowrap'}>{modalPrice}</h4>

                                <DialogClose asChild>
                                    <Button onClick={handleAddToCart}>В корзину</Button>
                                </DialogClose>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>
    );
};

export default ProductModal;