import {
  convertCurrency,
  formatCurrency,
  parseCurrencyString,
  convertToBRL,
} from "../utils/currencyUtils";

describe("currencyUtils", () => {
  it("convertCurrency converts correctly", () => {
    expect(convertCurrency(10, "USD")).toBeCloseTo(1.842, 2);
    expect(convertCurrency(10, "EUR")).toBeCloseTo(1.56, 2);
    expect(convertCurrency(10, "BRL")).toBe(10);
  });

  it("convertCurrency logs a message for unsupported currencies", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    convertCurrency(10, "JPY" as any);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Moeda não suportada: JPY, usando BRL como padrão"
    );
  });

  it("convertCurrency returns 0 for negative amounts", () => {
    expect(convertCurrency(-10, "USD")).toBe(0);
    expect(convertCurrency(-10, "EUR")).toBe(0);
    expect(convertCurrency(-10, "BRL")).toBe(0);
  });
});

describe("formatCurrency", () => {
  it("formats correctly", () => {
    expect(formatCurrency(10, "USD")).toBe("US$\u00A01,84");
    expect(formatCurrency(10, "EUR")).toBe("€\u00A01,56");
    expect(formatCurrency(10, "BRL")).toBe("R$\u00A010,00");
  });

  it("formats correctly with default currency", () => {
    expect(formatCurrency(10)).toBe("R$\u00A010,00");
  });

  it("returns 0 with negative values", () => {
    expect(formatCurrency(-10, "USD")).toBe("US$\u00A00,00");
    expect(formatCurrency(-10, "EUR")).toBe("€\u00A00,00");
    expect(formatCurrency(-10, "BRL")).toBe("R$\u00A00,00");
  });
});

describe("parseCurrencyString", () => {
  it("parses correctly", () => {
    expect(parseCurrencyString("US$\u00A010.00")).toBe(10);
    expect(parseCurrencyString("€\u00A010.00")).toBe(10);
    expect(parseCurrencyString("R$\u00A010.00")).toBe(10);
  });

  it("returns 0 with if no value is sent", () => {
    expect(parseCurrencyString(undefined as any)).toBe(0);
  });
});

describe("convertToBRL", () => {
  it("converts correctly", () => {
    expect(convertToBRL(10, "USD")).toBeCloseTo(54.28881650380021, 2);
    expect(convertToBRL(10, "EUR")).toBeCloseTo(64.11489388985062, 2);
    expect(convertToBRL(10, "BRL")).toBe(10);
  });

  it("returns 0 with negative values", () => {
    expect(convertToBRL(-10, "USD")).toBe(0);
    expect(convertToBRL(-10, "EUR")).toBe(0);
    expect(convertToBRL(-10, "BRL")).toBe(0);
  });
});
