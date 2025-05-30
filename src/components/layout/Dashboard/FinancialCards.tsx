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

function FinancialCards() {
  const { user } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id),
    enabled: !!user?.id,
  });

  // Calcula valores financeiros quand os dados estiverem disponíveis
  const balance = data ? calculateBalance(data.transactions) : 0;
  const totalIncome = data ? calculateTotalIncome(data.transactions) : 0;
  const totalExpenses = data ? calculateTotalExpenses(data.transactions) : 0;
  const totalSavings = data ? calculateTotalSavings(data.transactions) : 0;

  const info = [
    {
      title: "Saldo Atual",
      value: formatCurrency(balance, user?.currency),
      subtitle: "Atualizado hoje",
      icon: CircleDollarSign,
    },
    {
      title: "Receitas",
      value: formatCurrency(totalIncome, user?.currency),
      subtitle: "+15% em relação ao mês anterior",
      icon: ArrowUp,
      iconColor: "green",
    },
    {
      title: "Despesas",
      value: formatCurrency(totalExpenses, user?.currency),
      subtitle: "-2% em relação ao mês anterior",
      icon: ArrowDown,
      iconColor: "red",
    },
    {
      title: "Economias",
      value: formatCurrency(totalSavings, user?.currency),
      subtitle: "+8.5% em relação ao mês anterior",
      icon: Wallet,
      iconColor: "gray",
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
