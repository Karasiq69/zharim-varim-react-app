import {Product, Specifications} from "@/types/types";


// export type ShoppingCartContext = {
//     openCart?: () => void
//     getItemQuantity: (id: number) => number
//     increaseCartQuantity: (id: number) => void
//     decreaseCartQuantity: (id: number) => void
//     removeFromCart: (id: number) => void
//     cartQuantity: number
//     cartItems: CartItem[]
//     calculateTotalCost: () => number
//     cartItemsWithDetails: any,
//     addToCart: any,
// }

export type ShoppingCartContext = {
    getItemQuantity: (product: Product) => number;
    addToCart: (product: Product, quantity?: number) => void;
    increaseCartQuantity: (product: Product) => void;
    decreaseCartQuantity: (product: Product) => void;
    removeFromCart: (product: Product) => void;
    calculateTotalCost: () => number
    cartItems: CartItem[];
    cartQuantity: number
};

export interface CartItem {
    product: Product
    quantity: number;
}
