import z from "zod";
import { Form, FormField, FormItem, FormLabel } from "../../ui/form.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext.tsx";
import { ThemeContext } from "@/contexts/ThemeContext.tsx";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select.tsx";
import { Button } from "../../ui/button.tsx";
import { Label } from "../../ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group.tsx";
import axios from "axios";
import { toast } from "sonner";

function Settings() {
  const { user } = useContext(AuthContext);
  const { theme, updateTheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    theme: z.enum(["light", "dark", "system"]),
    currency: z.enum(["BRL", "USD", "EUR"]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme:
        theme === "light" || theme === "dark" || theme === "system"
          ? theme
          : "light",
      currency: user?.currency,
    },
  });

  useEffect(() => {
    if (
      user?.currency &&
      user?.theme &&
      (form.getValues("currency") !== user.currency ||
        form.getValues("theme") !== user.theme)
    ) {
      form.reset({
        theme:
          typeof theme === "string" &&
          (theme === "light" || theme === "dark" || theme === "system")
            ? theme
            : "light",
        currency: user.currency,
      });
    }
  }, [user?.currency, user?.theme, form]);

  const handleSubmit = async () => {
    const loadingToast = toast.loading("Carregando!");
    setLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${user?.id}`,
        form.getValues(),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Settings updated succesfully:", response.data);

        toast.dismiss(loadingToast);
        toast.success("Informações atualizadas!");
        updateTheme(response.data.user.theme);
      }
    } catch (err) {
      console.log("Error updating settings:", err);
      toast.dismiss(loadingToast);
      toast.error("Ocorreu um erro!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen p-8 space-y-10 bg-white dark:bg-[#1a1a1a]">
      <h1 className="text-3xl font-bold mb-2  text-zinc-900 dark:text-zinc-100">
        Configurações
      </h1>
      <h2 className="text-neutral-500 dark:text-neutral-400">
        Personalize suas preferências de uso.
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 mt-5"
        >
          {/* Theme */}
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => {
              return (
                <div className="flex flex-col space-y-6 w-full bg-neutral-50 border-1 border-neutral-200 dark:border-[#2E2E2E] dark:bg-[#1f1f1f] rounded-lg p-6">
                  <Label className="text-2xl text-zinc-900 dark:text-white">
                    Aparência
                  </Label>
                  <FormItem>
                    <FormLabel className="text-base">Tema</FormLabel>
                    <RadioGroup
                      className="flex"
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={loading}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="light"
                          id="light"
                          className="border-1 border-black dark:border-white cursor-pointer"
                        />
                        <Label htmlFor="light" className="cursor-pointer">
                          Claro
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="dark"
                          id="dark"
                          className="border-1 border-black dark:border-white cursor-pointer"
                        />
                        <Label htmlFor="dark" className="cursor-pointer">
                          Escuro
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="system"
                          id="system"
                          className="border-1 border-black dark:border-white cursor-pointer"
                        />
                        <Label htmlFor="system" className="cursor-pointer">
                          Sistema
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormItem>
                </div>
              );
            }}
          />

          {/* Currency */}
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => {
              return (
                <div className="flex flex-col space-y-6 w-full bg-neutral-50 border-1 border-neutral-200 dark:border-[#2E2E2E] dark:bg-[#1f1f1f] rounded-lg p-6">
                  <Label className="text-2xl text-zinc-900 dark:text-white">
                    Preferências Regionais
                  </Label>
                  <FormItem>
                    <FormLabel className="text-base">Moeda</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={loading}
                    >
                      <SelectTrigger
                        className="cursor-pointer"
                        id="selectCurrency"
                      >
                        <SelectValue placeholder={`Escolha uma moeda`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="BRL"
                          className="cursor-pointer"
                          id="brl"
                        >
                          Real Brasileiro (R$)
                        </SelectItem>
                        <SelectItem
                          value="USD"
                          className="cursor-pointer"
                          id="usd"
                        >
                          Dólar Americano ($)
                        </SelectItem>
                        <SelectItem
                          value="EUR"
                          className="cursor-pointer"
                          id="eur"
                        >
                          Euro (€)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>
              );
            }}
          />
          <div className="flex justify-end">
            <Button
              size={"lg"}
              type="submit"
              className="cursor-pointer"
              id="saveButton"
              disabled={loading}
            >
              Salvar preferências
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Settings;
