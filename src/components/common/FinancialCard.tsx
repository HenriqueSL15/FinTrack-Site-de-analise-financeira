import FinancialCardProps from "@/types/financialCardsProps";

function FinancialCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "black",
  index,
}: FinancialCardProps) {
  return (
    <div
      data-testid={`financialCard-${index}`}
      className="w-1/4 h-full bg-gray-50 border border-gray-200 rounded-lg py-5 px-6 flex flex-col gap-5 dark:bg-[#1f1f1f] dark:border-[#2e2e2e]"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold" data-testid="financialCardTitle">
          {title}
        </h1>
        <Icon size={18} color={iconColor} />
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold" data-testid="financialCardValue">
          {value}
        </h1>
        <p
          className="text-xs text-neutral-400"
          data-testid="financialCardSubtitle"
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default FinancialCard;
