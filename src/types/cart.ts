import { AttributeValue, CartItem, OptionValue, Product } from "@/types/types";


export type ShoppingCartContext = {
    getItemQuantity: (id:any) => number;
    addToCart: (product: Product, selectedAttribute?: AttributeValue, selectedOptions?: OptionValue[]) => void;
    increaseCartQuantity: (cartItemId: string) => void;
    decreaseCartQuantity: (cartItemId: string) => void;
    removeFromCart: (cartItemId: string) => void;
    calculateTotalCost: () => number;
    cartItems: CartItem[];
    cartQuantity: number;
    getProductPrice: (id: string) => number;
    clearCart: () => void;
};