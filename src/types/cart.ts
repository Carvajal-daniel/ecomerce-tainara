// Tipos relacionados ao carrinho de compras
export interface CartItem {
  id: string;
  name: string;
  price: number; // em centavos
  imageUrl: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export interface CartItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}
