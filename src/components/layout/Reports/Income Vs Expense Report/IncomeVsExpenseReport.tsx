import IncomeVsExpenseChart from "./IncomeVsExpenseChart.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select.tsx";
import { useState } from "react";

function IncomeVsExpenseReport() {
  const [amountOfMonths, setAmountOfMonths] = useState(6);

  return (
    <div className="w-full h-full p-8 space-y-10">
      <div className="mb-10 flex justify-between">
        <h1 className="text-3xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
          Análise mensal
        </h1>
        <Select
          defaultValue="6"
          onValueChange={(value) => setAmountOfMonths(parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Últimos 6 meses" id="selectTimeFrame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Último mês</SelectItem>
            <SelectItem value="3">Últimos 3 meses</SelectItem>
            <SelectItem value="6">Últimos 6 meses</SelectItem>
            <SelectItem value="12">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="max-w-2xl max-h-[400px] w-full h-full ">
        <IncomeVsExpenseChart amountOfMonths={amountOfMonths} />
      </div>
    </div>
  );
}

export default IncomeVsExpenseReport;
