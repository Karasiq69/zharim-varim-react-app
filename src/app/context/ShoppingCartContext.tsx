'use client'
import {createContext, ReactNode, useContext, useState} from "react";
import {ShoppingCartContext} from "@/types/cart";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {AttributeValue, CartItem, MenuItem, Product} from "@/types/types";
import {useProductsByCategory} from "@/api/queries";

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}: { children: ReactNode }) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])

    function getItemQuantity(product: Product) {
        const item = cartItems.find((item) => isSameProduct(item.product, product));
        return item ? item.quantity : 0;
    }

    function addToCart(product: Product) {
        const existingItem = cartItems.find((item) =>
            isSameProduct(item.product, product)
        );

        if (existingItem) {
            const updatedCartItems = cartItems.map((item) =>
                isSameProduct(item.product, product)
                    ? {...item, quantity: item.quantity + 1}
                    : item
            );
            setCartItems(updatedCartItems);
        } else {
            const newCartItem: CartItem = {
                product,
                quantity: 1,
            };
            setCartItems([...cartItems, newCartItem]);
        }
    }

    function increaseCartQuantity(product: Product) {
        addToCart(product);
    }

    function decreaseCartQuantity(product: Product) {
        const existingItem = cartItems.find((item) =>
            isSameProduct(item.product, product)
        );

        if (existingItem) {
            if (existingItem.quantity === 1) {
                removeFromCart(product);
            } else {
                const updatedCartItems = cartItems.map((item) =>
                    isSameProduct(item.product, product)
                        ? {...item, quantity: item.quantity - 1}
                        : item
                );
                setCartItems(updatedCartItems);
            }
        }
    }

    function removeFromCart(product: Product) {
        const updatedCartItems = cartItems.filter(
            (item) => !isSameProduct(item.product, product)
        );
        setCartItems(updatedCartItems);
    }


    function isSameProduct(product1: Product, product2: Product) {
        return (
            product1.id === product2.id &&
            product1.selectedAttribute?.id === product2.selectedAttribute?.id
        );
    }

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    function calculateTotalCost() {
        return cartItems.reduce((total, item) => {
            const price = getProductPrice(item.product);
            return total + price * item.quantity;
        }, 0);
    }

    function getProductPrice(product: Product): number {
        if (product.selectedAttribute) {
            return parseFloat(product.selectedAttribute.price);
        } else if (product.discount_price) {
            return parseFloat(product.discount_price);
        } else {
            return parseFloat(product.regular_price);
        }
    }

    function clearCart() {
        setCartItems([]);
    }

    return <ShoppingCartContext.Provider
        value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartItems,
            cartQuantity,
            calculateTotalCost,
            addToCart,
            getProductPrice,
            clearCart,

        }}>
        {children}
    </ShoppingCartContext.Provider>
}