export interface User {
  id: number;
  email: string;
}

export interface AuthContextType{
  user: User |  null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>
}