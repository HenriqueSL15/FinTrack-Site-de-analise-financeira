import { formatCurrency } from "@/utils/currencyUtils";
import {
  convertType,
  getCurrentPageTransactions,
} from "@/utils/paginationUtils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import TransactionsTableProps from "./transactionsTable";
import Transaction from "@/types/transaction";

function TransactionsTable({
  currentPage,
  transactionsPerPage,
  transactions,
  search,
}: TransactionsTableProps) {
  const { user } = useContext(AuthContext);
  const filteredTransactions = getCurrentPageTransactions(
    currentPage,
    transactions,
    search,
    transactionsPerPage
  );

  return (
    <table className="w-full">
      <thead className="w-full">
        <tr>
          <th className="text-start text-neutral-500 font-medium text-sm p-4">
            Data
          </th>
          <th className="text-start text-neutral-500 font-medium text-sm">
            Descrição
          </th>
          <th className="text-start text-neutral-500 font-medium text-sm">
            Categoria
          </th>
          <th className="text-start text-neutral-500 font-medium text-sm">
            Tipo
          </th>
          <th className="text-neutral-500 font-medium text-sm text-end pr-4">
            Valor
          </th>
        </tr>
      </thead>
      <tbody className="w-full">
        {filteredTransactions.map((transaction: Transaction, i) => {
          return (
            <tr
              data-testid={`transactionRow-${i}`}
              className="border-t border-gray-200 dark:border-[#2e2e2e] hover:bg-gray-100  dark:hover:bg-neutral-800 transition-all text-sm"
            >
              <td
                className="p-4 w-[20%]"
                data-testid={`transactionRow-${i}-date`}
              >
                {transaction.date.split("T")[0].split("-").reverse().join("/")}
              </td>
              <td
                className="min-w-20"
                data-testid={`transactionRow-${i}-description`}
              >
                {transaction.description}
              </td>
              <td data-testid={`transactionRow-${i}-category`}>
                {transaction.category.name}
              </td>
              <td>
                <h1
                  className={`${
                    transaction.type === "income"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }  w-25 h-7 text-center rounded-full  transition-all cursor-default flex items-center justify-center gap-1`}
                  data-testid={`transactionRow-${i}-type`}
                >
                  {transaction.type === "income" ? (
                    <ArrowUp size={18} />
                  ) : (
                    <ArrowDown size={18} />
                  )}
                  {convertType(transaction.type)}
                </h1>
              </td>
              <td
                className={`${
                  transaction.type === "income"
                    ? "text-emerald-600"
                    : "text-rose-600"
                } w-[5%] text-end pr-4`}
                data-testid={`transactionRow-${i}-amount`}
              >
                {formatCurrency(transaction.amount, user?.currency)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TransactionsTable;
