// Wrapper para páginas que gerencia o loading automaticamente
'use client';

import { useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { setLoading } = useLoading();

  useEffect(() => {
    // Desativa o loading quando a página carrega
    setLoading(false);
    
    // Cleanup: garante que o loading seja desativado ao desmontar
    return () => setLoading(false);
  }, [setLoading]);

  return <>{children}</>;
};

export default PageWrapper;
