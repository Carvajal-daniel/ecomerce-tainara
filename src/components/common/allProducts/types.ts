// types/product.ts

export interface ProductVariation {
  id: string
  image_url?: string
  price?: number
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
}

export interface Product {
  id: string
  name: string
  slug: string
  category?: ProductCategory
  variations: ProductVariation[]
}

export interface Category {
  slug: string
  name: string
  count?: number
}

// Tipos para props dos componentes
export interface FilterBarProps {
  categories: Category[]
  selectedCategory: string
  searchTerm: string
  onCategoryChange: (category: string) => void
  onSearchChange: (search: string) => void
  totalProducts: number
  filteredCount: number
}

export interface ProductCardProps {
  product: Product
}

export interface EmptyStateProps {
  type: 'no-products' | 'no-results'
  onReset?: () => void
}

export interface ProductsClientProps {
  products: Product[]
}