import {
  processTransactionsForChart,
  processTransactionsPerCategory,
} from "../utils/chartDataUtils";

const transactions1 = [
  {
    amount: 100,
    category: { name: "Food" },
    createdAt: "2025-01-01T03:00:00.000Z",
    description: "Food",
    type: "expense",
  },
  {
    amount: 200,
    category: { name: "Food" },
    createdAt: "2025-02-01T03:00:00.000Z",
    description: "Food",
    type: "income",
  },
  {
    amount: 300,
    category: { name: "Car" },
    createdAt: "2025-03-01T03:00:00.000Z",
    description: "Car",
    type: "expense",
  },
  {
    amount: 400,
    category: { name: "Food" },
    createdAt: "2025-04-01T03:00:00.000Z",
    description: "Food",
    type: "income",
  },
  {
    amount: 500,
    category: { name: "Food" },
    createdAt: "2025-05-01T03:00:00.000Z",
    description: "Food",
    type: "goal",
  },
] as any;

const transactions2 = [
  {
    amount: 200,
    category: { name: "Food" },
    createdAt: "2024-12-01T03:00:00.000Z",
    description: "Food",
    type: "income",
  },
  {
    amount: 100,
    category: { name: "Car" },
    createdAt: "2025-01-01T03:00:00.000Z",
    description: "Car",
    type: "expense",
  },
  {
    amount: 200,
    category: { name: "Food" },
    createdAt: "2025-02-01T03:00:00.000Z",
    description: "Food",
    type: "income",
  },
  {
    amount: 300,
    category: { name: "Car" },
    createdAt: "2025-03-01T03:00:00.000Z",
    description: "Car",
    type: "expense",
  },
  {
    amount: 400,
    category: { name: "Food" },
    createdAt: "2025-04-01T03:00:00.000Z",
    description: "Food",
    type: "income",
  },
  {
    amount: 500,
    category: { name: "Food" },
    createdAt: "2025-05-01T03:00:00.000Z",
    description: "Food",
    type: "goal",
  },
] as any;

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2025-05-31T03:00:00.000Z"));
});

describe("chartDataUtils", () => {
  it("processTransactionsForChart returns correct data", () => {
    const data = processTransactionsForChart(transactions1, 5);

    expect(data?.labels).toEqual(["Jan", "Fev", "Mar", "Abr", "Mai"]);
    expect(data?.incomeData).toEqual([0, 200, 0, 400, 0]);
    expect(data?.expenseData).toEqual([100, 0, 300, 0, 0]);
  });

  it("processTransactionsForChart returns correct data", () => {
    const data = processTransactionsForChart(transactions2, 6);

    expect(data?.labels).toEqual(["Dez/24", "Jan", "Fev", "Mar", "Abr", "Mai"]);
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

afterAll(() => {
  jest.useRealTimers();
});
