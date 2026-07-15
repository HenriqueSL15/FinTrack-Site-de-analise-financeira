import Goal from "./goal";
import Category from "./category";
import User from "./user";

// Interface para as transações
export default interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  userId: number;
  categoryId: number;
  category: Category;
  goalId?: number;
  goal?: Goal;
  installmentPlanId?: number;
  installmentNumber?: number;
  installmentPlan?: InstallmentPlan;
}

// Interface para o plano de parcelas
export interface InstallmentPlan {
  id: number;
  description: string;
  interestRate: number;
  installmentCount: number;
  startDate: string;
  userId: number;
  categoryId: number;
  user: User;
  category: Category;
  transactions: Transaction[];
}
