import { TokenData } from '@interfaces/auth.interface';

export interface User {
  _id: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'employee';
}

export interface UserLogged {
  _id: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'employee';
  token: TokenData | null;
}
