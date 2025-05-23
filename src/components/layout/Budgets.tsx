import BudgetCard from "../common/BudgetCard.tsx";

import React, { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext.tsx";
import { useQuery } from "@tanstack/react-query";
import getUserInformation from "@/utils/userInfoUtils.ts";
import { formatCurrency } from "@/utils/currencyUtils.ts";
import NewBudgetDialog from "./NewBudgetDialog.tsx";

function getSpentAmount(budget, transactions) {
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

function Budgets() {
  const { user, isLoading } = useContext(AuthContext);

  const {
    data,
    isLoading: isLoadingUserInfo,
    error,
  } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id),
    enabled: !!user?.id,
  });

  return (
    <div className="w-full h-screen p-8 space-y-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2 text-zinc-900">Orçamentos</h1>
          <h2 className="text-neutral-500">
            Defina e acompanhe seus orçamentos mensais por categoria.
          </h2>
        </div>
        <NewBudgetDialog />
      </div>
      <div className="grid grid-cols-3 w-full gap-5">
        {data?.budgets.map((budget) => {
          const spentAmount = getSpentAmount(budget, data?.transactions);

          return (
            <BudgetCard
              key={budget.id}
              title={budget.category.name}
              budgeted={formatCurrency(budget.limitAmount, user?.currency)}
              spent={formatCurrency(spentAmount, user?.currency)}
              remaining={formatCurrency(
                budget.limitAmount - spentAmount,
                user?.currency
              )}
              percentage={Math.round((spentAmount / budget.limitAmount) * 100)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Budgets;
