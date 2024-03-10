import {Product} from "@/types/types";


export type ShoppingCartContext = {
    openCart?: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
    calculateTotalCost: () => number
    cartItemsWithDetails: any,
}

export type CartItem = {
    id: number
    quantity: number
}

export type CartItemDetails = CartItem & Partial<Product>;
