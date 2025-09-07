"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CartItem, CartContextType } from '@/types';
import { getCartItems, setCartItems } from '@/utils/storage';


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carrega os itens do localStorage ao montar o componente
  useEffect(() => {
    const storedItems = getCartItems();
    if (storedItems && storedItems.length > 0) {
      setCartItems(storedItems);
    }
  }, []);

  // Salva no localStorage sempre que o carrinho mudar
  useEffect(() => {
    setCartItems(cartItems);
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

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Carrinho limpo!');
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addItem, 
      removeItem, 
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve ser usado dentro de um CartProvider');
  return context;
};
