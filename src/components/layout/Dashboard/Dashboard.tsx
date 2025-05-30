import { ChartLine } from "lucide-react";
import AreaChart from "./AreaChart.tsx";
import FinancialCards from "./FinancialCards.tsx";

function Dashboard() {
  return (
    <div className="w-full h-screen px-8 pt-8 space-y-10 dark:bg-[#1a1a1a]">
      <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-white">
        Dashboard
      </h1>
      <h2 className="text-neutral-500 dark:text-neutral-400">
        Visão geral da sua situação financeira.
      </h2>
      <FinancialCards />
      <div className="w-full h-6/12 bg-gray-50 border border-gray-200 rounded-sm flex flex-col p-8 dark:bg-[#1f1f1f] dark:border-[#2e2e2e]">
        <div className="flex gap-2 items-center">
          <ChartLine size={20} />
          <h1 className="text-2xl font-semibold">Análise Financeira</h1>
        </div>
        <div className="h-full w-full ">
          <AreaChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
