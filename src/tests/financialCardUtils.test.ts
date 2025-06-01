import {
  calculateMonthlyIncomeChangePercentage,
  calculateMonthlyExpenseChangePercentage,
  calculateMonthlySavingsChangePercentage,
} from "../components/layout/Dashboard/financialCardsUtils";

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2025-05-31T03:00:00.000Z"));
});

const mockData1 = [
  {
    amount: 50,
    category: { name: "Food" },
    createdAt: "2025-04-01T03:00:00.000Z",
    description: "Food",
    type: "expense",
  },
  {
    amount: 200,
    category: { name: "House" },
    createdAt: "2025-04-01T03:00:00.000Z",
    description: "House",
    type: "income",
  },
  {
    amount: 150,
    category: { name: "Food" },
    createdAt: "2025-05-01T03:00:00.000Z",
    description: "Food",
    type: "income",
  },
  {
    amount: 100,
    category: { name: "Car" },
    createdAt: "2025-05-01T03:00:00.000Z",
    description: "Car",
    type: "expense",
  },
  {
    amount: 200,
    category: { name: "Car" },
    createdAt: "2025-05-01T03:00:00.000Z",
    description: "Car",
    type: "goal",
  },
] as any;

describe("calculateMonthlyIncomeChangePercentage", () => {
  it("returns null if there are no transactions or transactions are null", () => {
    expect(calculateMonthlyIncomeChangePercentage([])).toBeNull();
    expect(calculateMonthlyIncomeChangePercentage(null as any)).toBeNull();
  });

  it("returns correct value if there are transactions", () => {
    expect(calculateMonthlyIncomeChangePercentage(mockData1)).toEqual({
      subtitle: "-25% em relação ao mês anterior",
      iconColor: "red",
    });
  });
});

describe("calculateMonthlyExpenseChangePercentage", () => {
  it("returns null if there are no transactions or transactions are null", () => {
    expect(calculateMonthlyExpenseChangePercentage([])).toBeNull();
    expect(calculateMonthlyExpenseChangePercentage(null as any)).toBeNull();
  });

  it("returns correct value if there are transactions", () => {
    expect(calculateMonthlyExpenseChangePercentage(mockData1)).toEqual({
      subtitle: "+100% em relação ao mês anterior",
      iconColor: "green",
    });
  });
});

describe("calculateMonthlySavingsChangePercentage", () => {
  it("returns null if there are no transactions or transactions are null", () => {
    expect(calculateMonthlySavingsChangePercentage([])).toBeNull();
    expect(calculateMonthlySavingsChangePercentage(null as any)).toBeNull();
  });

  it("returns correct value if there are transactions", () => {
    expect(calculateMonthlySavingsChangePercentage(mockData1)).toEqual({
      subtitle: "Sem dados do mês anterior",
      iconColor: "gray",
    });
  });
});

afterAll(() => {
  jest.useRealTimers();
});
