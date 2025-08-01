import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useMemo } from "react";

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
  const { user } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInformation(user?.id as number),
    enabled: !!user?.id,
  });

  const processedData = useMemo(() => {
    return processTransactionsForChart(data?.transactions, 6);
  }, [data]);

  const chartData = {
    labels: processedData?.labels || [],
    datasets: [
      {
        fill: true,
        label: "Receitas",
        data: processedData?.incomeData || [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        tension: 0.4,
        pointRadius: 0,
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
    animation: {
      duration: 0,
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },

      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const label = tooltipItem.dataset.label || "";
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

  return (
    <Line
      options={options}
      data={chartData}
      ref={(ref) => {
        if (ref) window.areaChart = ref;
      }}
    />
  );
}

export default AreaChart;
