import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Interface para o tipo do contexto
interface AuthContextType {
  user: any | null;

  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<any>;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

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
        await axios.post("http://localhost:3000/users/refresh-token");

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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega informações do user do localStorage na inicialização do componente
  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/me");
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
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      setUser(response.data.userWithoutPassword);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Função para registro do usuário
  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        userData
      );
      setUser(response.data.userWithoutPassword);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Função para logout do usuário
  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/users/logout");
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
