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
import { useState } from "react";

function Sidebar({
  setSelectedOption,
}: {
  setSelectedOption: (option: string) => void;
}) {
  const [selected, setSelected] = useState("dashboard");
  const navigate = useNavigate();

  const handleClick = (text: string): void => {
    setSelectedOption(text);
    setSelected(text);

    if (text === "home") navigate("/");
  };

  return (
    <div className="w-full min-h-screen py-6 dark:bg-[#1f1f1f]">
      <h1 className="text-2xl font-bold mb-10 px-6">FinTrack</h1>

      <div className="space-y-2 w-full min-h-full px-3">
        <Button
          variant={"ghost"}
          className={`w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500`}
          onClick={() => handleClick("home")}
          id="homePageButton"
        >
          <House />
          Home
        </Button>
        <Button
          variant={"ghost"}
          className={`w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500 ${
            selected === "dashboard" &&
            "bg-accent text-accent-foreground dark:bg-accent/50"
          }`}
          onClick={() => handleClick("dashboard")}
          id="dashboardPageButton"
        >
          <LayoutDashboard /> Dashboard
        </Button>
        <Button
          variant={"ghost"}
          className={`w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500 ${
            selected === "transactions" &&
            "bg-accent text-accent-foreground dark:bg-accent/50"
          }`}
          onClick={() => handleClick("transactions")}
          id="transactionsPageButton"
        >
          <CreditCard /> Transações
        </Button>
        <Button
          variant={"ghost"}
          className={`w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500 ${
            selected === "budgets" &&
            "bg-accent text-accent-foreground dark:bg-accent/50"
          }`}
          onClick={() => handleClick("budgets")}
          id="budgetsPageButton"
        >
          <Wallet /> Orçamentos
        </Button>
        <Button
          variant={"ghost"}
          className={`w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500 ${
            selected === "reports" &&
            "bg-accent text-accent-foreground dark:bg-accent/50"
          }`}
          onClick={() => handleClick("reports")}
          id="reportsPageButton"
        >
          <ChartColumnIncreasing /> Relatórios
        </Button>
        <Button
          variant={"ghost"}
          className={`w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500 ${
            selected === "goals" &&
            "bg-accent text-accent-foreground dark:bg-accent/50"
          }`}
          onClick={() => handleClick("goals")}
          id="goalsPageButton"
        >
          <ChartPie /> Objetivos
        </Button>
        <Button
          variant={"ghost"}
          className={`w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500 ${
            selected === "settings" &&
            "bg-accent text-accent-foreground dark:bg-accent/50"
          }`}
          onClick={() => handleClick("settings")}
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
