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


            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default AddToCartDropdown;
