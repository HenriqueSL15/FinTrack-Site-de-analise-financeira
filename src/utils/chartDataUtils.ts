interface AllMonths {
  [key: number]: string;
}

const allMonths: AllMonths = {
  1: "Janeiro",
  2: "Fevereiro",
  3: "Março",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro",
};

interface Category {
  createdAt: string;
  id: number;
  name: string;
  type: string;
  updatedAt: string;
  userId: number;
}

interface Goal {
  id: number;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface Transaction {
  amount: number;
  category: Category;
  categoryId: number;
  createdAt: string;
  description: string;
  goal?: Goal;
  goalId?: number;
  id: number;
  type: string;
  updatedAt: string;
  userId: number;
}

export function processTransactionsForChart(
  transactions: Transaction[],
  isLoadingUserInfo: boolean,
  amountOfMonths: number
) {
  const currentDate = new Date();
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(currentDate);

    date.setMonth(currentDate.getMonth() - i);
    return date;
  }).reverse();

  if (!transactions || isLoadingUserInfo) return null;

  // Encontrar a data da transação mais antiga
  let oldestTransactionDate = new Date();
  if (transactions.length > 0) {
    // Assumindo que transactions tem um campo createdAt ou date
    oldestTransactionDate = transactions.reduce((oldest, transaction) => {
      const transDate = new Date(transaction.createdAt);
      return transDate < oldest ? transDate : oldest;
    }, new Date());
  }

  // Determinar quantos meses de dados temos
  const monthsWithData = Math.min(
    amountOfMonths,
    (currentDate.getFullYear() - oldestTransactionDate.getFullYear()) * 12 +
      (currentDate.getMonth() - oldestTransactionDate.getMonth()) +
      1
  );

  // Usar apenas os meses para os quais temos dados
  const relevantMonths = last6Months.slice(6 - monthsWithData);

  // Mapeia os meses para labels legíveis
  const labels = relevantMonths.map((date) => {
    const monthAbbr = allMonths[date.getMonth() + 1].substring(0, 3);

    // Adiciona o ano se for diferente do ano atual
    if (date.getFullYear() !== currentDate.getFullYear()) {
      return `${monthAbbr}/${date.getFullYear().toString().slice(2)}`;
    }

    return monthAbbr;
  });

  // Inicializar arrays para receitas e despesas
  const incomeData = Array(monthsWithData).fill(0);
  const expenseData = Array(monthsWithData).fill(0);

  // Agrupar transações por mês
  transactions.forEach((transaction) => {
    const transDate = new Date(transaction.createdAt);

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
