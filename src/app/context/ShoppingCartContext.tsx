'use client'
import {createContext, ReactNode, useCallback, useContext, useMemo} from "react";
import {ShoppingCartContext} from "@/types/cart";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {AttributeValue, CartItem, OptionValue, Product} from "@/types/types";
import {useToast} from "@/components/ui/use-toast";
import {BadgeCheck} from "lucide-react";
import {nanoid} from 'nanoid';

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function generateCartItemId(product: Product, selectedAttribute?: AttributeValue, selectedOptions?: OptionValue[]) {
    const attributeId = selectedAttribute ? selectedAttribute.id : '';
    const optionIds = selectedOptions ? selectedOptions.map((option) => option.id).join(',') : '';
    return `${product.id}-${attributeId}-${optionIds}`;
}

export function ShoppingCartProvider({children}: { children: ReactNode }) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])
    const {toast} = useToast();

    const getItemQuantity = useCallback((cartItemId: string) => {
        const item = cartItems.find((item) => item.id === cartItemId);
        return item ? item.quantity : 0;
    }, [cartItems]);

    function addToCart(product: Product, selectedAttribute?: AttributeValue, selectedOptions?: OptionValue[]) {
        const cartItemId = generateCartItemId(product, selectedAttribute, selectedOptions);
        const existingItem = cartItems.find((item) => item.id === cartItemId);

        if (existingItem) {
            const updatedCartItems = cartItems.map((item) =>
                item.id === cartItemId ? {...item, quantity: item.quantity + 1} : item
            );
            setCartItems(updatedCartItems);
        } else {
            const newCartItem: CartItem = {
                id: cartItemId,
                product,
                quantity: 1,
                selectedAttribute,
                selectedOptions,
            };
            setCartItems([...cartItems, newCartItem]);
            toast({
                description: <div className={'flex gap-5'}>
                    <div><BadgeCheck className={'text-green-600'}/></div>
                    <div>Товар добавлен</div>
                </div>,
            })
        }
    }

    function increaseCartQuantity(cartItemId: string) {
        const existingItem = cartItems.find((item) => item.id === cartItemId);
        if (existingItem) {
            const updatedCartItems = cartItems.map((item) =>
                item.id === cartItemId ? {...item, quantity: item.quantity + 1} : item
            );
            setCartItems(updatedCartItems);
        }
    }

    function decreaseCartQuantity(cartItemId: string) {
        const existingItem = cartItems.find((item) => item.id === cartItemId);
        if (existingItem) {
            if (existingItem.quantity === 1) {
                removeFromCart(cartItemId);
            } else {
                const updatedCartItems = cartItems.map((item) =>
                    item.id === cartItemId ? {...item, quantity: item.quantity - 1} : item
                );
                setCartItems(updatedCartItems);
            }
        }
    }

    function removeFromCart(cartItemId: string) {
        const updatedCartItems = cartItems.filter((item) => item.id !== cartItemId);
        setCartItems(updatedCartItems);
    }

    // const cartQuantity = cartItems.reduce(
    //     (quantity, item) => item.quantity + quantity,
    //     0
    // );
    const cartQuantity = useMemo(
        () => cartItems.reduce((quantity, item) => item.quantity + quantity, 0),
        [cartItems]
    );

    function calculateTotalCost() {
        return cartItems.reduce((total, item) => {
            const price = getProductPrice(item.id);
            return total + price * item.quantity;
        }, 0);
    }


    function getProductPrice(cartItemId: string): number {
        const item = cartItems.find((item) => item.id === cartItemId);
        if (!item) return 0;

        let price = parseFloat(item.product.regular_price);

        if (item.product.discount_price) {
            price = parseFloat(item.product.discount_price);
        }

        if (item.selectedAttribute) {
            price = parseFloat(item.selectedAttribute.price);
        }

        if (item.selectedOptions && item.selectedOptions.length > 0) {
            const optionsPrice = item.selectedOptions.reduce(
                (total, option) => total + parseFloat(option.option_value.price),
                0
            );
            price += optionsPrice;
        }

        return price;
    }

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, [setCartItems]);

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