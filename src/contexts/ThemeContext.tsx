import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Theme, ThemeContextType } from "@/types/themeContext";
import User from "@/types/user";

const defaultThemeContext: ThemeContextType = {
  theme: "",
  updateTheme: () => {},
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { user, isLoading } = useContext(AuthContext);

  // Função para obter o tema do usuário
  const getUserTheme = (user: User) => {
    if (!user || !user.theme) return "light"; // fallback
    if (user.theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return user.theme;
  };

  // Inicializa o theme com base no user
  const [theme, setTheme] = useState("");

  // Atualiza o theme sempre que o user mudar
  useEffect(() => {
    if (user && !isLoading) {
      const res = getUserTheme(user);
      setTheme(res);
    }
  }, [user, isLoading]);

  // FUnção para forçar atualização do tema
  const updateTheme = (theme: Theme) => {
    if (!theme) return console.log("Usuário não encontrado");

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      if (mediaQuery.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    } else {
      setTheme(theme);
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "system") {
      updateTheme("system");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
