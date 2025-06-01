import getSpentAmount from "../components/layout/Budget/budgetUtils";

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2025-05-31T03:00:00.000Z"));
});

describe("getSpentAmount", () => {
  it("returns 0 if there are no transactions", () => {
    expect(getSpentAmount({} as any, [])).toBe(0);
    expect(getSpentAmount({} as any, undefined as any)).toBe(0);
  });

  it("returns 0 if there are no transactions for the current month", () => {
    expect(
      getSpentAmount(
        {
          categoryId: 1,
        } as any,
        [
          {
            amount: 100,
            category: { name: "Food" },
            categoryId: 1,
            createdAt: "2025-01-01T03:00:00.000Z",
            description: "Food",
            type: "expense",
          },
        ] as any
      )
    ).toBe(0);
  });

  it("returns the correct amount if there are transactions for the current month", () => {
    expect(
      getSpentAmount(
        {
          categoryId: 1,
        } as any,
        [
          {
            amount: 100,
            category: { name: "Food" },
            categoryId: 1,
            createdAt: "2025-05-01T03:00:00.000Z",
            description: "Food",
            type: "expense",
          },
          {
            amount: 400,
            category: { name: "Food" },
            categoryId: 2,
            createdAt: "2025-07-01T03:00:00.000Z",
            description: "Food",
            type: "expense",
          },
        ] as any
      )
    ).toBe(100);
  });
});

afterAll(() => {
  jest.useRealTimers();
});
