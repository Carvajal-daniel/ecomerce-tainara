// Tipos relacionados a produtos
export interface ProductVariation {
  id: string;
  name: string;
  price: number; // em centavos
  product_id: string;
  slug: string;
  sizes?: string | null;
  color: string;
  image_url: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface ProductCategory {
  id: string;
  name: string;
  imageUrl?: string | null;
  slug: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  is_active: boolean;
  category_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  // Relacionamentos
  category?: ProductCategory | null;
  variations: ProductVariation[];
}

// Tipos para componentes de produto
export interface ProductCardProps {
  product: Product;
  showLoader?: boolean;
  onProductClick?: (product: Product) => void;
}

export interface ProductImageProps {
  imageUrl: string;
  productName: string;
  hasOffer?: boolean;
  offerPercent?: number | null;
  onClick?: () => void;
}

export interface ProductDetailsProps {
  product: Product;
  feature?: {
    id: string;
    product_id: string;
    is_offer?: boolean;
    offer?: number | null;
    order?: number | null;
    created_at?: Date | string;
    updated_at?: Date | string;
    starts_at?: Date | string | null;
    ends_at?: Date | string | null;
    is_new?: boolean;
    is_featured?: boolean;
  } | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
  isLiked: boolean;
  setIsLiked: (liked: boolean) => void;
}
