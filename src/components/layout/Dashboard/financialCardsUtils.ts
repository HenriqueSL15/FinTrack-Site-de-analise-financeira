import Transaction from "@/types/transaction";

export function calculateMonthlyIncomeChangePercentage(
  transactions: Transaction[]
) {
  const currentDate = new Date();
  const lastMonth = new Date(currentDate);
  lastMonth.setDate(1);
  lastMonth.setMonth(currentDate.getMonth() - 1);

  let totalIncomeCurrentMonth = 0;
  let totalIncomeLastMonth = 0;

  if (!transactions || transactions.length === 0) return null;

  // Agrupar transações por mês
  transactions.forEach((transaction) => {
    const transDate = new Date(transaction.createdAt);

    if (transaction.type === "income") {
      if (
        transDate.getMonth() === currentDate.getMonth() &&
        transDate.getFullYear() === currentDate.getFullYear()
      ) {
        totalIncomeCurrentMonth += transaction.amount;
      } else if (
        transDate.getMonth() === lastMonth.getMonth() &&
        transDate.getFullYear() === lastMonth.getFullYear()
      ) {
        totalIncomeLastMonth += transaction.amount;
      }
    }
  });

  // Caso não haja dados do mês anterior
  if (totalIncomeLastMonth === 0) {
    return {
      subtitle: "Sem dados do mês anterior",
      iconColor: "gray",
    };
  }

  // Calcular a variação percentual
  if (totalIncomeCurrentMonth > totalIncomeLastMonth) {
    return {
      subtitle: `+${Math.round(
        ((totalIncomeCurrentMonth - totalIncomeLastMonth) /
          totalIncomeLastMonth) *
          100
      )}% em relação ao mês anterior`,
      iconColor: "green",
    };
  } else {
    return {
      subtitle: `-${Math.round(
        ((totalIncomeLastMonth - totalIncomeCurrentMonth) /
          totalIncomeLastMonth) *
          100
      )}% em relação ao mês anterior`,
      iconColor: "red",
    };
  }
}

export function calculateMonthlyExpenseChangePercentage(
  transactions: Transaction[]
) {
  const currentDate = new Date();
  const lastMonth = new Date(currentDate);
  lastMonth.setDate(1);
  lastMonth.setMonth(currentDate.getMonth() - 1);

  let totalExpenseCurrentMonth = 0;
  let totalExpenseLastMonth = 0;

  if (!transactions || transactions.length === 0) return null;

  // Agrupar transações por mês
  transactions.forEach((transaction) => {
    const transDate = new Date(transaction.createdAt);

    if (transaction.type === "expense") {
      if (
        transDate.getMonth() === currentDate.getMonth() &&
        transDate.getFullYear() === currentDate.getFullYear()
      ) {
        totalExpenseCurrentMonth += transaction.amount;
      } else if (
        transDate.getMonth() === lastMonth.getMonth() &&
        transDate.getFullYear() === lastMonth.getFullYear()
      ) {
        totalExpenseLastMonth += transaction.amount;
      }
    }
  });

  // Caso não haja dados do mês anterior
  if (totalExpenseLastMonth === 0) {
    return {
      subtitle: "Sem dados do mês anterior",
      iconColor: "gray",
    };
  }

  // Calcular a variação percentual
  if (totalExpenseCurrentMonth > totalExpenseLastMonth) {
    return {
      subtitle: `+${Math.round(
        ((totalExpenseCurrentMonth - totalExpenseLastMonth) /
          totalExpenseLastMonth) *
          100
      )}% em relação ao mês anterior`,
      iconColor: "green",
    };
  } else {
    return {
      subtitle: `-${Math.round(
        ((totalExpenseLastMonth - totalExpenseCurrentMonth) /
          totalExpenseLastMonth) *
          100
      )}% em relação ao mês anterior`,
      iconColor: "red",
    };
  }
}

export function calculateMonthlySavingsChangePercentage(
  transactions: Transaction[]
) {
  const currentDate = new Date();
  const lastMonth = new Date(currentDate);
  lastMonth.setDate(1);
  lastMonth.setMonth(currentDate.getMonth() - 1);

  let totalSavingsCurrentMonth = 0;
  let totalSavingsLastMonth = 0;

  if (!transactions || transactions.length === 0) return null;

  // Agrupar transações por mês
  transactions.forEach((transaction) => {
    const transDate = new Date(transaction.createdAt);

    if (transaction.type === "goal") {
      if (
        transDate.getMonth() === currentDate.getMonth() &&
        transDate.getFullYear() === currentDate.getFullYear()
      ) {
        totalSavingsCurrentMonth += transaction.amount;
      } else if (
        transDate.getMonth() === lastMonth.getMonth() &&
        transDate.getFullYear() === lastMonth.getFullYear()
      ) {
        totalSavingsLastMonth += transaction.amount;
      }
    }
  });

  // Caso não haja dados do mês anterior
  if (totalSavingsLastMonth === 0) {
    return {
      subtitle: "Sem dados do mês anterior",
      iconColor: "gray",
    };
  }

  // Calcular a variação percentual
  if (totalSavingsCurrentMonth > totalSavingsLastMonth) {
    return {
      subtitle: `+${Math.round(
        ((totalSavingsCurrentMonth - totalSavingsLastMonth) /
          totalSavingsLastMonth) *
          100
      )}% em relação ao mês anterior`,
      iconColor: "green",
    };
  } else {
    return {
      subtitle: `-${Math.round(
        ((totalSavingsLastMonth - totalSavingsCurrentMonth) /
          totalSavingsLastMonth) *
          100
      )}% em relação ao mês anterior`,
      iconColor: "red",
    };
  }
}
