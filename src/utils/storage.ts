// Utilitários para localStorage
import { STORAGE_KEYS } from '@/constants';

export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    if (typeof window === 'undefined') return defaultValue || null;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error(`Erro ao ler do localStorage (${key}):`, error);
      return defaultValue || null;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Erro ao salvar no localStorage (${key}):`, error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Erro ao remover do localStorage (${key}):`, error);
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error);
    }
  }
};

// Funções específicas para chaves conhecidas
export const getCartItems = () => storage.get(STORAGE_KEYS.cartItems, []);
export const setCartItems = (items: any[]) => storage.set(STORAGE_KEYS.cartItems, items);
export const clearCartItems = () => storage.remove(STORAGE_KEYS.cartItems);

export const getUserPreferences = () => storage.get(STORAGE_KEYS.userPreferences, {});
export const setUserPreferences = (preferences: any) => storage.set(STORAGE_KEYS.userPreferences, preferences);

export const getTheme = () => storage.get(STORAGE_KEYS.theme, 'light');
export const setTheme = (theme: string) => storage.set(STORAGE_KEYS.theme, theme);
