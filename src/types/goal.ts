// Interface para os objetivos
export default interface Goal {
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
