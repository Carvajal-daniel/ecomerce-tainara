"use client";

import CartItem from '@/components/common/cart/cartItem';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  totalItems: number;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carrega os itens do localStorage ao montar o componente
  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      try {
        setCartItems(JSON.parse(storedItems));
      } catch (e) {
        console.error("Erro ao ler o carrinho do localStorage", e);
      }
    }
  }, []);

  // Salva no localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item: CartItem) => {
    let message = "";
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        message = `Quantidade atualizada para ${existingItem.quantity + item.quantity} no carrinho!`;
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        message = `"${item.name}" adicionado ao carrinho!`;
        return [...prevItems, item];
      }
    });

    if (message) toast.success(message);
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.error('Item removido do carrinho.');
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve ser usado dentro de um CartProvider');
  return context;
};
