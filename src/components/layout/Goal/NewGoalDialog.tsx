import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { useContext, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "@/contexts/AuthContext.tsx";
import { toast } from "sonner";

function NewGoalDialog() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Schema de validação com Zod
  const goalFormSchema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    goal: z.string().refine((val) => !isNaN(parseFloat(val)), {
      message: "Digite um número válido",
    }),
    monthYear: z
      .string()
      .min(1, { message: "Data é obrigatória" })
      .refine((val) => !isNaN(Date.parse(val)), { message: "Data inválida" }),
  });

  const queryClient = useQueryClient();

  // Configuração do formulário
  const form = useForm<z.infer<typeof goalFormSchema>>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      name: "",
      monthYear: new Date().toISOString(),
      goal: "",
    },
  });

  async function onSubmit(values: z.infer<typeof goalFormSchema>) {
    const loadingToast = toast.loading("Carregando!");

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/goal/${user?.id}`,
        {
          description: values.name,
          targetDate: new Date(values.monthYear).toISOString(),
          targetAmount: parseFloat(values.goal),
        }
      );

      if (response.status === 201) {
        console.log("Objetivo criado com sucesso!");

        toast.dismiss(loadingToast);
        toast.success("Objetivo criado!");

        // Invalida a consulta de orçamentos para atualizar a UI
        queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
      toast.error("Ocorreu um erro!");
    } finally {
      setLoading(false);
    }

    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="min-w-40 h-10 cursor-pointer flex justify-around gap-4"
          id="newGoalButton"
        >
          <Plus /> Novo Objetivo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Orçamento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-5"
          >
            {/* Nome da meta */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Meta</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="h-10"
                      placeholder="Digite o nome da meta"
                      disabled={loading}
                      id="goalName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Valor meta */}
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta ({user?.currency})</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Digite o valor da meta (só os números)"
                      disabled={loading}
                      id="goalAmount"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Data limite */}
            <FormField
              control={form.control}
              name="monthYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data limite:</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="h-10"
                      disabled={loading}
                      id="goalDate"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                className="w-20"
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
              <Button type="submit" id="saveButton" disabled={loading}>
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default NewGoalDialog;
