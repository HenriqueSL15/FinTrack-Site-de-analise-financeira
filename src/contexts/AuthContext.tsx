import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import AuthContextType from "@/types/AuthContext";

// Cria contexto de autenticação
export const AuthContext = createContext<AuthContextType>({
  user: null,

  login: async () => null,
  logout: async () => {},
  register: async () => null,
  isLoading: true,
  refreshUser: async () => {},
});

// Interceptador axios para lidar com cookies
axios.interceptors.request.use(
  (config) => {
    // Adiciona withCredentials para permitir envio de cookies
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptador de resposta para lidar com token expirado
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se o erro for 401 (não autorizado) e tiver o sinalizador tokenExpired, e a requisição original não tiver sido reenviada
    if (
      error.response?.status === 401 &&
      error.response?.data?.tokenExpired &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Chama o endpoint de refresh token
        await axios.post(
          "https://fin-track-backend-ruddy.vercel.app/users/refresh-token"
        );

        // Reenvia a requisição original
        return axios(originalRequest);
      } catch (refreshError) {
        // Se o refresh falhar, desloga o usuário
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega informações do user do localStorage na inicialização do componente
  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://fin-track-backend-ruddy.vercel.app/users/me"
      );
      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carrega informações do user no render inicial
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // Função para login do usuário
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://fin-track-backend-ruddy.vercel.app/users/login",
        {
          email,
          password,
        }
      );
      setUser(response.data.userWithoutPassword);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Função para registro do usuário
  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        "https://fin-track-backend-ruddy.vercel.app/users/register",
        userData
      );
      setUser(response.data.userWithoutPassword);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // Função para logout do usuário
  const logout = async () => {
    try {
      await axios.post(
        "https://fin-track-backend-ruddy.vercel.app/users/logout"
      );
      setUser(null);
    } catch (err) {
      console.error("Erro durante logout:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        login,
        logout,
        register,
        isLoading,
        refreshUser: fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
