// Tipos relacionados a categorias
export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  // Relacionamentos
  products?: {
    id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
    is_active: boolean;
    category_id: string;
    created_at?: Date | string;
    updated_at?: Date | string;
  }[];
  banners?: Banner[];
}

export interface Banner {
  id: string;
  name: string;
  desktop_image: string;
  mobile_image: string;
  category_id: string;
  slug: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  // Relacionamentos
  category?: Category;
}

// Tipos para componentes de categoria
export interface CategoryItemProps {
  category: Category;
  isActive?: boolean;
  onClick?: (category: Category) => void;
}

export interface CategoriesProps {
  categories: Category[];
  selectedCategory?: string;
  onCategorySelect?: (slug: string) => void;
}

