import { Progress } from "../ui/progress";
import { parseCurrencyString } from "@/utils/currencyUtils";

interface BudgetCardProps {
  title: string;
  budgeted: string;
  spent: string;
  remaining: string;
  percentage: number;
}

function BudgetCard({
  title,
  budgeted,
  spent,
  remaining,
  percentage,
}: BudgetCardProps) {
  const remainingNumber = parseCurrencyString(remaining);

  return (
    <div className="bg-neutral-50 border border-neutral-300 rounded-lg p-5 flex flex-col gap-2">
      <h1 className=" font-semibold">{title}</h1>
      <Progress value={percentage} className="h-2 [&>div]:bg-emerald-600" />
      <h1 className="text-xs text-muted-foreground">{percentage}% utilizado</h1>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <h1 className="font-medium">Orçado:</h1>
          {/* Usar a formatação */}
          <h2>{budgeted}</h2>
        </div>
        <div>
          <h1 className="font-medium">Gasto:</h1>
          {/* Usar a formatação */}
          <h2>{spent}</h2>
        </div>
        <div>
          <h1 className="font-medium">Restante:</h1>
          {/* Usar a formatação */}
          <h2
            className={` ${
              remainingNumber <= 0 ? "text-rose-600" : "text-emerald-600"
            } `}
          >
            {remaining}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;
