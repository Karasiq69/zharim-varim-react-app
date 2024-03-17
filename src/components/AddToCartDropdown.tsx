import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {Attribute, Specifications} from "@/types/types";
import {formatPrice} from "@/lib/utils";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";

type Props = {
    id: number
    attributes: Attribute[]
};

const AddToCartDropdown = (props: Props) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className={'bg-emerald-300'}>Выбрать</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Выберите размер:</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {props.attributes.map((spec) => (
                    <DropdownMenuItem key={spec.value} >
                        <div className={'flex   justify-between gap-3'}>
                            <span className="h-6 w-6  font-bold flex items-center">{spec.value}</span>
                            <div className={'flex gap-3'}>
                                <p className={'text-gray-600'}>Добавить за</p>
                                <span className={'  font-bold flex items-center'}>{formatPrice(spec.price)}</span>
                            </div>
                        </div>
                    </DropdownMenuItem>
                ))}


            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default AddToCartDropdown;
