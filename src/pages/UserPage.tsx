import { JSX, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Dashboard from "@/components/layout/Dashboard";
import Transactions from "@/components/layout/Transactions";

function UserPage() {
  const { user, isLoading } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const navigate = useNavigate();

  if (!isLoading && !user) {
    navigate("/login");
  }

  interface Options {
    dashboard: JSX.Element;
    transactions: JSX.Element;
    categories: JSX.Element;
    budgets: JSX.Element;
    goals: JSX.Element;
    settings: JSX.Element;
  }

  const options: Options = {
    dashboard: <Dashboard />,
    transactions: <Transactions />,
    categories: <div>Categories</div>,
    budgets: <div>Budgets</div>,
    goals: <div>Goals</div>,
    settings: <div>Settings</div>,
  };

  return (
    <div className="flex border-r-2">
      <div className="w-2/12">
        <Sidebar setSelectedOption={setSelectedOption} />
      </div>
      <div className="w-10/12">{options[selectedOption]}</div>
    </div>
  );
}

export default UserPage;
