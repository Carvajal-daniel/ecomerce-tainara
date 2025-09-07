// Tipos relacionados ao checkout e pagamento
export interface CardData {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

export interface DeliveryAddress {
  cep: string;
  rua: string;
  bairro: string;
  cidade: string;
  uf: string;
  numero: string;
  complemento?: string;
}

export interface PaymentMethod {
  type: 'credit' | 'debit' | 'pix' | 'boleto';
  cardData?: CardData;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  items: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
  }[];
}

export interface CheckoutFormData {
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  orderNotes?: string;
}

