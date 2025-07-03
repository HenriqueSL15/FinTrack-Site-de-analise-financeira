import { Pie } from "react-chartjs-2";
import { processTransactionsPerCategory } from "@/utils/chartDataUtils";
import getUserInformation from "@/utils/userInfoUtils";
import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext.tsx";
import { formatCurrency } from "@/utils/currencyUtils";
import chroma from "chroma-js";

// Registrando elementos e plugins
ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryReportChart({
  amountOfMonths = 6,
}: {
  amountOfMonths: number;
}) {
  const { user } = useContext(AuthContext);
  const [processedData, setProcessedData] = useState<{
    labels: string[];
    chartData: number[];
  } | null>(null);

  const { data, isLoading: isLoadingUserInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInformation(user?.id as number),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (data && !isLoadingUserInfo) {
      const chartData = processTransactionsPerCategory(
        data.transactions,
        amountOfMonths
      );

      setProcessedData(chartData);
    }
  }, [data, amountOfMonths]);

  function generateRandomColors(amountOfColors: number): string[] {
    const colors = [];
    for (let i = 0; i < amountOfColors; i++) {
      colors.push(chroma.random().hex());
    }
    return colors;
  }

  const charData = {
    labels: processedData?.labels,
    datasets: [
      {
        label: "Gastos na Categoria",
        data: processedData?.chartData,
        backgroundColor: generateRandomColors(
          processedData?.chartData?.length as number
        ),
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    animation: {
      duration: 0,
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      // datalabels: {
      //   color: "#fff",
      //   font: {
      //     weight: "bold",
      //     size: 14,
      //   },
      //   formatter: (value, context) =>
      //     context.chart.data.labels?.[context.dataIndex] || "",
      // },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ${formatCurrency(value, user?.currency)}`;
          },
        },
      },
    },
  };

  return (
    <Pie
      data={charData}
      options={options}
      ref={(ref) => {
        if (ref) window.categoryReportChart = ref;
      }}
    />
  );
}

export default CategoryReportChart;
