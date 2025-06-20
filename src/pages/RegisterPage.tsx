import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from "validator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.tsx";
import { Eye, EyeClosed } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().refine((name) => name.length > 2, {
    message: "Nome deve conter pelo menos 3 caracteres",
  }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().refine(
    (password) =>
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
    {
      message:
        "Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial",
    }
  ),
});

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function formSubmitHandler() {
    try {
      const userData = form.getValues();
      const response = await register(userData);

      if (response.message == "Usuário criado com sucesso!") {
        navigate("/login");
        return response;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center dark:bg-[#1a1a1a]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(formSubmitHandler)}
          className="bg-zinc-50 rounded-lg border border-neutral-200 flex flex-col items-center w-1/3 min-h-2/4 dark:bg-[#1f1f1f] dark:border-[#2e2e2e]"
        >
          <div className="w-7/10 py-5 flex flex-col items-center">
            <FormLabel className="text-2xl font-semibold mb-1">
              Criar conta
            </FormLabel>
            <FormDescription className="text-neutral-500">
              Preencha seus dados para criar sua conta
            </FormDescription>
          </div>
          <div className="w-9/12 space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" data-testid="nameField" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu@email.com"
                      data-testid="emailField"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Senha</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Sua senha"
                        type={showPassword ? "text" : "password"}
                        data-testid="passwordField"
                        {...field}
                      />
                    </FormControl>
                    <FormControl>
                      {showPassword ? (
                        <EyeClosed
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                          data-testid="showPasswordButton"
                        />
                      ) : (
                        <Eye
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                          data-testid="hidePasswordButton"
                        />
                      )}
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="cursor-pointer mt-5 w-9/12"
            type="submit"
            data-testid="registerButton"
          >
            Registrar
          </Button>

          <div className="w-7/10 py-5 flex flex-col items-center">
            <FormDescription className="text-neutral-500">
              Já tem uma conta?
              <Button
                variant={"link"}
                className="cursor-pointer p-1"
                onClick={() => navigate("/login")}
                data-testid="loginPageButton"
              >
                Entrar
              </Button>
            </FormDescription>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default RegisterPage;
