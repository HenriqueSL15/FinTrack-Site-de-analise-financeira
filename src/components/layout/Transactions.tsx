import axios from "axios";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Button } from "../ui/button.tsx";
import NewTransactionDialog from "./NewTransactionDialog.tsx";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext.tsx";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/utils/currencyUtils.ts";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Função para obter todas as informações relacionadas ao usuário
const getUserInformation = async (userId: number) => {
  try {
    try {
      // Usando Promise.all para fazer requisições paralelas
      const [transactionsRes, categoriesRes, budgetsRes, goalsRes] =
        await Promise.all([
          axios.get(`http://localhost:3000/transaction/${userId}`),
          axios.get(`http://localhost:3000/category/${userId}`),
          axios.get(`http://localhost:3000/budget/${userId}`),
          axios.get(`http://localhost:3000/goal/${userId}`),
        ]);
      return {
        transactions: transactionsRes.data.transactions,
        categories: categoriesRes.data.categories,
        budgets: budgetsRes.data.budgets,
        goals: goalsRes.data.goals,
      };
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  } catch (err) {
    console.log(err);
  }
};

const convertType = (type: string): string => {
  if (type === "income") return "Receita";
  if (type === "expense") return "Despesa";

  return "Outro";
};

interface Category {
  createdAt: string;
  id: number;
  name: string;
  type: string;
  updatedAt: string;
  userId: number;
}

interface Goal {
  id: number;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface Transaction {
  amount: number;
  category: Category;
  categoryId: number;
  createdAt: string;
  description: string;
  goalId?: number;
  goal?: Goal;
  id: number;
  type: string;
  updatedAt: string;
  userId: number;
}

function Transactions() {
  const { user, isLoading } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const transactionsPerPage = 6;

  const { data, isLoading: isLoadingUserInfo } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id),
    enabled: !!user?.id,
  });

  // Calcular páginação
  const totalTransactions = data?.transactions?.length || 0;
  const totalPages = Math.ceil(totalTransactions / transactionsPerPage);

  // Obter transações da página atual
  const getCurrentPageTransactions = (): Transaction[] => {
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    let filteredData = data?.transactions || [];

    if (search) {
      filteredData = filteredData.filter((transaction) =>
        transaction.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filteredData?.slice(startIndex, endIndex);
  };

  // Navegar entre páginas
  const goToNextPage = () => {
    console.log(currentPage, totalPages);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full h-screen p-8 space-y-10">
      <h1 className="text-3xl font-bold mb-2 text-zinc-900">Transações</h1>
      <h2 className="text-neutral-500">
        Visualize e gerencie suas transações financeiras.
      </h2>
      <div className="w-full h-[73%] overflow-y-auto bg-gray-50 border border-gray-200 rounded-lg p-5">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold">Histórico de Transações</h1>
          <div className="flex gap-3 w-1/2 justify-end">
            <div className="relative">
              <Input
                className="bg-white w-50 h-10 pl-8"
                placeholder={"Buscar transações..."}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-3 w-4 h-4" color="gray" />
            </div>
            <NewTransactionDialog />
          </div>
        </div>
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
              <th className="text-start text-neutral-500 font-medium text-sm">
                Valor
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {getCurrentPageTransactions().map((transaction) => {
              return (
                <tr className="border-t border-gray-200 hover:bg-gray-100 transition-all font-medium">
                  <td className="p-4">
                    {transaction.createdAt.split("T")[0].replaceAll("-", "/")}
                  </td>
                  <td className="min-w-20">{transaction.description}</td>
                  <td>{transaction.category.name}</td>
                  <td>
                    <h1
                      className={`${
                        transaction.type === "income"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } w-20 p-0.5 text-center rounded-full hover:bg-gray-100 hover:text-black transition-all cursor-default`}
                    >
                      {convertType(transaction.type)}
                    </h1>
                  </td>
                  <td
                    className={`${
                      transaction.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {formatCurrency(transaction.amount, user?.currency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center gap-3">
        <Button className="cursor-pointer" onClick={goToPreviousPage}>
          <ArrowLeft />
          Página Anterior
        </Button>
        <h1 className="font-semibold w-20 text-center">
          {currentPage} / {totalPages}
        </h1>
        <Button className="cursor-pointer" onClick={goToNextPage}>
          Próxima Página
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default Transactions;
