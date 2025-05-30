// Função para obter a quantia gasta pelo usuário
export default function getSpentAmount(budget, transactions) {
  let total = 0;
  transactions?.map((transaction) => {
    const transDate = new Date(transaction.createdAt);
    const currentDate = new Date();
    const isSameMonth =
      transDate.getMonth() === currentDate.getMonth() &&
      transDate.getFullYear() === currentDate.getFullYear();
    if (isSameMonth) {
      if (transaction.categoryId === budget.categoryId) {
        if (transaction.type === "expense") total += transaction.amount;
      }
    }
  });

  return total;
}
