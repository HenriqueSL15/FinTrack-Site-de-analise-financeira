import calculateRemainingDays from "../components/layout/Goal/goalUtils";

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2025-05-31T03:00:00.000Z"));
});

describe("calculateRemainingDays", () => {
  it("returns 0 if the target date is in the past", () => {
    expect(calculateRemainingDays("2025-05-01T03:00:00.000Z")).toBe(0);
  });

  it("returns the correct number of days if the target date is in the future", () => {
    expect(calculateRemainingDays("2025-07-31T03:00:00.000Z")).toBe(61);
  });
});

afterAll(() => {
  jest.useRealTimers();
});
