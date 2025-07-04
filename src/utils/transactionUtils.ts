import Transaction from "../types/transaction";

// Função para calcular o saldo atual
const calculateBalance = (transactions: Transaction[]): number => {
  if (!transactions || transactions.length === 0) return 0;

  return transactions.reduce((balance, transaction) => {
    if (transaction.type === "income") {
      return balance + transaction.amount;
    } else if (transaction.type === "expense" || transaction.type === "goal") {
      return balance - transaction.amount;
    }

    return balance;
  }, 0);
};

// Função para calcular o total de receitas
const calculateTotalIncome = (transactions: Transaction[]): number => {
  if (!transactions || transactions.length === 0) return 0;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  return transactions
    .filter(
      (transaction) =>
        transaction.type === "income" &&
        new Date(transaction.createdAt).getMonth() == currentMonth
    )
    .reduce((total, transaction) => total + transaction.amount, 0);
};

// Função para calcular o total de despesas
const calculateTotalExpenses = (transactions: Transaction[]): number => {
  if (!transactions || transactions.length === 0) return 0;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  return transactions
    .filter(
      (transaction) =>
        transaction.type === "expense" &&
        new Date(transaction.createdAt).getMonth() == currentMonth
    )
    .reduce((total, transaction) => total + transaction.amount, 0);
};

// Função para calcular o total de economias
const calculateTotalSavings = (transactions: Transaction[]): number => {
  if (!transactions || transactions.length === 0) return 0;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  return transactions
    .filter(
      (transaction) =>
        transaction.type === "goal" &&
        new Date(transaction.createdAt).getMonth() == currentMonth
    )
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export {
  calculateBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateTotalSavings,
};
