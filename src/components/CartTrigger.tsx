import {ShoppingCart} from "lucide-react";
import {useShoppingCart} from "@/app/context/ShoppingCartContext";
import {useRetrieveUserQuery} from "@/redux/features/authApiSlice";

type Props = {
    className?: string;
    onClick?: () => void;
};

const CartTrigger = ({className, onClick}: Props) => {
    const {cartQuantity} = useShoppingCart();
    const {isLoading} = useRetrieveUserQuery();

    return (
        <div
            className={`group -m-2 flex items-center p-5 ${className}`}
            onClick={onClick}
        >
            <ShoppingCart
                aria-hidden="true"
                className={'h-6 w-6 flex-shrink-0 text-gray-900 group-hover:text-green-600'}/>
            <span
                className={'ml-1 text-sm font-bold text-gray-600 group-hover:text-green-600'}>{!isLoading && cartQuantity}</span>
        </div>
    );
};

export default CartTrigger;