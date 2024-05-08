import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { OptionValue, Product } from "@/types/types";
import { formatPrice } from "@/lib/utils";
import {CheckedState} from "@radix-ui/react-menu";

type Props = {
    product: Product;
    onOptionChange: (option: OptionValue, checked: CheckedState) => void;
};

const AdditionsSelector = ({ product, onOptionChange }: Props) => {
    const handleCheckboxChange = (option: OptionValue, checked: CheckedState) => {
        onOptionChange(option, checked);
    };

    return (
        <>
            {product.options.map((option) => (
                <div key={option.id} className="items-center flex space-x-2">
                    <Checkbox
                        id={`option-${option.id}`}
                        checked={product.selectedOptions?.some((o) => o.id === option.id)}
                        onCheckedChange={(checked) => handleCheckboxChange(option, checked)}
                        className="h-8 w-8 bg-gray-50 border-2"
                    />
                    <div className="grid gap-1.5 leading-none">
                        <Label
                            htmlFor={`option-${option.id}`}
                            className="text-sm cursor-pointer flex font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            <p>{option.option_value.label}</p>
                            <span className="text-muted-foreground font-normal ml-1">
                                (+{formatPrice(option.option_value.price)})
                            </span>
                        </Label>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AdditionsSelector;