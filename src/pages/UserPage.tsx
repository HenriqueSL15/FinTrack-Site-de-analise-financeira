import { JSX, useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Dashboard from "@/components/layout/Dashboard";
import Transactions from "@/components/layout/Transactions";
import Budgets from "@/components/layout/Budgets";
import Reports from "@/components/layout/Reports";
import Goals from "@/components/layout/Goals";
import Settings from "@/components/layout/Settings";

function UserPage() {
  const { user, isLoading } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("settings");
  const navigate = useNavigate();

  if (!isLoading && !user) {
    navigate("/login");
  }

  interface Options {
    dashboard: JSX.Element;
    transactions: JSX.Element;
    budgets: JSX.Element;
    reports: JSX.Element;
    goals: JSX.Element;
    settings: JSX.Element;
  }

  const options: Options = {
    dashboard: <Dashboard />,
    transactions: <Transactions />,
    budgets: <Budgets />,
    reports: <Reports />,
    goals: <Goals />,
    settings: <Settings />,
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
