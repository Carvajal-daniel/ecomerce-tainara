// Componente reutilizável para overlay de loading
import React from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  size = 'md',
  className = '' 
}) => {
  if (!isLoading) return null;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20 ${className}`}>
      <div className={`${sizeClasses[size]} border-4 border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingOverlay;
