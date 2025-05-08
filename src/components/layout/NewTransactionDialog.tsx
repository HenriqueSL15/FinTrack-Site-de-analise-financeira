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
import getUserInformation from "@/utils/userInfoUtils";

// Schema de validação com Zod
const transactionFormSchema = z.object({
  type: z.enum(["expense", "income"], {
    required_error: "Selecione o tipo de transação",
  }),
  description: z.string().min(3, {
    message: "Descrição deve ter pelo menos 3 caracteres",
  }),
  amount: z
    .string()
    .refine(
      (val) =>
        !isNaN(parseFloat(val.replace(",", "."))) &&
        parseFloat(val.replace(",", ".")) > 0,
      {
        message: "Valor deve ser um número positivo",
      }
    ),
  category: z.string({
    required_error: "Selecione uma categoria",
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida",
  }),
});

function NewTransactionDialog() {
  const [open, setOpen] = useState(false);
  const { user, isLoading } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const { data, isLoading: isLoadingUserInfo } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id),
    enabled: !!user?.id,
  });

  // Configuraão do formulário
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: "expense",
      description: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  async function onSubmit(values: z.infer<typeof transactionFormSchema>) {
    try {
      const categoryId = data?.categories.find(
        (category) => category.name === values.category
      )?.id;

      // Converte o valor da moeda do suuário para BRL antes de salvar
      const amountInBRL = convertToBRL(
        parseFloat(values.amount.replace(",", ".")),
        user?.currency || "BRL"
      );

      const response = await axios.post(
        `http://localhost:3000/transaction/${user?.id}/${categoryId}`,
        {
          description: values.description,
          amount: amountInBRL,
          type: values.type,
          date: values.date,
        }
      );

      if (response.data.message === "Transação criada com sucesso!") {
        console.log("Transação criada com sucesso!");

        // Invalida a consulta de transações para atualizar a UI
        queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
      }
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
        <Button className="w-40 h-10 cursor-pointer">
          <Plus /> Nova Transação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-5"
          >
            {/* Tipo de Transação */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Tipo de Transação</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="expense"
                          id="expense"
                          className="cursor-pointer"
                        />
                        <label htmlFor="expense" className="cursor-pointer">
                          Despesa
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="income"
                          id="income"
                          className="cursor-pointer"
                        />
                        <label htmlFor="income" className="cursor-pointer">
                          Receita
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Descrição */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Compra de supermercado"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Valor */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor ({user?.currency})</FormLabel>
                  <FormControl>
                    <Input className="h-10" placeholder="0,00" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

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

            {/* Data */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="h-10" />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                className="w-20"
                onClick={() => setOpen(false)}
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

export default NewTransactionDialog;
