import { Progress } from "../ui/progress";
import { parseCurrencyString } from "@/utils/currencyUtils";
import { formatCurrency } from "@/utils/currencyUtils";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

interface GoalCardProps {
  title: string;
  targetAmount: number;
  spent: number;
  remaining: string;
  percentage: number;
  date: string;
}

function GoalCard({
  title,
  targetAmount,
  spent,
  remaining,
  percentage,
  date,
}: GoalCardProps) {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-neutral-50 border border-neutral-300 rounded-lg p-5 flex flex-col gap-2">
      <h1 className=" font-semibold text-2xl">{title}</h1>
      <Progress value={percentage} className="h-2 [&>div]:bg-emerald-600" />
      <div className="flex justify-between">
        <h1 className="text-xs text-muted-foreground">
          {formatCurrency(spent, user?.currency)} de{" "}
          {formatCurrency(targetAmount, user?.currency)}
        </h1>
        <h1 className="text-xs text-muted-foreground">
          {percentage}% utilizado
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <h1 className="font-medium">Meta:</h1>
          {/* Usar a formatação */}
          <h2>{formatCurrency(targetAmount, user?.currency)}</h2>
        </div>
        <div>
          <h1 className="font-medium">Economizado:</h1>
          {/* Usar a formatação */}
          <h2>{spent}</h2>
        </div>
        <div>
          <h1 className="font-medium">Data alvo:</h1>
          {/* Usar a formatação */}
          <h2>{date.split("T")[0].replaceAll("-", "/")}</h2>
        </div>
        <div>
          <h1 className="font-medium">Dias restantes:</h1>
          {/* Usar a formatação */}
          <h2>30</h2>
        </div>
      </div>
    </div>
  );
}

export default GoalCard;
