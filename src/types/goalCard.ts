// Interface para as props do GoalCard
export default interface GoalCardProps {
  title: string;
  targetAmount: number;
  spent: number;
  daysRemaining: number;
  percentage: number;
  date: string;
  id: string;
  index: number;
}
