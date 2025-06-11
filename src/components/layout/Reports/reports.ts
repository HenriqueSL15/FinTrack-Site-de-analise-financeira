import { JSX } from "react";

// Interface para as opções de relatórios
export default interface Option {
  categories: JSX.Element;
  incomeVsExpense: JSX.Element;
  [key: string]: JSX.Element;
}
