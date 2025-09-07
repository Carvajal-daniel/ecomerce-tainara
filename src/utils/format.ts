// Utilitários de formatação
import { PRICE_CONFIG } from '@/constants';

export const formatPrice = (price: number): string => {
  return (price / 100).toLocaleString(PRICE_CONFIG.locale, {
    minimumFractionDigits: PRICE_CONFIG.minimumFractionDigits,
    maximumFractionDigits: PRICE_CONFIG.maximumFractionDigits,
  });
};

export const formatBRL = (price: number): string => {
  return price.toLocaleString(PRICE_CONFIG.locale, {
    minimumFractionDigits: PRICE_CONFIG.minimumFractionDigits,
    maximumFractionDigits: PRICE_CONFIG.maximumFractionDigits,
  });
};

export const formatCurrency = (value: number, currency: string = PRICE_CONFIG.currency): string => {
  return new Intl.NumberFormat(PRICE_CONFIG.locale, {
    style: "currency",
    currency,
  }).format(value / 100);
};

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString("pt-BR");
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString("pt-BR");
};
