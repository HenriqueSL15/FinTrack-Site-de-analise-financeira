import User from "./user";

// Interface para o tipo do contexto
export default interface AuthContextType {
  user: User | null;

  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<any>;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}
