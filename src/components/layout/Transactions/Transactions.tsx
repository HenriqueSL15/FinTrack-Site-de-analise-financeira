import { Input } from "../../ui/input.tsx";
import { Search } from "lucide-react";
import TransactionsTable from "./TransactionsTable.tsx";

import NewTransactionDialog from "./NewTransactionDialog.tsx";
import NewCategoryDialog from "./NewCategoryDialog.tsx";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext.tsx";
import { useQuery } from "@tanstack/react-query";
import getUserInformation from "@/utils/userInfoUtils.ts";

import Pagination from "../../common/Pagination.tsx";
import { goToNextPage, goToPreviousPage } from "@/utils/paginationUtils.ts";

function Transactions() {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const transactionsPerPage = 6;

  const { data } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id as number),
    enabled: !!user?.id,
  });

  // Calcular páginação
  const totalTransactions = data?.transactions?.length || 0;
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

  return (
    <div className="w-full h-screen p-8 space-y-10 dark:bg-[#1a1a1a]">
      <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-white">
        Transações
      </h1>
      <h2 className="text-neutral-500 dark:text-neutral-400">
        Visualize e gerencie suas transações financeiras.
      </h2>
      <div className="w-full h-[73%] overflow-y-auto bg-gray-50 border border-gray-200 rounded-lg p-5 dark:border-[#2e2e2e] dark:bg-[#1f1f1f]">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold">Histórico de Transações</h1>
          <div className="flex gap-3 w-1/2 justify-end">
            <NewCategoryDialog />
            <div className="relative">
              <Input
                className="bg-white w-50 h-10 pl-8 dark:bg-neutral-900"
                placeholder={"Buscar transações..."}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-3 w-4 h-4" color="gray" />
            </div>
            <NewTransactionDialog />
          </div>
        </div>
        <TransactionsTable
          currentPage={currentPage}
          transactionsPerPage={transactionsPerPage}
          transactions={data?.transactions}
          search={search}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPreviousPage={() => goToPreviousPage(currentPage, setCurrentPage)}
        goToNextPage={() =>
          goToNextPage(currentPage, totalPages, setCurrentPage)
        }
      />
    </div>
  );
}

export default Transactions;
