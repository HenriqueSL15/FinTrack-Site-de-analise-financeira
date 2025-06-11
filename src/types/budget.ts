import Category from "./category";

export default interface Budget {
  id: number;
  monthYear: string;
  limitAmount: number;
  spentAmount: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  category: Category;
  categoryId: number;
}
