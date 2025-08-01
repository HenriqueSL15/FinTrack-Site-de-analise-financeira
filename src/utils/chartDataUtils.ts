import Transaction from "@/types/transaction";

interface AllMonths {
  [key: number]: string;
}

const allMonths: AllMonths = {
  0: "Janeiro",
  1: "Fevereiro",
  2: "Março",
  3: "Abril",
  4: "Maio",
  5: "Junho",
  6: "Julho",
  7: "Agosto",
  8: "Setembro",
  9: "Outubro",
  10: "Novembro",
  11: "Dezembro",
};

export function processTransactionsForChart(
  transactions: Transaction[],
  amountOfMonths: number
) {
  if (!transactions || transactions?.length < 1) return null;
  // Encontrar a data da transação mais antiga
  let oldestTransactionDate = new Date();
  if (transactions.length > 0) {
    oldestTransactionDate = transactions.reduce((oldest, transaction) => {
      const transDate = new Date(transaction.date);
      return transDate < oldest ? transDate : oldest;
    }, new Date());
  }

  const lastMonths = Array.from({ length: amountOfMonths }, (_, i) => {
    const date = new Date(oldestTransactionDate);

    date.setDate(1);
    date.setMonth(date.getMonth() + i);

    return date;
  });

  // Determinar quantos meses de dados temos
  const firstTransactionMonth = oldestTransactionDate.getMonth();
  const firstTransactionYear = oldestTransactionDate.getFullYear();

  // Use the last month in lastMonths as the current month for calculation
  const lastMonthDate = lastMonths[lastMonths.length - 1];
  const currentMonth = lastMonthDate.getMonth();
  const currentYear = lastMonthDate.getFullYear();

  let monthsWithData =
    (currentYear - firstTransactionYear) * 12 +
    (currentMonth - firstTransactionMonth) +
    1;
  monthsWithData = Math.min(amountOfMonths, monthsWithData);

  // Usar apenas os meses para os quais temos dados
  const relevantMonths = lastMonths.slice(amountOfMonths - monthsWithData);

  // Mapeia os meses para labels legíveis
  const labels = relevantMonths.map((date) => {
    const monthAbbr = allMonths[date.getMonth()].substring(0, 3);

    // Adiciona o ano se for diferente do ano atual
    if (date.getFullYear() !== currentYear) {
      return `${monthAbbr}/${date.getFullYear().toString().slice(2)}`;
    }

    return monthAbbr;
  });

  // Inicializar arrays para receitas e despesas
  const incomeData = Array(monthsWithData).fill(0);
  const expenseData = Array(monthsWithData).fill(0);

  // Agrupar transações por mês
  transactions.forEach((transaction) => {
    const transDate = new Date(transaction.date);

    // Verificar se a transação está nos meses relevantes
    for (let i = 0; i < relevantMonths.length; i++) {
      const monthDate = relevantMonths[i];

      if (
        transDate.getMonth() === monthDate.getMonth() &&
        transDate.getFullYear() === monthDate.getFullYear()
      ) {
        if (transaction.type === "income") {
          incomeData[i] += transaction.amount;
        } else if (transaction.type === "expense") {
          expenseData[i] += transaction.amount;
        }
        break;
      }
    }
  });

  return {
    labels,
    incomeData,
    expenseData,
  };
}

export function processTransactionsPerCategory(
  transactions: Transaction[],
  amountOfMonths: number
): { labels: string[]; chartData: number[] } | null {
  if (!transactions || transactions?.length < 1) return null;

  // Encontrar a data da transação mais antiga
  let oldestTransactionDate = new Date();
  if (transactions.length > 0) {
    // Assumindo que transactions tem um campo createdAt ou date
    oldestTransactionDate = transactions.reduce((oldest, transaction) => {
      const transDate = new Date(transaction.date);
      return transDate < oldest ? transDate : oldest;
    }, new Date());
  }

  const lastMonths = Array.from({ length: amountOfMonths }, (_, i) => {
    const date = new Date(oldestTransactionDate);
    date.setDate(1);
    date.setMonth(date.getMonth() + i);

    return date;
  });

  // Determinar quantos meses de dados temos
  const firstTransactionMonth = oldestTransactionDate.getMonth();
  const firstTransactionYear = oldestTransactionDate.getFullYear();

  // Use the last month in lastMonths as the current month for calculation
  const lastMonthDate = lastMonths[lastMonths.length - 1];
  const currentMonth = lastMonthDate.getMonth();
  const currentYear = lastMonthDate.getFullYear();

  let monthsWithData =
    (currentYear - firstTransactionYear) * 12 +
    (currentMonth - firstTransactionMonth) +
    1;
  monthsWithData = Math.min(amountOfMonths, monthsWithData);

  // Usar apenas os meses para os quais temos dados
  const relevantMonths = lastMonths.slice(amountOfMonths - monthsWithData);

  const categoryMap = new Map<string, number>();

  // Agrupar transações por categoria
  transactions.forEach((transaction) => {
    const transDate = new Date(transaction.date);
    const category = transaction.category?.name;
    const amount = transaction.amount;
    const transactionType = transaction.type;

    for (let i = 0; i < relevantMonths.length; i++) {
      const monthDate = relevantMonths[i];

      if (
        transDate.getMonth() === monthDate.getMonth() &&
        transDate.getFullYear() === monthDate.getFullYear()
      ) {
        if (transactionType === "expense") {
          categoryMap.set(category, (categoryMap.get(category) ?? 0) + amount);
        }
        break;
      }
    }
  });

  const labels = Array.from(categoryMap.keys());
  const chartData = Array.from(categoryMap.values());

  return {
    labels,
    chartData,
  };
}
