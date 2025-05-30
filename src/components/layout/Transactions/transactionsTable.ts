import Transaction from "@/types/transaction";

export default interface TransactionsTableProps {
  currentPage: number;
  transactionsPerPage: number;
  transactions: Transaction[];
  search: string;
}
