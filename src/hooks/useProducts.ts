// Hook personalizado para gerenciar produtos
import { useState, useCallback } from 'react';
import { Product, FilterParams } from '@/types';

interface UseProductsReturn {
  products: Product[];
  filteredProducts: Product[];
  filters: FilterParams;
  setProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<FilterParams>) => void;
  clearFilters: () => void;
  searchProducts: (searchTerm: string) => void;
  filterByCategory: (categorySlug: string) => void;
  sortProducts: (sortBy: FilterParams['sortBy'], sortOrder: FilterParams['sortOrder']) => void;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterParams>({
    search: '',
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const filteredProducts = products.filter(product => {
    // Filtro por busca
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm);
      if (!matchesSearch) return false;
    }

    // Filtro por categoria
    if (filters.category && product.category?.slug !== filters.category) {
      return false;
    }

    // Filtro por preço
    if (filters.minPrice || filters.maxPrice) {
      const productPrice = product.variations[0]?.price || 0;
      if (filters.minPrice && productPrice < filters.minPrice) return false;
      if (filters.maxPrice && productPrice > filters.maxPrice) return false;
    }

    return true;
  }).sort((a, b) => {
    if (!filters.sortBy) return 0;

    let aValue: any;
    let bValue: any;

    switch (filters.sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'price':
        aValue = a.variations[0]?.price || 0;
        bValue = b.variations[0]?.price || 0;
        break;
      case 'created_at':
        aValue = new Date(a.created_at || 0).getTime();
        bValue = new Date(b.created_at || 0).getTime();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const updateFilters = useCallback((newFilters: Partial<FilterParams>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  }, []);

  const searchProducts = useCallback((searchTerm: string) => {
    updateFilters({ search: searchTerm });
  }, [updateFilters]);

  const filterByCategory = useCallback((categorySlug: string) => {
    updateFilters({ category: categorySlug });
  }, [updateFilters]);

  const sortProducts = useCallback((sortBy: FilterParams['sortBy'], sortOrder: FilterParams['sortOrder']) => {
    updateFilters({ sortBy, sortOrder });
  }, [updateFilters]);

  return {
    products,
    filteredProducts,
    filters,
    setProducts,
    setFilters: updateFilters,
    clearFilters,
    searchProducts,
    filterByCategory,
    sortProducts,
  };
};
