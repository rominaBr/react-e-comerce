import React, { createContext, useContext, useState } from "react";
import { CartContextType } from "../../interfaces/interfaces";


const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<number>(0);

  const updateCartItems = (items: number) => {
    setCartItems(items);
  };

  const value = {
    cartItems,
    updateCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
