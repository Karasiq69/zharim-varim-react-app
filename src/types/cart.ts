import {Product} from "@/types/types";


export type ShoppingCartContext = {
    openCart?: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
    // getCartItemsWithDetails: () => CartItemDetails[];
}

export type CartItem = {
    id: number
    quantity:number
}

export type CartItemDetails = CartItem & Partial<Product>;
