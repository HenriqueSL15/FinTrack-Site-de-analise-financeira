import { Button } from "../ui/button";
import { ChartPie, ChartColumn } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "@/contexts/AuthContext.tsx";
import { JSX, useState } from "react";
import CategoryReport from "./CategoryReport.tsx";
import IncomeVsExpenseReport from "./IncomeVsExpenseReport.tsx";

interface Option {
  categories: JSX.Element;
  incomeVsExpense: JSX.Element;
}

function Reports() {
  const [selectedReport, setSelectedReport] = useState("incomeVsExpense");

  const options: Option = {
    categories: <CategoryReport />,
    incomeVsExpense: <IncomeVsExpenseReport />,
  };

  return (
    <div className="w-full h-screen p-8 space-y-10">
      <h1 className="text-3xl font-bold mb-2 text-zinc-900">Relatórios</h1>
      <h2 className="text-neutral-500">
        Visualize e gerencie seus relatórios financeiros.
      </h2>
      <div className="w-full flex gap-2">
        <Button
          size={"lg"}
          className="cursor-pointer"
          onClick={() => setSelectedReport("categories")}
          variant={selectedReport === "categories" ? "default" : "outline"}
        >
          <ChartPie /> Gastos por Categoria
        </Button>
        <Button
          size={"lg"}
          variant={selectedReport === "incomeVsExpense" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setSelectedReport("incomeVsExpense")}
        >
          <ChartColumn /> Receitas vs Despesas
        </Button>
      </div>
      <div className="w-full flex gap-5 min-h-2/10 rounded-lg border shadow-sm bg-neutral-50">
        {options[selectedReport]}
      </div>
    </div>
  );
}

export default Reports;
