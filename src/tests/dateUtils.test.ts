import { toISODate } from "../utils/dateUtils";

describe("toISODate", () => {
  it("converts correctly", () => {
    expect(toISODate("01/01/2020")).toBe("2020-01-01");
    expect(toISODate("2020-01-01")).toBe("2020-01-01");
    expect(toISODate("01/01/2020 00:00:00")).toBe("2020-01-01");
  });

  it("returns empty string for invalid dates", () => {
    expect(toISODate("invalid")).toBe("");
    expect(toISODate(undefined as any)).toBe("");
  });
});
