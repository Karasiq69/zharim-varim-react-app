'use client'
import {createContext, ReactNode, useContext, useState} from "react";
import {CartItem, CartItemDetails, ShoppingCartContext} from "@/types/cart";
import {useProductsByCategory} from "@/api/queries";
import {Product} from "@/types/types";
import {useLocalStorage} from "@/hooks/useLocalStorage";


const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}: { children: ReactNode }) {

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart',[]);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)


    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            // Исправлено условие: проверяем, существует ли элемент
            if (currItems.find(item => item.id === id) == null) {
                // Если элемента нет, добавляем его с количеством 1
                return [...currItems, {id, quantity: 1}];
            } else {
                // Если элемент есть, увеличиваем его количество
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1};
                    } else {
                        return item;
                    }
                });
            }
        });
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

//    function getCartItemsWithDetails(): CartItemDetails[] {
//     // const { data: categories } = useProductsByCategory();
//     const categories = []
//     const allProducts: Product[] = categories?.reduce((acc: Product[], category) => [...acc, ...category.products], []) ?? [];
//
//     return cartItems.map(cartItem => {
//         const productDetails = allProducts.find((product: Product) => product.id === cartItem.id);
//         return {
//             ...cartItem,
//             ...productDetails,
//         };
//     });
// }




    return <ShoppingCartContext.Provider
        value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartItems,
            cartQuantity,
            // getCartItemsWithDetails,
        }}>
        {children}
    </ShoppingCartContext.Provider>
}