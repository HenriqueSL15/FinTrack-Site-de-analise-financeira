import { Button } from "../ui/button.tsx";
import { ArrowRight } from "lucide-react";
import DashboardPreview from "../../assets/images/dashboard-preview.png";
import { AuthContext } from "../../contexts/AuthContext.tsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoading && !user) {
      navigate("/register");
    } else if (!isLoading && user) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="w-full h-9/12 shadow-md px-26 flex items-center gap-2">
      <div className="flex flex-col w-1/2 gap-6">
        <h1 className="text-6xl font-bold">
          Simplifique suas finanças pessoais
        </h1>
        <p className="text-lg text-gray-500 max-w-7/10">
          Acompanhe seus gastos, defina orçamentos e alcance seus objetivos
          financeiros com nossa plataforma intuitiva e fácil de usar.
        </p>
        <div className="flex gap-6">
          <Button
            size={"lg"}
            className="cursor-pointer"
            onClick={() => handleClick()}
          >
            Comece agora <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="w-1/2">
        <img
          src={DashboardPreview}
          alt="Preview do Dashboards"
          className="w-full h-full object-cover shadow-xl rounded-lg"
        />
      </div>
    </div>
  );
}

export default Hero;
