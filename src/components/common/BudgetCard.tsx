import { Progress } from "../ui/progress";
import { parseCurrencyString } from "@/utils/currencyUtils";

interface BudgetCardProps {
  title: string;
  budgeted: string;
  spent: string;
  remaining: string;
  percentage: number;
  index: number;
}

function BudgetCard({
  title,
  budgeted,
  spent,
  remaining,
  percentage,
  index,
}: BudgetCardProps) {
  const remainingNumber = parseCurrencyString(remaining);

  return (
    <div
      data-testid={`budgetCard-${index}`}
      className="bg-neutral-50 border border-neutral-300 dark:border-[#2e2e2e] dark:bg-[#1f1f1f] rounded-lg p-5 flex flex-col gap-2"
    >
      <h1 className=" font-semibold" data-testid={`budgetCard-${index}-title`}>
        {title}
      </h1>
      <Progress value={percentage} className="h-2 [&>div]:bg-emerald-600" />
      <h1
        className="text-xs text-muted-foreground"
        data-testid={`budgetCard-${index}-percentage`}
      >
        {percentage}% utilizado
      </h1>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <h1 className="font-medium">Orçado:</h1>
          {/* Usar a formatação */}
          <h2 data-testid={`budgetCard-${index}-amount`}>{budgeted}</h2>
        </div>
        <div>
          <h1 className="font-medium">Gasto:</h1>
          {/* Usar a formatação */}
          <h2 data-testid={`budgetCard-${index}-spent`}>{spent}</h2>
        </div>
        <div>
          <h1 className="font-medium">Restante:</h1>
          {/* Usar a formatação */}
          <h2
            className={` ${
              remainingNumber <= 0 ? "text-rose-600" : "text-emerald-600"
            } `}
            data-testid={`budgetCard-${index}-remaining`}
          >
            {remaining}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;
