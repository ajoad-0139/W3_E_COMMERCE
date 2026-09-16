export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
};