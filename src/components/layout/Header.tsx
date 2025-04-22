import { Wallet } from "lucide-react";
import { Button } from "../ui/button.tsx";

function Header() {
  return (
    <div className="w-full h-20 flex justify-between px-26 py-5 border-b">
      <div className="flex gap-2">
        <Wallet className="w-8 h-8" />
        <h1 className="text-2xl font-bold">FinTrack</h1>
      </div>
      <div className="flex gap-4">
        <Button variant={"ghost"} className="cursor-pointer">
          Entrar
        </Button>
        <Button variant={"default"} className="cursor-pointer">
          Registrar
        </Button>
      </div>
    </div>
  );
}

export default Header;
