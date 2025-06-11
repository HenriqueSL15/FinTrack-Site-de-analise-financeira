import FinancialCard from "../../common/FinancialCard";
import { formatCurrency } from "@/utils/currencyUtils.ts";
import { CircleDollarSign, ArrowUp, ArrowDown, Wallet } from "lucide-react";
import { useContext } from "react";
import getUserInformation from "@/utils/userInfoUtils";
import {
  calculateBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateTotalSavings,
} from "@/utils/transactionUtils";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/contexts/AuthContext.tsx";
import {
  calculateMonthlyExpenseChangePercentage,
  calculateMonthlyIncomeChangePercentage,
  calculateMonthlySavingsChangePercentage,
} from "./financialCardsUtils";

function FinancialCards() {
  const { user } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id as number),
    enabled: !!user?.id,
  });

  // Calcula valores financeiros quand os dados estiverem disponíveis
  const balance = data ? calculateBalance(data.transactions) : 0;
  const totalIncome = data ? calculateTotalIncome(data.transactions) : 0;
  const totalExpenses = data ? calculateTotalExpenses(data.transactions) : 0;
  const totalSavings = data ? calculateTotalSavings(data.transactions) : 0;

  const incomeChange = calculateMonthlyIncomeChangePercentage(
    data?.transactions
  );
  const expenseChange = calculateMonthlyExpenseChangePercentage(
    data?.transactions
  );
  const savingsChange = calculateMonthlySavingsChangePercentage(
    data?.transactions
  );

  const info = [
    {
      title: "Saldo Atual",
      value: formatCurrency(balance, user?.currency),
      icon: CircleDollarSign,
    },
    {
      title: "Receitas",
      value: formatCurrency(totalIncome, user?.currency),
      subtitle: incomeChange?.subtitle,
      icon: incomeChange?.iconColor === "green" ? ArrowUp : ArrowDown,
      iconColor: incomeChange?.iconColor,
    },
    {
      title: "Despesas",
      value: formatCurrency(totalExpenses, user?.currency),
      subtitle: expenseChange?.subtitle,
      icon: expenseChange?.iconColor === "green" ? ArrowUp : ArrowDown,
      iconColor: expenseChange?.iconColor,
    },
    {
      title: "Economias",
      value: formatCurrency(totalSavings, user?.currency),
      subtitle: savingsChange?.subtitle,
      icon: Wallet,
      iconColor: savingsChange?.iconColor,
    },
  ];

  return (
    <div className="w-full h-2/10 flex gap-5">
      {info.map((item, i) => (
        <FinancialCard {...item} key={i} />
      ))}
    </div>
  );
}

export default FinancialCards;
