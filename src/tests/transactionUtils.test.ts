import {
  calculateBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateTotalSavings,
} from "../utils/transactionUtils";

const mockTransactions = [
  { type: "income", amount: 100 },
  { type: "expense", amount: 40 },
  { type: "goal", amount: 10 },
  { type: "income", amount: 50 },
  { type: "expense", amount: 20 },
] as any;

describe("transactionUtils", () => {
  it("calculateBalance returns correct value", () => {
    expect(calculateBalance(mockTransactions)).toBe(80);
    expect(calculateBalance([])).toBe(0);
    expect(calculateBalance(undefined as any)).toBe(0);
  });

  it("calculateBalance returns 0 if there are no transactions", () => {
    expect(calculateBalance([])).toBe(0);
    expect(calculateBalance(undefined as any)).toBe(0);
  });

  it("calculateTotalIncome returns correct value", () => {
    expect(calculateTotalIncome(mockTransactions)).toBe(150);
    expect(calculateTotalIncome([])).toBe(0);
  });

  it("calculateTotalIncome returns 0 if there are no transactions", () => {
    expect(calculateTotalIncome([])).toBe(0);
    expect(calculateTotalIncome(undefined as any)).toBe(0);
  });

  it("calculateTotalExpenses returns correct value", () => {
    expect(calculateTotalExpenses(mockTransactions)).toBe(60);
    expect(calculateTotalExpenses([])).toBe(0);
  });

  it("calculateTotalExpenses returns 0 if there are no transactions", () => {
    expect(calculateTotalExpenses([])).toBe(0);
    expect(calculateTotalExpenses(undefined as any)).toBe(0);
  });

  it("calculateTotalSavings returns correct value", () => {
    expect(calculateTotalSavings(mockTransactions)).toBe(10);
    expect(calculateTotalSavings([])).toBe(0);
  });

  it("calculateTotalSavings returns 0 if there are no transactions", () => {
    expect(calculateTotalSavings([])).toBe(0);
    expect(calculateTotalSavings(undefined as any)).toBe(0);
  });
});
