import {
  getCurrentPageTransactions,
  goToNextPage,
  goToPreviousPage,
  convertType,
} from "../utils/paginationUtils";

const transactions = Array.from({ length: 10 }, (_, i) => ({
  description: `Transaction ${i + 1}`,
})) as any;

describe("paginationUtils", () => {
  it("getCurrentPageTransactions paginates correctly", () => {
    const page = getCurrentPageTransactions(1, transactions, "", 5);
    expect(page.length).toBe(5);
    expect(page[0].description).toBe("Transaction 1");
  });

  it("getCurrentPageTransactions filters by search", () => {
    const page = getCurrentPageTransactions(1, transactions, "3", 5);
    expect(page.length).toBe(1);
    expect(page[0].description).toBe("Transaction 3");
  });

  it("getCurrentPageTransactions returns empty array if no transactions", () => {
    const page = getCurrentPageTransactions(1, [], "", 5);
    expect(page).toEqual([]);
  });

  it("getCurrentPageTransactions returns empty array if page is 0", () => {
    const page = getCurrentPageTransactions(0, transactions, "", 5);
    expect(page).toEqual([]);
  });

  it("getCurrentPageTransactions returns empty array if transactionsPerPage less than 1", () => {
    const page = getCurrentPageTransactions(1, transactions, "", 0);
    expect(page).toEqual([]);
  });

  it("convertType returns correct string", () => {
    expect(convertType("income")).toBe("Receita");
    expect(convertType("expense")).toBe("Despesa");
    expect(convertType("other")).toBe("Outro");
  });

  it("convertType returns Outro if type is not income or expense", () => {
    expect(convertType("other")).toBe("Outro");
  });

  it("goToNextPage increments page", () => {
    let page = 1;
    goToNextPage(page, 3, (p) => (page = p));
    expect(page).toBe(2);
  });

  it("goToPreviousPage decrements page", () => {
    let page = 2;
    goToPreviousPage(page, (p) => (page = p));
    expect(page).toBe(1);
  });
});
