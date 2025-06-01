import Transaction from "@/types/transaction";
import Budget from "@/types/budget";

// Função para obter a quantia gasta pelo usuário
export default function getSpentAmount(
  budget: Budget,
  transactions: Transaction[]
) {
  if (!transactions || transactions.length < 1) return 0;

  let total = 0;

  transactions?.map((transaction) => {
    const transDate = new Date(transaction.createdAt);
    const currentDate = new Date();
    const isSameMonthAndYear =
      transDate.getMonth() === currentDate.getMonth() &&
      transDate.getFullYear() === currentDate.getFullYear();
    if (isSameMonthAndYear) {
      if (transaction.categoryId === budget.categoryId) {
        if (transaction.type === "expense") total += transaction.amount;
      }
    }
  });

  return total;
}
