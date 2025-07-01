// Taxas de conversão
const conversionRates = {
  BRL: 1,
  USD: 0.1842,
  EUR: 0.15597,
};

type SupportedCurrency = keyof typeof conversionRates;

// Função para converter uma quantidade de uma moeda para outra
export function convertCurrency(
  amount: number,
  toCurrency: SupportedCurrency
): number {
  if (amount < 0) return 0;
  if (!Object.keys(conversionRates).includes(toCurrency)) {
    console.log(`Moeda não suportada: ${toCurrency}, usando BRL como padrão`);
    return amount;
  }

  return amount * conversionRates[toCurrency];
}

// Formata um valor para exibição de acordo com a moeda
export function formatCurrency(
  value: number,
  currency: SupportedCurrency = "BRL"
): string {
  const convertedValue = convertCurrency(value, currency);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  }).format(convertedValue);
}

// Função para converter uma string formatada em um número
export function parseCurrencyString(value: string): number {
  if (!value) return 0;

  // Remove qualquer símbolo de moeda e espaços
  let cleaned = value.replace(/[^\d.,-]/g, "").trim();

  // Se tem vírgula e ponto, decide pelo último como decimal
  if (cleaned.includes(",") && cleaned.includes(".")) {
    if (cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
      // Ex: 1.234,56 -> 1234.56
      cleaned = cleaned.replace(/\./g, "").replace(",", ".");
    } else {
      // Ex: 1,234.56 -> 1234.56
      cleaned = cleaned.replace(/,/g, "");
    }
  } else if (cleaned.includes(",")) {
    // Só vírgula: assume decimal brasileiro
    cleaned = cleaned.replace(/\./g, "").replace(",", ".");
  } else {
    // Só ponto ou só número
    cleaned = cleaned.replace(/,/g, "");
  }

  return parseFloat(cleaned) || 0;
}

// Função para converter para o REAL (BRL)
export function convertToBRL(
  value: number,
  userCurrency: SupportedCurrency
): number {
  if (value < 0) return 0;
  if (userCurrency === "BRL") return value;

  return value / conversionRates[userCurrency];
}
