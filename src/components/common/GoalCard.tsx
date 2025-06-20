import { Progress } from "../ui/progress";
import { formatCurrency } from "@/utils/currencyUtils";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import UpdatedGoalDialog from "../layout/Goal/UpdateGoalDialog";
import GoalCardProps from "@/types/goalCard";

function GoalCard({
  title,
  targetAmount,
  spent,
  daysRemaining,
  percentage,
  date,
  id,
}: GoalCardProps) {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-neutral-50 border border-neutral-300 dark:border-[#2e2e2e] dark:bg-[#1f1f1f] rounded-lg p-5 flex flex-col gap-2">
      <h1 className=" font-semibold text-2xl" data-testid="goalTitle">
        {title}
      </h1>
      <Progress value={percentage} className="h-2 [&>div]:bg-emerald-600" />
      <div className="flex justify-between">
        <h1 className="text-xs text-muted-foreground">
          {formatCurrency(spent, user?.currency)} de{" "}
          {formatCurrency(targetAmount, user?.currency)}
        </h1>
        <h1 className="text-xs text-muted-foreground" data-testid="goalPercentage">
          {percentage}% utilizado
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <h1 className="font-medium">Meta:</h1>
          {/* Usar a formatação */}
          <h2 data-testid="goalAmount">
            {formatCurrency(targetAmount, user?.currency)}
          </h2>
        </div>
        <div>
          <h1 className="font-medium">Economizado:</h1>
          {/* Usar a formatação */}
          <h2 data-testid="goalSpent">{formatCurrency(spent, user?.currency)}</h2>
        </div>
        <div>
          <h1 className="font-medium">Data alvo:</h1>
          {/* Usar a formatação */}
          <h2 data-testid="goalDate">{date.split("T")[0].replace(/-/g, "/")}</h2>
        </div>
        <div>
          <h1 className="font-medium">Dias restantes:</h1>
          {/* Usar a formatação */}
          <h2 data-testid="goalDays">{daysRemaining}</h2>
        </div>
      </div>
      <UpdatedGoalDialog goal={{ title, targetAmount, spent, date, id }} />
    </div>
  );
}

export default GoalCard;
