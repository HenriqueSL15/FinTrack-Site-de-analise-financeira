// Taxas de conversão
const conversionRates = {
  BRL: 1,
  USD: 5.66,
  EUR: 6.39,
};

type SupportedCurrency = keyof typeof conversionRates;

// Função para converter uma quantidade de uma moeda para outra
export function convertCurrency(
  amount: number,
  toCurrency: SupportedCurrency
): number {
  if (!Object.keys(conversionRates).includes(toCurrency)) {
    console.warn(`Moeda não suportada: ${toCurrency}, usando BRL como padrão`);
    return amount;
  }

  return amount / conversionRates[toCurrency];
}

// Formata um valor para exibição de acordo com a moeda
export function formatCurrency(
  value: number,
  currency: SupportedCurrency = "BRL"
): string {
  const currencySymbols: Record<SupportedCurrency, string> = {
    BRL: "R$",
    USD: "$",
    EUR: "€",
  };

  const convertedValue = convertCurrency(value, currency);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  }).format(convertedValue);
}

// Função para converter uma string formatada em um número
export function parseCurrencyString(currencyString: string): number {
  // Remove símbolos de moeda, pontos de milhar e espaços
  const cleanedString = currencyString
    .replace(/[R$€$£¥]/g, "")
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  // Converte para número
  return parseFloat(cleanedString);
}

// Função para converter para o REAL (BRL)
export function convertToBRL(
  value: number,
  userCurrency: SupportedCurrency
): number {
  if (userCurrency === "BRL") return value;
  return value / conversionRates[userCurrency];
}
