// Hook personalizado para gerenciar estados de loading
import { useState, useCallback } from 'react';

interface UseLoadingStateReturn {
  isLoading: boolean;
  loadingItems: Set<string>;
  setLoading: (loading: boolean) => void;
  setItemLoading: (itemId: string, loading: boolean) => void;
  isItemLoading: (itemId: string) => boolean;
  clearAllLoading: () => void;
}

export const useLoadingState = (): UseLoadingStateReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const setItemLoading = useCallback((itemId: string, loading: boolean) => {
    setLoadingItems(prev => {
      const newSet = new Set(prev);
      if (loading) {
        newSet.add(itemId);
      } else {
        newSet.delete(itemId);
      }
      return newSet;
    });
  }, []);

  const isItemLoading = useCallback((itemId: string) => {
    return loadingItems.has(itemId);
  }, [loadingItems]);

  const clearAllLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingItems(new Set());
  }, []);

  return {
    isLoading,
    loadingItems,
    setLoading,
    setItemLoading,
    isItemLoading,
    clearAllLoading,
  };
};
