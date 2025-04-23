import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

function CTABanner() {
  return (
    <div className="w-full h-4/12 bg-zinc-900 flex flex-col items-center justify-center gap-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl text-white font-bold">
          Pronto para transformar suas finanças?
        </h1>
        <h2 className="text-md text-gray-200">
          Junte-se a milhares de pessoas que já estão no controle de sua vida
          financeira.
        </h2>
      </div>
      <Button variant={"secondary"} size={"lg"} className="cursor-pointer">
        Crie sua conta grátis <ArrowRight />
      </Button>
    </div>
  );
}

export default CTABanner;
