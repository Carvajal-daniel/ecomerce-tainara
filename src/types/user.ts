// Tipos relacionados a usuários e autenticação
export interface User {
  id: string;
  name: string;
  cpf?: string | null;
  phone?: string | null;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  cep?: string | null;
  rua?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
  numero?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface UserAddress {
  id: string;
  cep: string | null;
  rua: string | null;
  bairro: string | null;
  cidade: string | null;
  uf: string | null;
  numero: string | null;
}

export interface Session {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date | string;
  ipAddress?: string;
  userAgent?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Account {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpiresAt?: Date | string;
  refreshTokenExpiresAt?: Date | string;
  scope?: string;
  password?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
