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
  const queryClient = useQueryClient();

  const allMonths = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };

  const { data, isLoading: isLoadingUserInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInformation(user?.id),
    enabled: !!user?.id,
  });

  const currentDate = new Date();
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(currentDate);

    date.setMonth(currentDate.getMonth() - i);
    return date;
  }).reverse();

  const processedData = useMemo(() => {
    if (!data?.transactions || isLoadingUserInfo) return null;

    // Encontrar a data da transação mais antiga
    let oldestTransactionDate = new Date();
    if (data.transactions.length > 0) {
      // Assumindo que transactions tem um campo createdAt ou date
      oldestTransactionDate = data.transactions.reduce(
        (oldest, transaction) => {
          const transDate = new Date(transaction.createdAt);
          return transDate < oldest ? transDate : oldest;
        },
        new Date()
      );
    }

    // Determinar quantos meses de dados temos
    const monthsWithData = Math.min(
      6,
      (currentDate.getFullYear() - oldestTransactionDate.getFullYear()) * 12 +
        (currentDate.getMonth() - oldestTransactionDate.getMonth()) +
        1
    );

    // Usar apenas os meses para os quais temos dados
    const relevantMonths = last6Months.slice(6 - monthsWithData);

    // Mapeia os meses para labels legíveis
    const labels = relevantMonths.map((date) => {
      const monthAbbr = allMonths[date.getMonth() + 1].substring(0, 3);

      // Adiciona o ano se for diferente do ano atual
      if (date.getFullYear() !== currentDate.getFullYear()) {
        return `${monthAbbr}/${date.getFullYear().toString().slice(2)}`;
      }

      return monthAbbr;
    });

    // Inicializar arrays para receitas e despesas
    const incomeData = Array(monthsWithData).fill(0);
    const expenseData = Array(monthsWithData).fill(0);

    // Agrupar transações por mês
    data.transactions.forEach((transaction) => {
      const transDate = new Date(transaction.createdAt);

      // Verificar se a transação está nos meses relevantes
      for (let i = 0; i < relevantMonths.length; i++) {
        const monthDate = relevantMonths[i];
        if (
          transDate.getMonth() === monthDate.getMonth() &&
          transDate.getFullYear() === monthDate.getFullYear()
        ) {
          if (transaction.type === "income") {
            incomeData[i] += transaction.amount;
          } else if (transaction.type === "expense") {
            expenseData[i] += transaction.amount;
          }

          break;
        }
      }
    });

    return {
      labels,
      incomeData,
      expenseData,
    };
  }, [data, isLoadingUserInfo, last6Months, currentDate]);

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
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },

      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        ticks: {
          // Formata os valores do eixo Y para mostrar R$
          callback: function (value: any) {
            return "R$" + value;
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
