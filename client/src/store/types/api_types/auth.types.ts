// Define response type for register and logging mutation
export interface AuthProps {
  email: string,
  password: string
}

// Data response when user successfully logged in
export interface LoginResponse {
  token: string;
  serviceResponse: {
    cart: [];
    createdAt: string;
    email: string;
    firstname: string;
    history: string[];
    lastname: string;
    password: string;
    role: string;
    updatedAt: string;
    verified: boolean;
    _id: string;
  }
}
// auth status
export interface AuthCheckResponse {
  user: {
    cart: [];
    createdAt: string;
    email: string;
    phone: string;
    gender: 'male' | 'female' | 'other';
    firstname: string;
    history: string[];
    lastname: string;
    role: string;
    updatedAt: string;
    verified: boolean;
    _id: string;
  }
}

export interface AuthCheckArg {
  token?: string;
}

// Data response when user successfully registered
export interface RegisterArgs {
  email: string;
  password: string;
  name: string;
}

export type RegisterResponse = RegisterResponse[];
export type AuthResponse = AuthProps[];
