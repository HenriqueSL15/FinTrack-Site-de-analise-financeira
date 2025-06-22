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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { useContext, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "@/contexts/AuthContext.tsx";
import getUserInformation from "@/utils/userInfoUtils.ts";
import Category from "@/types/category";

function NewBudgetDialog() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id as number),
    enabled: !!user?.id,
  });

  // Schema de validação com Zod
  const budgetFormSchema = z.object({
    category: z.enum(
      data?.categories.map((category: Category) => category.name)
    ),
    monthYear: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Data inválida",
    }),
    budgetLimit: z.number().min(1, {
      message: "Valor deve ser um número positivo",
    }),
  });

  const queryClient = useQueryClient();

  // Configuração do formulário
  const form = useForm<z.infer<typeof budgetFormSchema>>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      category: "",
      monthYear: new Date().toISOString(),
      budgetLimit: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof budgetFormSchema>) {
    try {
      const categoryId = data?.categories?.find(
        (category: Category) => category.name === values.category
      ).id;

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/budget/${user?.id}/${categoryId}`,
        {
          monthYear: values.monthYear,
          limitAmount: values.budgetLimit,
        }
      );

      if (response.status === 201) {
        console.log("Orçamento criado com sucesso!");

        // Invalida a consulta de orçamentos para atualizar a UI
        queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
      }
    } catch (err) {
      console.log(err);
    }

    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="min-w-40 h-10 cursor-pointer flex justify-around gap-4"
          id="newBudgetButton"
        >
          <Plus /> Novo Orçamento
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
            {/* Categoria */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger id="selectCategory">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.categories.map((category: Category) => {
                        if (category.type === "goal") return null;
                        return (
                          <SelectItem
                            key={category.id}
                            value={category.name}
                            id={`categoryItem-${category.name}`}
                          >
                            {category.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Valor orçado */}
            <FormField
              control={form.control}
              name="budgetLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor orçado ({user?.currency})</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      id="budgetLimit"
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
              >
                Cancelar
              </Button>
              <Button type="submit" id="saveButton">
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default NewBudgetDialog;
