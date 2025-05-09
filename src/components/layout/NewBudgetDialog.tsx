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
  FormDescription,
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
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { number, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "@/contexts/AuthContext.tsx";
import { convertToBRL } from "@/utils/currencyUtils.ts";
import getUserInformation from "@/utils/userInfoUtils.ts";

function NewBudgetDialog() {
  const { user, isLoading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const { data, isLoading: isLoadingUserInfo } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id),
    enabled: !!user?.id,
  });

  // Schema de validação com Zod
  const budgetFormSchema = z.object({
    category: z.enum(data?.categories.map((category) => category.name)),
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
        (category) => category.name === values.category
      ).id;

      const response = await axios.post(
        `http://localhost:3000/budget/${user?.id}/${categoryId}`,
        {
          monthYear: values.monthYear,
          limitAmount: values.budgetLimit,
        }
      );
    } catch (err) {
      console.log(err);
    }
    console.log(values);

    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="min-w-40 h-10 cursor-pointer flex justify-around gap-4">
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
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.categories.map((category) => {
                        if (category.type === "goal") return null;
                        return (
                          <SelectItem key={category.id} value={category.name}>
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
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
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
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default NewBudgetDialog;
