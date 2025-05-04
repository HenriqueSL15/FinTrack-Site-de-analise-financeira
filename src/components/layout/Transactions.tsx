import axios from "axios";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import NewTransactionDialog from "./NewTransactionDialog.tsx";
import React from "react";

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

function Transactions() {
  return (
    <div className="w-full h-screen p-8 space-y-10">
      <h1 className="text-3xl font-bold mb-2 text-zinc-900">Transações</h1>
      <h2 className="text-neutral-500">
        Visualize e gerencie suas transações financeiras.
      </h2>
      <div className="w-full h-7/10 overflow-y-auto bg-gray-50 border border-gray-200 rounded-lg p-5">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold">Histórico de Transações</h1>
          <div className="flex gap-3 w-1/2 justify-end">
            <div className="relative">
              <Input
                className="bg-white w-50 h-10 pl-8"
                placeholder={"Buscar transações..."}
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
            <tr className="border-t border-gray-200 hover:bg-gray-100 transition-all">
              <td className="p-4">12/04/2025</td>
              <td>Compra de café</td>
              <td>Alimentação</td>
              <td>Despesa</td>
              <td>R$ 10,00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
