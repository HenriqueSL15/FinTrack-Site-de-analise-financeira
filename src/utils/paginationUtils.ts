import Transaction from "@/types/transaction";

const convertType = (type: string): string => {
  if (type === "income") return "Receita";
  if (type === "expense") return "Despesa";

  return "Outro";
};

// Obter transações da página atual
const getCurrentPageTransactions = (
  currentPage: number,
  data: Transaction[],
  search: string,
  transactionsPerPage: number
): Transaction[] => {
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  let filteredData = data || [];

  if (search) {
    filteredData = filteredData.filter((transaction) =>
      transaction.description.toLowerCase().includes(search.toLowerCase())
    );

    return filteredData;
  }

  return filteredData?.slice(startIndex, endIndex);
};

// Navegar entre páginas
const goToNextPage = (
  currentPage: number,
  totalPages: number,
  setCurrentPage: (currentPage: number) => void
): void => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const goToPreviousPage = (
  currentPage: number,
  setCurrentPage: (currentPage: number) => void
): void => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

export {
  convertType,
  getCurrentPageTransactions,
  goToNextPage,
  goToPreviousPage,
};
