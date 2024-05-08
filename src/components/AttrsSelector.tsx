import { AttributeValue, Product } from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

type Props = {
    product: Product;
    onAttributeChange: (attribute: AttributeValue) => void;
};

const AttrsSelector = ({ product, onAttributeChange }: Props) => {
    const handleTabsTriggerChange = (attribute: AttributeValue) => {
        onAttributeChange(attribute);
    };

    return (
        <>
            {product.attribute_values.length > 0 && (
                <>
                    <p className="font-bold">{product.attribute_values[0].attribute.name}:</p>
                    <Tabs>
                        <TabsList className="w-full flex justify-between h-auto ring-0">
                            {product.attribute_values.map((attribute) => (
                                <TabsTrigger
                                    key={attribute.id}
                                    value={attribute.value}
                                    onClick={() => handleTabsTriggerChange(attribute)}
                                    className="w-full h-full focus-visible:ring-0 focus-visible:ring-offset-0"
                                >
                                    <div className="flex gap-1 flex-wrap items-center text-center">
                                        <Image
                                            alt="Выбор размера напитка"
                                            height={6}
                                            width={6}
                                            className="size-6 opacity-60"
                                            src="images/cup.svg"
                                        />
                                        <p className="grid grid-cols-1 text-left">
                                            <span className="text-xs text-muted-foreground">
                                                {attribute.value} мл
                                            </span>
                                            <span className="text-black">
                                                {formatPrice(attribute.price)}
                                            </span>
                                        </p>
                                    </div>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </>
            )}
        </>
    );
};

export default AttrsSelector;