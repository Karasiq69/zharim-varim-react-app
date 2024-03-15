'use client'
import {createContext, ReactNode, useContext, useState} from "react";
import {CartItem, ShoppingCartContext} from "@/types/cart";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {MenuItem, Product} from "@/types/types";
import {useProductsByCategory} from "@/api/queries";

// type ProductAttributes = {
//     [key: string]: string;
// };
//
// type Product = {
//     id: string;
//     name: string;
//     price: number;
//     attributes?: ProductAttributes;
// };
//
// type CartItem = {
//     product: Product;
//     quantity: number;
// };
const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}: { children: ReactNode }) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

    // const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    // const {data: categories} = useProductsByCategory();
    // const allProducts: Product[] = categories?.reduce((acc: Product[], category) => [...acc, ...category.products], []) ?? [];


    // function getItemQuantity(id: number) {
    //     return cartItems.find(item => item.id === id)?.quantity || 0;
    // }


    // function increaseCartQuantity(id: number) {
    //     setCartItems(currItems => {
    //
    //         if (currItems.find(item => item.id === id) == null) {
    //             return [...currItems, {id, quantity: 1}];
    //         } else {
    //
    //             return currItems.map(item => {
    //                 if (item.id === id) {
    //                     return {...item, quantity: item.quantity + 1};
    //                 } else {
    //                     return item;
    //                 }
    //             });
    //         }
    //     });
    // }

    // function addToCart(id: number, selectedSpecification: { value: string, price: string }) {
    //     setCartItems(currItems => {
    //         const existingItem = currItems.find(item =>
    //             item.id === id && item.selectedSpecification?.value === selectedSpecification.value
    //         );
    //         if (!existingItem) {
    //             return [...currItems, {
    //                 id,
    //                 quantity: 1,
    //                 selectedSpecification
    //             }];
    //         } else {
    //             return currItems;
    //         }
    //     });
    // }
    //
    //
    // function increaseCartQuantity(id: number) {
    //     setCartItems(currItems => currItems.map(item => {
    //         if (item.id === id) {
    //             return {...item, quantity: item.quantity + 1};
    //         }
    //         return item;
    //     }));
    // }
    //
    //
    // function decreaseCartQuantity(id: number) {
    //     setCartItems(currItems => currItems.reduce<CartItem[]>((acc, item) => {
    //         if (item.id !== id) {
    //             acc.push(item);
    //         } else if (item.quantity > 1) {
    //             acc.push({...item, quantity: item.quantity - 1});
    //         }
    //         return acc;
    //     }, []));
    // }
    function getItemQuantity(product: Product) {
        const item = cartItems.find((item) => isSameProduct(item.product, product));
        return item ? item.quantity : 0;
    }

    function addToCart(product: Product, quantity: number = 1) {
        const existingItem = cartItems.find((item) =>
            isSameProduct(item.product, product)
        );

        if (existingItem) {
            const updatedCartItems = cartItems.map((item) =>
                isSameProduct(item.product, product)
                    ? {...item, quantity: item.quantity + quantity}
                    : item
            );
            setCartItems(updatedCartItems);
        } else {
            const newCartItem: CartItem = {
                product,
                quantity,
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

    // Вспомогательная функция для сравнения товаров
    function isSameProduct(product1: Product | undefined, product2: Product | undefined) {
        if (!product1 || !product2) {
            return false;
        }

        return (
            product1.id === product2.id &&
            JSON.stringify(product1.attributes) === JSON.stringify(product2.attributes)
        );
    }

    // function increaseCartQuantity(id: number) {
    //     setCartItems(currItems => {
    //         const productDetails = allProducts.find(product => product.id === id);
    //         if (!productDetails) return currItems; // Если продукт не найден, возвращаем текущие элементы без изменений
    //
    //         const newItem = {
    //             id,
    //             title: productDetails.title,
    //             quantity: 1
    //         };
    //
    //         if (currItems.find(item => item.id === id) == null) {
    //             return [...currItems, newItem];
    //         } else {
    //             return currItems.map(item => item.id === id ? {...item, quantity: item.quantity + 1} : item);
    //         }
    //     });
    // }
    //
    // function decreaseCartQuantity(id: number) {
    //     setCartItems(currItems => {
    //         if (currItems.find(item => item.id === id)?.quantity === 1) {
    //             return currItems.filter(item => item.id !== id)
    //         } else {
    //             return currItems.map(item => {
    //                 if (item.id === id) {
    //                     return {...item, quantity: item.quantity - 1}
    //                 } else {
    //                     return item
    //                 }
    //             })
    //         }
    //     })
    // }

    // function removeFromCart(id: number) {
    //     setCartItems(currItems => {
    //         return currItems.filter(item => item.id !== id)
    //     })
    // }

    // function calculateTotalCost() {
    //     return cartItems.reduce((total, cartItem) => {
    //         const productDetails = allProducts.find(product => product.id === cartItem.id);
    //         const price = +(productDetails?.regular_price ?? 0);
    //         const quantity = cartItem.quantity ?? 0;
    //         return total + price * quantity;
    //     }, 0);
    // }
    //
    // function getCartItemsWithDetails() {
    //     return cartItems.map(cartItem => {
    //         const productDetails = allProducts.find(product => product.id === cartItem.id);
    //         return {
    //             ...cartItem,
    //             ...productDetails,
    //         };
    //     });
    // }


    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );

    function calculateTotalCost() {
        return cartItems.reduce((total, item) => {
            const price = item.product.attributes && item.product.attributes.price
                ? parseFloat(item.product.attributes.price)
                : item.product.discount_price
                    ? parseFloat(item.product.discount_price)
                    : parseFloat(item.product.regular_price);
            return total + price * item.quantity;
        }, 0);
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

        }}>
        {children}
    </ShoppingCartContext.Provider>
}