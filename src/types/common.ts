// Tipos comuns e utilitários
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}

export interface EmptyStateProps {
  type: 'no-products' | 'no-results' | 'error' | 'loading';
  title?: string;
  message?: string;
  onReset?: () => void;
  onRetry?: () => void;
}

// Tipos para componentes de UI
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Tipos para navegação
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  isActive?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
