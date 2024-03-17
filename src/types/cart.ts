import {Attribute, AttributeValue, CartItem, Product, Specifications} from "@/types/types";

export type ShoppingCartContext = {
    getItemQuantity: (product: Product) => number;
    addToCart: (product: Product, selectedAttribute?: AttributeValue) => void;
    increaseCartQuantity: (product: Product) => void;
    decreaseCartQuantity: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    calculateTotalCost: () => number
    cartItems: CartItem[];
    cartQuantity: number
    getProductPrice: (product: Product) => number
    clearCart: () => void;
};


