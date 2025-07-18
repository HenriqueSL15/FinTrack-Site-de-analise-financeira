import BudgetCard from "../../common/BudgetCard.tsx";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext.tsx";
import { useQuery } from "@tanstack/react-query";
import getUserInformation from "@/utils/userInfoUtils.ts";
import { formatCurrency } from "@/utils/currencyUtils.ts";
import NewBudgetDialog from "../Budget/NewBudgetDialog.tsx";
import getSpentAmount from "./budgetUtils.ts";
import Budget from "@/types/budget.ts";

function Budgets() {
  const { user } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id as number),
    enabled: !!user?.id,
  });

  return (
    <div className="w-full h-screen p-8 space-y-10 dark:bg-[#1a1a1a]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-white">
            Orçamentos
          </h1>
          <h2 className="text-neutral-500 dark:text-neutral-400">
            Defina e acompanhe seus orçamentos mensais por categoria.
          </h2>
        </div>
        <NewBudgetDialog />
      </div>
      <div className="grid grid-cols-3 w-full gap-5">
        {data?.budgets.map((budget: Budget, i: number) => {
          const spentAmount = getSpentAmount(budget, data?.transactions);

          return (
            <BudgetCard
              index={i}
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
