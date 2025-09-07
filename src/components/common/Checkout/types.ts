

// Dados do cartão de crédito
export interface CardData {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}


export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface UserAddress {
  id: string;
  cep: string | null;
  rua: string | null;
  bairro: string | null;
  cidade: string | null;
  uf: string | null;
  numero: string | null;
}