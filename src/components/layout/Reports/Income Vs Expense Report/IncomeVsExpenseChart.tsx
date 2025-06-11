import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { formatCurrency } from "@/utils/currencyUtils";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useEffect, useState } from "react";

import getUserInformation from "@/utils/userInfoUtils";
import { processTransactionsForChart } from "@/utils/chartDataUtils";
import ProcessedData from "./incomeVsExpense";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function IncomeVsExpenseChart({
  amountOfMonths = 6,
}: {
  amountOfMonths: number;
}) {
  const { user } = useContext(AuthContext);

  const [processedData, setProcessedData] = useState<ProcessedData | null>(
    null
  );

  const { data, isLoading: isLoadingUserInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInformation(user?.id as number),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (data && !isLoadingUserInfo) {
      const chartData = processTransactionsForChart(
        data.transactions,
        amountOfMonths
      );

      setProcessedData(chartData);
    }
  }, [data, isLoadingUserInfo, amountOfMonths]);

  const charData = {
    labels: processedData?.labels || [],
    datasets: [
      {
        label: "Receitas",
        data: processedData?.incomeData || [],
        backgroundColor: "rgba(0, 255,0, 0.8)",
        borderColor: "rgb(0, 255, 0)",
        borderWidth: 1,
      },
      {
        label: "Despesas",
        data: processedData?.expenseData || [],
        backgroundColor: "rgba(255, 0,0, 0.8)",
        borderColor: "rgb(255, 0,0)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    animation: false,
    responsive: true,
    mainainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            return `${label}: ${formatCurrency(value, user?.currency)}`;
          },
        },
      },
    },
    scale: {
      y: {
        ticks: {
          callback: function (value: number | string) {
            return formatCurrency(Number(value), user?.currency);
          },
        },
        min: 0,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return <Bar options={options} data={charData} />;
}

export default IncomeVsExpenseChart;
