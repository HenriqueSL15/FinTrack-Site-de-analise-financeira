import GoalCard from "../../common/GoalCard";
import NewGoalDialog from "../../layout/Goal/NewGoalDialog";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import getUserInformation from "@/utils/userInfoUtils";
import calculateRemaingDays from "./goalUtils";
import axios from "axios";
import Goal from "@/types/goal";

function Goals() {
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id as number),
    enabled: !!user?.id,
  });

  const updateGoalStatus = async (goal: Goal, status: string) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/goal/${user?.id}/${goal.id}`,
        {
          status,
        }
      );

      if (response.status === 200) {
        console.log("Deu tudo certo");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!data) return;
    const goals: Goal[] = data.goals;
    const remainingDays = goals.map((goal: Goal) =>
      calculateRemaingDays(goal.targetDate)
    );

    let anythingChanged = false;

    for (let i = 0; i < remainingDays.length; i++) {
      const goal = goals[i];
      const goalPercentage = (goal.currentAmount / goal.targetAmount) * 100;
      if (remainingDays[i] === 0) {
        if (goalPercentage < 100) {
          updateGoalStatus(goal, "expired");
          anythingChanged = true;
        } else {
          updateGoalStatus(goal, "completed");
          anythingChanged = true;
        }
      }
    }

    if (anythingChanged) {
      queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
    }
  }, [data]);

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
        {data?.goals.map((goal: Goal, i: number) => {
          return (
            <GoalCard
              key={goal.id}
              index={i}
              title={goal.description}
              targetAmount={goal.targetAmount}
              spent={goal.currentAmount}
              daysRemaining={calculateRemaingDays(goal.targetDate)}
              percentage={Math.round(
                (goal.currentAmount / goal.targetAmount) * 100
              )}
              date={goal.targetDate}
              id={String(goal.id)}
              status={goal.status}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Goals;
