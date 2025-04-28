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

function Sidebar({ setSelectedOption }) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen py-6">
      <h1 className="text-2xl font-bold mb-10 px-6">FinTrack</h1>

      <div className="space-y-2 w-full h-screen px-3">
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => navigate("/")}
        >
          <House />
          Home
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("dashboard")}
        >
          <LayoutDashboard /> Dashboard
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("transactions")}
        >
          <CreditCard /> Transações
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("categories")}
        >
          <Wallet /> Orçamentos
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("budgets")}
        >
          <ChartColumnIncreasing /> Relatórios
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("goals")}
        >
          <ChartPie /> Objetivos
        </Button>
        <Button
          variant={"ghost"}
          className="w-full justify-start text-sm gap-2 p-5 cursor-pointer text-neutral-500"
          onClick={() => setSelectedOption("settings")}
        >
          <Settings />
          Configurações
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
