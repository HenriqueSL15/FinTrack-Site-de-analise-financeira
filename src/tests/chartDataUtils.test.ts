import {
  processTransactionsForChart,
  processTransactionsPerCategory,
} from "../utils/chartDataUtils";

const transactions1 = [
  {
    amount: 100,
    category: { name: "Food" },
    date: new Date(new Date().setMonth(new Date().getMonth() - 4)),
    description: "Food",
    type: "expense",
  },
  {
    amount: 200,
    category: { name: "Food" },
    date: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    description: "Food",
    type: "income",
  },
  {
    amount: 300,
    category: { name: "Car" },
    date: new Date(new Date().setMonth(new Date().getMonth() - 2)),
    description: "Car",
    type: "expense",
  },
  {
    amount: 400,
    category: { name: "Food" },
    date: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    description: "Food",
    type: "income",
  },
  {
    amount: 500,
    category: { name: "Food" },
    date: new Date(),
    description: "Food",
    type: "goal",
  },
] as any;

const transactions2 = [
  {
    amount: 200,
    category: { name: "Food" },
    date: new Date(new Date().setMonth(new Date().getMonth() - 5)),
    description: "Food",
    type: "income",
  },
  {
    amount: 100,
    category: { name: "Car" },
    date: new Date(new Date().setMonth(new Date().getMonth() - 4)),
    description: "Car",
    type: "expense",
  },
  {
    amount: 200,
    category: { name: "Food" },
    date: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    description: "Food",
    type: "income",
  },
  {
    amount: 300,
    category: { name: "Car" },
    date: new Date(new Date().setMonth(new Date().getMonth() - 2)),
    description: "Car",
    type: "expense",
  },
  {
    amount: 400,
    category: { name: "Food" },
    date: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    description: "Food",
    type: "income",
  },
  {
    amount: 500,
    category: { name: "Food" },
    date: new Date(),
    description: "Food",
    type: "goal",
  },
] as any;

interface AllMonths {
  [key: number]: string;
}

const allMonths: AllMonths = {
  0: "Janeiro",
  1: "Fevereiro",
  2: "Março",
  3: "Abril",
  4: "Maio",
  5: "Junho",
  6: "Julho",
  7: "Agosto",
  8: "Setembro",
  9: "Outubro",
  10: "Novembro",
  11: "Dezembro",
};

// Helper function to generate last N months labels dynamically
function getLastNMonthsLabels(n: number): string[] {
  const labels: string[] = [];
  const currentDate = new Date();

  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);

    const monthAbbr = allMonths[date.getMonth()].substring(0, 3);

    if (date.getFullYear() !== currentDate.getFullYear()) {
      labels.push(`${monthAbbr} / ${date.getFullYear().toString().slice(2)}`);
    } else {
      labels.push(monthAbbr);
    }
  }

  return labels;
}

describe("chartDataUtils", () => {
  it("processTransactionsForChart returns correct data", () => {
    const data = processTransactionsForChart(transactions1, 5);
    // console.log(getLastNMonthsLabels(5));
    // console.log(data?.labels);
    expect(data?.labels).toEqual(getLastNMonthsLabels(5));
    expect(data?.incomeData).toEqual([0, 200, 0, 400, 0]);
    expect(data?.expenseData).toEqual([100, 0, 300, 0, 0]);
  });

  it("processTransactionsForChart returns correct data", () => {
    const data = processTransactionsForChart(transactions2, 6);

    expect(data?.labels).toEqual(getLastNMonthsLabels(6));
    expect(data?.incomeData).toEqual([200, 0, 200, 0, 400, 0]);
    expect(data?.expenseData).toEqual([0, 100, 0, 300, 0, 0]);
  });

  it("processTransactionsForChart returns null if transactions are null", () => {
    const data = processTransactionsForChart(null as any, 6);

    expect(data).toBe(null);
  });

  it("processTransactionsForChart returns null if transactions are []", () => {
    const data = processTransactionsForChart([], 6);

    expect(data).toBe(null);
  });
});

describe("processTransactionsPerCategory", () => {
  it("processTransactionsPerCategory returns correct data for transactions1", () => {
    const data = processTransactionsPerCategory(transactions1, 5);

    expect(data?.labels).toEqual(["Food", "Car"]);
    expect(data?.chartData).toEqual([100, 300]);
  });

  it("processTransactionsPerCategory returns correct data for transactions2", () => {
    const data = processTransactionsPerCategory(transactions2, 6);

    expect(data?.labels).toEqual(["Car"]);
    expect(data?.chartData).toEqual([400]);
  });

  it("processTransactionsPerCategory returns null if transactions are null", () => {
    const data = processTransactionsPerCategory(null as any, 6);

    expect(data).toBe(null);
  });

  it("processTransactionsPerCategory returns null if transactions are []", () => {
    const data = processTransactionsPerCategory([], 6);
    expect(data).toBe(null);
  });
});
