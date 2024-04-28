import {ArrowUpToLine} from "lucide-react";
import {animateScroll as scroll} from 'react-scroll';
import CartSheet from "@/components/CartSheet";

type Props = {};
const CartIconFloating = (props: Props) => {
    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 500,
            smooth: 'easeInOutQuart',
        });
    };
    return (
        <div className={'fixed bottom-4 left-4 z-50'}>
            <div className={' flex gap-2 items-center'}>
                <div
                    className={'bg-white drop-shadow-xl rounded-xl z-50 hover:drop-shadow-none h-14 w-24 items-center justify-center flex text-center'}>
                    <CartSheet />
                </div>
                <div
                    onClick={scrollToTop}
                    className={'bg-white opacity-60 hover:opacity-100 drop-shadow-xl rounded-xl z-50 hover:drop-shadow-none h-14 w-14 items-center justify-center flex text-center hover:text-green-600 cursor-pointer'}>
                    <ArrowUpToLine/>
                </div>
            </div>
        </div>
    );
};
export default CartIconFloating;
