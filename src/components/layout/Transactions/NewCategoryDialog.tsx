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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

// Schema de validação com Zod
const transactionFormSchema = z.object({
  type: z.enum(["expense", "income"], {
    required_error: "Selecione o tipo de transação",
  }),
  name: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres",
  }),
});

function NewCategoryDialog() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  // Configuraão do formulário
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: "expense",
      name: "",
    },
  });

  // Função que envia as informações do form
  async function onSubmit(values: z.infer<typeof transactionFormSchema>) {
    const loadingToast = toast.loading("Carregando!");

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/category`,
        {
          name: values.name,
          type: values.type,
          userId: user?.id,
        }
      );

      if (response.status === 201) {
        console.log("Categoria criada com sucesso!");
        toast.dismiss(loadingToast);
        toast.success("Categoria criada!");
        // Invalida a consulta de transações para atualizar a UI
        queryClient.invalidateQueries({ queryKey: ["userInfo", user?.id] });

        setOpen(false);
        form.reset();
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loadingToast);
      toast.error("Ocorreu um erro!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-40 h-10 cursor-pointer" id="newCategoryButton">
          <Plus /> Nova Categoria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Categoria</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-5"
          >
            {/* Tipo da Categoria */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Tipo da Categoria</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onChange={field.onChange}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                      disabled={loading}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Salário"
                      className="h-10"
                      id="categoryDescription"
                      disabled={loading}
                      {...field}
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

export default NewCategoryDialog;
