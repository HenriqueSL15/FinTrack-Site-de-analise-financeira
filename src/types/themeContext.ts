// Interface para o tipo do contexto
export interface ThemeContextType {
  theme: string;
  updateTheme: (theme: Theme) => void;
}

// Interface para o usuário
export type Theme = string;
