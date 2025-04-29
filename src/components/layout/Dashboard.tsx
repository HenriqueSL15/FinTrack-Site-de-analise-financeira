import {
  CircleDollarSign,
  ArrowUp,
  ArrowDown,
  Wallet,
  ChartLine,
} from "lucide-react";

import AreaChart from "./AreaChart.tsx";

function Dashboard() {
  return (
    <div className="w-full h-screen p-8 space-y-10">
      <h1 className="text-3xl font-bold mb-2 text-zinc-900">Dashboard</h1>
      <h2 className="text-neutral-500">
        Visão geral da sua situação financeira.
      </h2>
      <div className="w-full h-2/10 flex gap-5">
        <div className="w-1/4 h-full bg-gray-50 border border-gray-200 rounded-lg py-5 px-6 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold">Saldo Atual</h1>
            <CircleDollarSign size={18} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">R$ 1.240,00</h1>
            <p className="text-xs text-neutral-400">Atualizado hoje</p>
          </div>
        </div>
        <div className="w-1/4 h-full bg-gray-50 border border-gray-200 rounded-lg py-5 px-6 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold">Saldo Atual</h1>
            <ArrowUp color={"green"} size={18} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">R$ 1.240,00</h1>
            <p className="text-xs text-neutral-400">
              +15% em relação ao mês anterior
            </p>
          </div>
        </div>
        <div className="w-1/4 h-full bg-gray-50 border border-gray-200 rounded-lg py-5 px-6 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold">Saldo Atual</h1>
            <ArrowDown color={"red"} size={18} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">R$ 1.240,00</h1>
            <p className="text-xs text-neutral-400">
              -2% em relação ao mês anterior
            </p>
          </div>
        </div>
        <div className="w-1/4 h-full bg-gray-50 border border-gray-200 rounded-lg py-5 px-6 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-semibold">Saldo Atual</h1>
            <Wallet color={"gray"} size={18} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">R$ 1.240,00</h1>
            <p className="text-xs text-neutral-400">
              +8.5% em relação ao mês anterior
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-6/12 bg-gray-50 border border-gray-200 rounded-sm flex flex-col p-8">
        <div className="flex gap-2 items-center">
          <ChartLine size={20} />
          <h1 className="text-2xl font-semibold">Análise Financeira</h1>
        </div>
        <div className="h-full w-full">
          <AreaChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
