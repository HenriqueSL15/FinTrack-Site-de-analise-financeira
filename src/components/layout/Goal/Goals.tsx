import GoalCard from "../../common/GoalCard";
import NewGoalDialog from "../../layout/Goal/NewGoalDialog";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import getUserInformation from "@/utils/userInfoUtils";
import calculateRemaingDays from "./goalUtils";
import Goal from "@/types/goal";

function Goals() {
  const { user } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id as number),
    enabled: !!user?.id,
  });

  return (
    <div className="w-full h-screen p-8 space-y-10 dark:bg-[#1A1A1A]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-white">
            Objetivos Financeiros
          </h1>
          <h2 className="text-neutral-500 dark:text-neutral-400">
            Acompanhe o progresso de suas metas financeiras.
          </h2>
        </div>
        <NewGoalDialog />
      </div>
      <div className="grid grid-cols-2 gap-5">
        {data?.goals.map((goal: Goal) => {
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
              id={String(goal.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Goals;
