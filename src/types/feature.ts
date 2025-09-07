// Tipos relacionados a features/destaques de produtos
export interface Feature {
  id: string;
  product_id: string;
  is_offer?: boolean;
  offer?: number | null; // desconto em reais
  order?: number | null;
  created_at?: Date | string;
  updated_at?: Date | string;
  starts_at?: Date | string | null;
  ends_at?: Date | string | null;
  is_new?: boolean;
  is_featured?: boolean;
}

export interface ProductWithFeature {
  id: string;
  is_offer: boolean;
  offer: number | null;
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
    variations: {
      id: string;
      name: string;
      price: number;
      image_url: string;
    }[];
  };
}
