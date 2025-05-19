import GoalCard from "../common/GoalCard";
import NewGoalDialog from "../layout/NewGoalDialog";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import getUserInformation from "@/utils/userInfoUtils";

function Goals() {
  const { user } = useContext(AuthContext);

  const { data, isLoading: isLoadingUserInfo } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id),
    enabled: !!user?.id,
  });

  // Função para calcular os dias restantes até a data alvo
  const calculateRemaingDays = (date: string): number => {
    const targetDate = new Date(date);
    const currentDate = new Date();
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Se a diferença for negativa, significa que a data já passou
    return daysDiff < 0 ? 0 : daysDiff;
  };

  return (
    <div className="w-full h-screen p-8 space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-zinc-900">
            Objetivos Financeiros
          </h1>
          <h2 className="text-neutral-500">
            Acompanhe o progresso de suas metas financeiras.
          </h2>
        </div>
        <NewGoalDialog />
      </div>
      <div className="grid grid-cols-2 gap-5">
        {data?.goals.map((goal) => {
          return (
            <GoalCard
              key={goal.id}
              title={goal.description}
              targetAmount={goal.targetAmount}
              spent={goal.currentAmount}
              daysRemaining={calculateRemaingDays(goal.targetDate)}
              percentage={Math.round(
                (goal.currentAmount / goal.targetAmount) * 100
              )}
              date={goal.targetDate}
              id={goal.id}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Goals;
