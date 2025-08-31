"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  removeItem: (itemId: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem: CartContextType["addItem"] = (item, quantity) =>
    setCartItems((items) =>
      items.some((i) => i.id === item.id)
        ? items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [...items, { ...item, quantity: quantity }]
    );

  const removeItem: CartContextType["removeItem"] = (itemId) =>
    setCartItems((items) => items.filter((i) => i.id !== itemId));

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
};