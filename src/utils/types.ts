

export interface Variation {
  price: number;
  image_url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  variations: Variation[];
}

export interface Feature {
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
}
