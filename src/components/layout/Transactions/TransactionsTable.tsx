import { formatCurrency } from "@/utils/currencyUtils";
import {
  convertType,
  getCurrentPageTransactions,
} from "@/utils/paginationUtils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import TransactionsTableProps from "./transactionsTable";
import Transaction from "@/types/transaction";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { toast } from "sonner";

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
    transactionsPerPage,
  );
  const [transactionDialog, setTransactionDialog] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction>();

  const queryClient = useQueryClient();

  const handleTransactionDeletion = async (type: string) => {
    try {
      const starterTransaction = transactions.find(
        (t) => t.id == currentTransaction?.id,
      );

      const filteredTransactions = transactions.filter((t) => {
        if (type == "this") return t.id === currentTransaction?.id;

        if (
          type == "foward" &&
          new Date(t.date) >= new Date(starterTransaction!.date) &&
          t.installmentPlanId === starterTransaction!.installmentPlanId
        )
          return t;

        if (
          type == "all" &&
          t.installmentPlanId === starterTransaction!.installmentPlanId
        ) {
          return t;
        }
      });

      const loadingToast = toast.loading("Deletando!");
      for (const transactionId of filteredTransactions.map((t) => t.id)) {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/transaction/${user?.id}/${transactionId}`,
        );

        if (response.data.message != "Transação deletada com sucesso!") {
          toast.dismiss(loadingToast);
          toast.error("Ocorreu um erro!");
          throw new Error(`${response.data.message} / ${transactionId}`);
        }
      }

      toast.dismiss(loadingToast);
      if (filteredTransactions.length > 1)
        toast.success("Transações deletadas com sucesso!");
      else toast.success("Transação deletada com sucesso!");

      // Invalida a consulta de transações para atualizar a UI
      queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
                  {transaction.date
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")}
                </td>
                <td
                  className="min-w-20"
                  data-testid={`transactionRow-${i}-description`}
                >
                  {transaction.description}
                </td>
                <td data-testid={`transactionRow-${i}-category`}>
                  {transaction.category?.name || "Objetivo"}
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
                <td className="w-1/30 justify-end pr-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant={"outline"} className="cursor-pointer">
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentTransaction(transaction);

                            if (transaction.installmentPlanId) {
                              setTransactionDialog(true);
                            } else handleTransactionDeletion("this");
                          }}
                        >
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Dialog open={transactionDialog} onOpenChange={setTransactionDialog}>
        <DialogContent className="w-fit sm:max-w-max">
          <DialogHeader>
            <DialogTitle>Qual das ações você deseja fazer?</DialogTitle>
            <DialogDescription>Escolha uma das 3 opções</DialogDescription>
          </DialogHeader>
          <div className="gap-3 mt-3 flex flex-col items-start">
            <DialogClose>
              <Button
                type="button"
                onClick={() => handleTransactionDeletion("this")}
              >
                Deletar ESSA transação
              </Button>
            </DialogClose>
            <DialogClose>
              <Button
                type="button"
                onClick={() => handleTransactionDeletion("foward")}
              >
                Deletar ESSA e as transações futuras relacionadas ao mesmo
                empréstimo/parcelamento
              </Button>
            </DialogClose>
            <DialogClose>
              <Button
                type="button"
                onClick={() => handleTransactionDeletion("all")}
              >
                Deletar o empréstimo/parcelamento inteiro
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TransactionsTable;
