// Hook para gerenciar loading de páginas automaticamente
import { useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';

export const usePageLoading = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    // Desativa o loading quando a página carrega
    setLoading(false);
    
    // Cleanup: garante que o loading seja desativado ao desmontar
    return () => setLoading(false);
  }, [setLoading]);
};
