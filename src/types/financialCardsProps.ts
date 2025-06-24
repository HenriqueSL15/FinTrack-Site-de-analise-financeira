import { LucideIcon } from "lucide-react";

export default interface FinancialCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
}
