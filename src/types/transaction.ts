import Goal from "./goal";
import Category from "./category";

// Interface para as transações
export default interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  categoryId: number;
  category: Category;
  goalId?: number;
  goal?: Goal;
}
