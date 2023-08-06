import React, { createContext, useContext, useEffect, useState } from "react";
import { CartContextType, CartItem } from "../../interfaces/interfaces";
import { CART_STORAGE_KEY } from "../../consts/consts";


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

    useEffect(() => {
      const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    }, [])

    const updateCartItems = (items: CartItem[]) => {
        setCartItems(items);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    };

    const removeCartItem = (itemId: number) => {
        
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCartItems));
        
    };

    const emptyCartItems = () => {
      localStorage.removeItem(CART_STORAGE_KEY);
      setCartItems([]);
    }
    
    const value = {
        cartItems,
        updateCartItems,
        removeCartItem,
        emptyCartItems
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
