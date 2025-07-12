import z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import {
  convertToBRL,
  formatCurrency,
  parseCurrencyString,
} from "@/utils/currencyUtils";
import { useQueryClient } from "@tanstack/react-query";
import { toISODate } from "@/utils/dateUtils";
import axios from "axios";
import GoalCardProps from "@/types/goalCard";
import { calculateBalance } from "@/utils/transactionUtils";
import { useQuery } from "@tanstack/react-query";
import getUserInformation from "@/utils/userInfoUtils";
import { toast } from "sonner";

function UpdatedGoalDialog({
  goal,
}: {
  goal: Omit<GoalCardProps, "daysRemaining" | "percentage">;
}) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id as number),
    enabled: !!user,
  });

  const balance = data ? calculateBalance(data.transactions) : 0;

  // Schema de validação com Zod
  const goalFormSchema = z.object({
    name: z.string().min(1, {
      message: "Nome do objetivo é obrigatório",
    }),
    targetAmount: z
      .number()
      .min(1, { message: "Valor deve ser um número positivo" }),
    currentAmount: z
      .number()
      .min(0, { message: "Valor deve ser de 0 para cima" }),
    targetDate: z.string(),
  });

  const queryClient = useQueryClient();

  // Configuração do formulário
  const form = useForm<z.infer<typeof goalFormSchema>>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      name: goal.title,
      targetAmount: parseCurrencyString(
        formatCurrency(goal.targetAmount, user?.currency)
      ),
      currentAmount: parseCurrencyString(
        formatCurrency(goal.spent, user?.currency)
      ),
      targetDate: toISODate(goal.date),
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: goal.title,
        targetAmount: parseCurrencyString(
          formatCurrency(goal.targetAmount, user?.currency)
        ),
        currentAmount: parseCurrencyString(
          formatCurrency(goal.spent, user?.currency)
        ),
        targetDate: toISODate(goal.date),
      });
    }
  }, [open, goal, user?.currency, form]);

  async function onSubmit(
    values: z.infer<typeof goalFormSchema>
  ): Promise<void> {
    const loadingToast = toast.loading("Carregando!");

    setLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/goal/${user?.id}/${goal.id}`,
        {
          description: values.name,
          targetAmount: convertToBRL(
            values.targetAmount,
            user?.currency || "BRL"
          ),
          currentAmount: convertToBRL(
            values.currentAmount,
            user?.currency || "BRL"
          ),
          targetDate: new Date(values.targetDate).toISOString(),
          balance: balance,
          date: new Date(),
        }
      );
      if (response.status === 200) {
        console.log("Objetivo atualizado com sucesso!");

        toast.dismiss(loadingToast);
        toast.success("Objetivo atualizado!");

        // Invalida a consulta de orçamentos para atualizar a UI
        queryClient.invalidateQueries({
          queryKey: ["userInfo", user?.id],
        });
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }

    setOpen(false);
    form.reset();
  }

  // Função que deleta o objetivo
  async function handleDeleteGoal(
    goalId: number,
    userId: number
  ): Promise<void> {
    const loadingToast = toast.loading("Carregando!");

    setLoading(true);

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/goal/${userId}/${goalId}`
      );

      if (response.status === 200) {
        toast.dismiss(loadingToast);
        toast.success("Objetivo deletado!");
        queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
      }
      console.log("Orçamento deletado com sucesso!");
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Ocorreu um erro!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger id="updateGoalButton" asChild>
        <Button className="cursor-pointer w-full">Atualizar objetivo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar objetivo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-5"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      id="goalName"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Valor meta */}
            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta ({user?.currency})</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      disabled={loading}
                      id="goalAmount"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantia atual */}
            <FormField
              control={form.control}
              name="currentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quantia atual reservada ({user?.currency})
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      disabled={loading}
                      id="goalCurrentAmount"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Data alvo */}
            <FormField
              control={form.control}
              name="targetDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data alvo</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      id="goalDate"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between gap-4">
              <Button
                className="w-20 cursor-pointer"
                onClick={() => {
                  handleDeleteGoal(Number(goal.id), user?.id as number);
                  setOpen(false);
                  form.reset();
                }}
                type="button"
                variant={"destructive"}
                disabled={loading}
                id="deleteGoalButton"
              >
                Deletar
              </Button>
              <div className="flex justify-end gap-4">
                <Button
                  className="w-20 cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                    form.reset();
                  }}
                  type="button"
                  variant={"outline"}
                  id="cancelButton"
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  id="saveButton"
                  disabled={loading}
                >
                  Salvar
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdatedGoalDialog;
