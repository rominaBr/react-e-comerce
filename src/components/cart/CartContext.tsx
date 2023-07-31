import React, { createContext, useContext, useState } from "react";
import { CartContextType, CartItem } from "../../interfaces/interfaces";


const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const updateCartItems = (items: CartItem[]) => {
        setCartItems(items);
    };

    const removeCartItem = (itemId: number) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
    };
    
    const value = {
        cartItems,
        updateCartItems,
        removeCartItem
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
