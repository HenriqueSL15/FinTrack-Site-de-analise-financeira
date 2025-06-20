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
          data-testid="homePageButton"
        >
          <House />
          Home
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("dashboard")}
          data-testid="dashboardPageButton"
        >
          <LayoutDashboard /> Dashboard
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("transactions")}
          data-testid="transactionsPageButton"
        >
          <CreditCard /> Transações
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("budgets")}
          data-testid="budgetsPageButton"
        >
          <Wallet /> Orçamentos
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("reports")}
          data-testid="reportsPageButton"
        >
          <ChartColumnIncreasing /> Relatórios
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("goals")}
          data-testid="goalsPageButton"
        >
          <ChartPie /> Objetivos
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("settings")}
          data-testid="settingsPageButton"
        >
          <Settings />
          Configurações
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
