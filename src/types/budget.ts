export default interface Budget {
  id: number;
  monthYear: string;
  limitAmount: number;
  spentAmount: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  categoryId: number;
}
