import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select.tsx";
import CategoryReportChart from "./CategoryReportChart.tsx";

function CategoryReport() {
  const [amountOfMonths, setAmountOfMonths] = useState(6);

  return (
    <div className="w-full h-screen p-8 space-y-10">
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-semibold mb-2 text-zinc-900">
          Distribuição de gastos
        </h1>
        <Select
          defaultValue="6"
          onValueChange={(value) => setAmountOfMonths(parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Últimos 6 meses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Último mês</SelectItem>
            <SelectItem value="3">Últimos 3 meses</SelectItem>
            <SelectItem value="6">Últimos 6 meses</SelectItem>
            <SelectItem value="12">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex gap-5 h-4/10 items-center justify-center mt-20">
        <CategoryReportChart amountOfMonths={amountOfMonths} />
      </div>
    </div>
  );
}

export default CategoryReport;
