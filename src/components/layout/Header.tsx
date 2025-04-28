import { Wallet } from "lucide-react";
import { Button } from "../ui/button.tsx";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton.tsx";

function Header() {
  const { user, login, logout, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="w-full h-20 flex justify-between px-26 py-5 border-b">
      <div className="flex gap-2">
        <Wallet className="w-8 h-8" />
        <h1 className="text-2xl font-bold">FinTrack</h1>
      </div>
      <div className="flex gap-4 items-center">
        {!isLoading && !user ? (
          <>
            <Button
              variant={"ghost"}
              className="cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Entrar
            </Button>
            <Button
              variant={"default"}
              className="cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Registrar
            </Button>
          </>
        ) : !isLoading && user ? (
          <>
            <Button
              className="text-xl text-semibold cursor-pointer"
              variant={"link"}
              onClick={() => navigate("/dashboard")}
            >
              {user.name}
            </Button>
            <Button
              variant={"default"}
              className="cursor-pointer"
              onClick={logout}
            >
              Sair
            </Button>
          </>
        ) : (
          <>
            <Skeleton className="w-20 h-8" />
            <Skeleton className="w-20 h-8" />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
