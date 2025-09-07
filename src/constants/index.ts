// Constantes do sistema
export const APP_CONFIG = {
  name: 'E-commerce Store',
  description: 'Loja online criada por Daniel',
  version: '1.0.0',
} as const;

export const ROUTES = {
  home: '/',
  products: '/produtos',
  product: (slug: string) => `/produto/${slug}`,
  category: (slug: string) => `/category/${slug}`,
  checkout: '/checkout',
  profile: '/perfil',
  orders: '/pedidos',
  authentication: '/authentication',
} as const;

export const API_ENDPOINTS = {
  products: '/api/products',
  categories: '/api/categories',
  user: '/api/user',
  auth: '/api/auth',
} as const;

export const STORAGE_KEYS = {
  cartItems: 'cartItems',
  userPreferences: 'userPreferences',
  theme: 'theme',
} as const;

export const PAGINATION = {
  defaultLimit: 12,
  maxLimit: 50,
} as const;

export const PRICE_CONFIG = {
  currency: 'BRL',
  locale: 'pt-BR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
} as const;

export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  cep: /^\d{5}-?\d{3}$/,
} as const;

export const TOAST_CONFIG = {
  duration: 3000,
  position: 'bottom-right',
} as const;

export const IMAGE_CONFIG = {
  placeholder: '/placeholder.jpg',
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
} as const;
