// Utilitários de validação
import { VALIDATION, IMAGE_CONFIG } from '@/constants';

export const validateEmail = (email: string): boolean => {
  return VALIDATION.email.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return VALIDATION.phone.test(phone);
};

export const validateCPF = (cpf: string): boolean => {
  return VALIDATION.cpf.test(cpf);
};

export const validateCEP = (cep: string): boolean => {
  return VALIDATION.cep.test(cep);
};

export const validateRequired = (value: string | number | undefined | null): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== undefined && value !== null;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validateRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  if (!IMAGE_CONFIG.allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Tipo de arquivo não permitido. Use JPEG, PNG ou WebP.'
    };
  }

  if (file.size > IMAGE_CONFIG.maxSize) {
    return {
      isValid: false,
      error: `Arquivo muito grande. Tamanho máximo: ${IMAGE_CONFIG.maxSize / (1024 * 1024)}MB`
    };
  }

  return { isValid: true };
};

