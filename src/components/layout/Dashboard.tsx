import {
  CircleDollarSign,
  ArrowUp,
  ArrowDown,
  Wallet,
  ChartLine,
} from "lucide-react";

import { useState, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

import AreaChart from "./AreaChart.tsx";
import FinancialCard from "../common/FinancialCard.tsx";
import { AuthContext } from "@/contexts/AuthContext.tsx";

// Interface para as transações
interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  categoryId: number;
}

// Função para calcular o saldo atual
const calculateBalance = (transactions: Transaction[]): number => {
  if (!transactions || transactions.length === 0) return 0;

  return transactions.reduce((balance, transaction) => {
    if (transaction.type === "income") {
      return balance + transaction.amount;
    } else if (transaction.type === "expense" || transaction.type === "goal") {
      return balance - transaction.amount;
    }

    return balance;
  }, 0);
};

// Função para calcular o total de receitas
const calculateTotalIncome = (transactions: Transaction[]): number => {
  if (!transactions || transactions.length === 0) return 0;

  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
};

// Função para calcular o total de despesas
const calculateTotalExpenses = (transactions: Transaction[]): number => {
  if (!transactions || transactions.length === 0) return 0;

  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
};

// Função para calcular o total de economias
const calculateTotalSavings = (transactions: Transaction[]): number => {
  if (!transactions || transactions.length === 0) return 0;

  return transactions
    .filter((transaction) => transaction.type === "goal")
    .reduce((total, transaction) => total + transaction.amount, 0);
};

// Função para formatar valores monetários
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

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

function Dashboard() {
  const { user, isLoading } = useContext(AuthContext);

  const { data, isLoading: isLoadingBalance } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id),
    enabled: !!user?.id,
  });

  // Calcula valores financeiros quand os dados estiverem disponíveis
  const balance = data ? calculateBalance(data.transactions) : 0;
  const totalIncome = data ? calculateTotalIncome(data.transactions) : 0;
  const totalExpenses = data ? calculateTotalExpenses(data.transactions) : 0;
  const totalSavings = data ? calculateTotalSavings(data.transactions) : 0;

  return (
    <div className="w-full h-screen p-8 space-y-10">
      <h1 className="text-3xl font-bold mb-2 text-zinc-900">Dashboard</h1>
      <h2 className="text-neutral-500">
        Visão geral da sua situação financeira.
      </h2>
      <div className="w-full h-2/10 flex gap-5">
        <FinancialCard
          title="Saldo Atual"
          value={formatCurrency(balance)}
          subtitle="Atualizado hoje"
          icon={CircleDollarSign}
        />
        <FinancialCard
          title="Receitas"
          value={formatCurrency(totalIncome)}
          subtitle="+15% em relação ao mês anterior"
          icon={ArrowUp}
          iconColor="green"
        />
        <FinancialCard
          title="Despesas"
          value={formatCurrency(totalExpenses)}
          subtitle="-2% em relação ao mês anterior"
          icon={ArrowDown}
          iconColor="red"
        />
        <FinancialCard
          title="Economias"
          value={formatCurrency(totalSavings)}
          subtitle="+8.5% em relação ao mês anterior"
          icon={Wallet}
          iconColor="gray"
        />
      </div>
      <div className="w-full h-6/12 bg-gray-50 border border-gray-200 rounded-sm flex flex-col p-8">
        <div className="flex gap-2 items-center">
          <ChartLine size={20} />
          <h1 className="text-2xl font-semibold">Análise Financeira</h1>
        </div>
        <div className="h-full w-full">
          <AreaChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
