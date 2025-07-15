import { Progress } from "../ui/progress";
import { formatCurrency } from "@/utils/currencyUtils";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import UpdatedGoalDialog from "../layout/Goal/UpdateGoalDialog";
import GoalCardProps from "@/types/goalCard";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

function GoalCard({
  title,
  targetAmount,
  spent,
  daysRemaining,
  percentage,
  date,
  id,
  index,
  status,
}: GoalCardProps) {
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  // Função que deleta o objetivo
  async function handleDeleteGoal(
    goalId: number,
    userId: number
  ): Promise<void> {
    const loadingToast = toast.loading("Carregando!");

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/goal/${userId}/${goalId}/${percentage}`
      );

      if (response.status === 200) {
        toast.dismiss(loadingToast);
        if (percentage === 100) {
          toast.success("Objetivo deletado!");
        } else {
          toast.info("O dinheiro que foi armazenado foi devolvido!");
        }
        queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
      }
      console.log("Orçamento deletado com sucesso!");
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Ocorreu um erro!");
      console.log(err);
    }
  }

  return (
    <div
      data-testid={`goalCard-${index}`}
      className={`${
        status === "active"
          ? "bg-neutral-50 border-neutral-300 dark:border-[#2e2e2e] dark:bg-[#1f1f1f]"
          : status === "completed"
          ? "bg-green-500/30 border-green-500 dark:border-green-500/30 dark:bg-green-500/30"
          : "bg-red-500/30 border-red-500 dark:border-red-500/30 dark:bg-red-500/30"
      } border  rounded-lg p-5 flex flex-col gap-2 min-h-64`}
    >
      <h1 className=" font-semibold text-2xl" data-testid="goalTitle">
        {title}
      </h1>
      <Progress value={percentage} className="h-2 [&>div]:bg-emerald-600" />
      <div className="flex justify-between">
        <h1 className="text-xs text-muted-foreground">
          {formatCurrency(spent, user?.currency)} de{" "}
          {formatCurrency(targetAmount, user?.currency)}
        </h1>
        <h1
          className="text-xs text-muted-foreground"
          data-testid="goalPercentage"
        >
          {percentage}% utilizado
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <h1 className="font-medium">Meta:</h1>
          {/* Usar a formatação */}
          <h2 data-testid="goalAmount">
            {formatCurrency(targetAmount, user?.currency)}
          </h2>
        </div>
        <div>
          <h1 className="font-medium">Economizado:</h1>
          {/* Usar a formatação */}
          <h2 data-testid="goalSpent">
            {formatCurrency(spent, user?.currency)}
          </h2>
        </div>
        <div>
          <h1 className="font-medium">Data alvo:</h1>
          {/* Usar a formatação */}
          <h2 data-testid="goalDate">
            {date.split("T")[0].split("-").reverse().join("/")}
          </h2>
        </div>
        <div>
          <h1 className="font-medium">Dias restantes:</h1>
          {/* Usar a formatação */}
          <h2 data-testid="goalDays">{daysRemaining}</h2>
        </div>
      </div>
      {status === "active" ? (
        <UpdatedGoalDialog
          goal={{ title, targetAmount, spent, date, id, index, percentage }}
        />
      ) : (
        <Button
          className="cursor-pointer w-full"
          onClick={() => handleDeleteGoal(Number(id), user?.id as number)}
          type="button"
          variant={"destructive"}
          id="deleteGoalButton"
        >
          Deletar Objetivo
        </Button>
      )}
    </div>
  );
}

export default GoalCard;
