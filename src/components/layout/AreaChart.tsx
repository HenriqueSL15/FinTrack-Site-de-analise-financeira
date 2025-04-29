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

// Registre os componentes necessários, incluindo o Filler para área preenchida
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
  const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Receitas",
        data: [45000, 48000, 46000, 50000, 55000, 60000],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        tension: 0.4, // Suaviza a curva
        pointRadius: 0, // Remove os pontos para um visual mais limpo
      },
      {
        fill: true,
        label: "Despesas",
        data: [32000, 33000, 32000, 34000, 33000, 32000],
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

  return <Line options={options} data={data} />;
}

export default AreaChart;
