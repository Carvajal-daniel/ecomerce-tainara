// Componente reutilizável para estados vazios
import React from 'react';
import { EmptyStateProps } from '@/types';

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  message,
  onReset,
  onRetry
}) => {
  const getIcon = () => {
    switch (type) {
      case 'no-products':
        return '🛍️';
      case 'no-results':
        return '🔍';
      case 'error':
        return '❌';
      case 'loading':
        return '⏳';
      default:
        return '📦';
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'no-products':
        return 'Nenhum produto encontrado';
      case 'no-results':
        return 'Nenhum resultado encontrado';
      case 'error':
        return 'Ops! Algo deu errado';
      case 'loading':
        return 'Carregando...';
      default:
        return 'Estado vazio';
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'no-products':
        return 'Não há produtos disponíveis no momento.';
      case 'no-results':
        return 'Tente ajustar os filtros de busca.';
      case 'error':
        return 'Ocorreu um erro inesperado. Tente novamente.';
      case 'loading':
        return 'Aguarde enquanto carregamos o conteúdo.';
      default:
        return 'Não há conteúdo para exibir.';
    }
  };

  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">{getIcon()}</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        {title || getDefaultTitle()}
      </h3>
      <p className="text-gray-500 mb-6">
        {message || getDefaultMessage()}
      </p>
      
      <div className="flex gap-3 justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Tentar Novamente
          </button>
        )}
        {onReset && (
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Limpar Filtros
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
