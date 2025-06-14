import { Button } from "../ui/button";
import {
  House,
  LayoutDashboard,
  CreditCard,
  Wallet,
  ChartColumnIncreasing,
  ChartPie,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar({
  setSelectedOption,
}: {
  setSelectedOption: (option: string) => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen py-6 dark:bg-[#1f1f1f]">
      <h1 className="text-2xl font-bold mb-10 px-6">FinTrack</h1>

      <div className="space-y-2 w-full min-h-full px-3">
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => navigate("/")}
          id="homePageButton"
        >
          <House />
          Home
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("dashboard")}
          id="dashboardPageButton"
        >
          <LayoutDashboard /> Dashboard
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("transactions")}
          id="transactionsPageButton"
        >
          <CreditCard /> Transações
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("budgets")}
          id="budgetsPageButton"
        >
          <Wallet /> Orçamentos
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("reports")}
          id="reportsPageButton"
        >
          <ChartColumnIncreasing /> Relatórios
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("goals")}
          id="goalsPageButton"
        >
          <ChartPie /> Objetivos
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("settings")}
          id="settingsPageButton"
        >
          <Settings />
          Configurações
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
