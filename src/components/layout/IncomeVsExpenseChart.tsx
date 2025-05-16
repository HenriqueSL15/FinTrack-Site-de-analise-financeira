import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useMemo } from "react";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProcessedData {
  labels: string[];
  incomeData: number[];
  expenseData: number[];
}

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
    queryFn: () => getUserInformation(user?.id),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (data && !isLoadingUserInfo) {
      const chartData = processTransactionsForChart(
        data.transactions,
        isLoadingUserInfo,
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
        backgroundColor: "rgba(53, 162, 235, 0.8)",
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 1,
      },
      {
        label: "Despesas",
        data: processedData?.expenseData || [],
        backgroundColor: "rgba(75, 75, 75, 0.8)",
        borderColor: "rgb(75, 75, 75)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    mainainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scale: {
      y: {
        ticks: {
          callback: function (value: any) {
            return "R$" + value;
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
