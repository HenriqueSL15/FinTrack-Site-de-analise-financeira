import {
  processTransactionsForChart,
  processTransactionsPerCategory,
} from "../utils/chartDataUtils";

const transactions1 = [
  {
    amount: 100,
    category: { name: "Food" },
    date: new Date(2024, 10, 1),
    description: "Food",
    type: "expense",
  },
  {
    amount: 200,
    category: { name: "Food" },
    date: new Date(2024, 11, 1),
    description: "Food",
    type: "income",
  },
  {
    amount: 300,
    category: { name: "Car" },
    date: new Date(2025, 0, 1),
    description: "Car",
    type: "expense",
  },
  {
    amount: 400,
    category: { name: "Food" },
    date: new Date(2025, 1, 1),
    description: "Food",
    type: "income",
  },
  {
    amount: 500,
    category: { name: "Food" },
    date: new Date(2025, 2, 1),
    description: "Food",
    type: "goal",
  },
] as any;

const transactions2 = [
  {
    amount: 200,
    category: { name: "Food" },
    date: new Date(2024, 10, 1),
    description: "Food",
    type: "income",
  },
  {
    amount: 100,
    category: { name: "Car" },
    date: new Date(2024, 11, 1),
    description: "Car",
    type: "expense",
  },
  {
    amount: 200,
    category: { name: "Food" },
    date: new Date(2025, 0, 1),
    description: "Food",
    type: "income",
  },
  {
    amount: 300,
    category: { name: "Car" },
    date: new Date(2025, 1, 1),
    description: "Car",
    type: "expense",
  },
  {
    amount: 400,
    category: { name: "Food" },
    date: new Date(2025, 2, 1),
    description: "Food",
    type: "income",
  },
  {
    amount: 500,
    category: { name: "Food" },
    date: new Date(2025, 3, 1),
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

describe("chartDataUtils", () => {
  it("processTransactionsForChart returns correct data", () => {
    const data = processTransactionsForChart(transactions1, 5);

    expect(data?.labels).toEqual(["Nov/24", "Dez/24", "Jan", "Fev", "Mar"]);
    expect(data?.incomeData).toEqual([0, 200, 0, 400, 0]);
    expect(data?.expenseData).toEqual([100, 0, 300, 0, 0]);
  });

  it("processTransactionsForChart returns correct data", () => {
    const data = processTransactionsForChart(transactions2, 6);

    expect(data?.labels).toEqual([
      "Nov/24",
      "Dez/24",
      "Jan",
      "Fev",
      "Mar",
      "Abr",
    ]);
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
