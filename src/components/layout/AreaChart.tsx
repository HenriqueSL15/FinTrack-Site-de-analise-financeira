import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { useContext, useMemo, useState } from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import getUserInformation from "@/utils/userInfoUtils.ts";
import { processTransactionsForChart } from "@/utils/chartDataUtils.ts";
import { formatCurrency } from "@/utils/currencyUtils.ts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function AreaChart() {
  const { user, isLoading } = useContext(AuthContext);

  const { data, isLoading: isLoadingUserInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInformation(user?.id),
    enabled: !!user?.id,
  });

  const processedData = useMemo(() => {
    return processTransactionsForChart(
      data?.transactions,
      isLoadingUserInfo,
      6
    );
  }, [data, isLoadingUserInfo]);

  const chartData = {
    labels: processedData?.labels || [],
    datasets: [
      {
        fill: true,
        label: "Receitas",
        data: processedData?.incomeData || [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        tension: 0.4, // Suaviza a curva
        pointRadius: 0, // Remove os pontos para um visual mais limpo
      },
      {
        fill: true,
        label: "Despesas",
        data: processedData?.expenseData || [],
        borderColor: "rgb(75, 75, 75)",
        backgroundColor: "rgba(232, 232, 232, 0.6)",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },

      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ${formatCurrency(value, user?.currency)}`;
          },
        },
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        ticks: {
          // Formata os valores do eixo Y para mostrar R$
          callback: function (value: any) {
            return formatCurrency(Number(value), user?.currency);
          },
        },
        min: 0, // Começa do zero
      },
      x: {
        grid: {
          display: false, // Remove as linhas de grade verticais
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
    elements: {
      line: {
        borderWidth: 2, // Espessura da linha
      },
    },
  };

  return <Line options={options} data={chartData} />;
}

export default AreaChart;
