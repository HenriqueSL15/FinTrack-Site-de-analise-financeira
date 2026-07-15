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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "@/contexts/AuthContext.tsx";
import { convertToBRL } from "@/utils/currencyUtils.ts";
import getUserInformation from "@/utils/userInfoUtils";
import Category from "@/types/category";
import { toast } from "sonner";

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
      },
    ),
  category: z.string({
    required_error: "Selecione uma categoria",
  }),
  installment: z.boolean(),
  installments: z.coerce.number().min(1, {
    message: "Número de parcelas deve ser maior que 0",
  }),
  installmentRate: z.coerce.number().min(0, {
    message: "Taxa de juros deve ser no mínimo 0%",
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data inválida",
  }),
});

function NewTransactionDialog() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [selectedType, setSelectedType] = useState<"expense" | "income">(
    "expense",
  );

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserInformation(user?.id as number),
    enabled: !!user?.id,
  });

  // Configuração do formulário
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: "expense",
      description: "",
      amount: "",
      category: "",
      installment: false,
      installments: 1,
      installmentRate: 0,
      date: new Date().toISOString().split("T")[0],
    },
  });

  const isInstallment = form.watch("installment");

  // Função para atualizar o tipo com base na categoria selecionada
  const updateTypeBasedOnCategory = (categoryName: string) => {
    const selectedCategory = data?.categories.find(
      (category: Category) => category.name === categoryName,
    );

    if (selectedCategory) {
      // Atualiza o tipo com base no tipo da categoria
      const newType = selectedCategory.type as "expense" | "income";
      form.setValue("type", newType);
      setSelectedType(newType);
    }
  };

  // Observe as mudanças no valor do tipo no formulário
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "type") {
        setSelectedType(value.type as "expense" | "income");
      }
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Função que envia as informações do form
  async function onSubmit(values: z.infer<typeof transactionFormSchema>) {
    const loadingToast = toast.loading("Carregando!");

    setLoading(true);

    try {
      const categoryId = data?.categories.find(
        (category: Category) => category.name === values.category,
      )?.id;

      // Converte o valor da moeda do usuário para BRL antes de salvar
      const amountInBRL = convertToBRL(
        parseFloat(values.amount.replace(",", ".")),
        user?.currency || "BRL",
      );

      if (values.installment) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/installment/${user?.id}/${categoryId}`,
          {
            description: values.description,
            amount: amountInBRL,
            type: values.type,
            date: values.date,
            installments: values.installments,
            installmentRate: values.installmentRate / 100,
          },
        );

        if (
          response.data.message ===
          "Empréstimo/Parcelamento criado com sucesso!"
        ) {
          console.log("Empréstimo/Parcelamento criado com sucesso!");

          toast.dismiss(loadingToast);
          toast.success("Empréstimo/Parcelamento criado!");
        }

        // Invalida a consulta de transações para atualizar a UI
        queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/transaction/${user?.id}/${categoryId}`,
          {
            description: values.description,
            amount: amountInBRL,
            type: values.type,
            date: values.date,
          },
        );

        if (response.data.message === "Transação criada com sucesso!") {
          console.log("Transação criada com sucesso!");

          toast.dismiss(loadingToast);
          toast.success("Transação criada!");
        }

        // Invalida a consulta de transações para atualizar a UI
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
        <Button className="w-40 h-10 cursor-pointer" id="newTransactionButton">
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
              render={() => (
                <FormItem className="space-y-1">
                  <FormLabel>Tipo de Transação</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={selectedType}
                      className="flex gap-4"
                      disabled
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expense" id="expense" />
                        <label>Despesa</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="income" id="income" />
                        <label>Receita</label>
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
                      id="transactionDescription"
                      disabled={loading}
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
                    <Input
                      className="h-10"
                      placeholder="0,00"
                      id="transactionAmount"
                      disabled={loading}
                      {...field}
                    />
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
                    onValueChange={(e) => {
                      field.onChange(e);
                      updateTypeBasedOnCategory(e);
                    }}
                    defaultValue={field.value}
                    disabled={loading}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger id="transactionCategory">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.categories.map((category: Category) => {
                        if (category.type === "goal") return null;
                        return (
                          <SelectItem
                            key={category.id}
                            id={`categoryItem-${category.name}`}
                            value={category.name}
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

            {/* Parcelamento/empréstimo */}

            <FormField
              control={form.control}
              name="installment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parcelamento/Empréstimo</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isInstallment && (
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="installments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Parcelas</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="installmentRate"
                  render={({ field }) => (
                    <FormItem className="max-w-1/2">
                      <FormLabel>Taxa de Júros ao Mês</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Data */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="h-10"
                      id="transactionDate"
                      disabled={loading}
                    />
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

export default NewTransactionDialog;
