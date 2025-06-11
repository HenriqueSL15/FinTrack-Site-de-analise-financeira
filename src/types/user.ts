export default interface User {
  createdAt: string;
  currency: "BRL" | "USD" | "EUR";
  email: string;
  id: number;
  name: string;
  theme: string;
  updatedAt: string;
  weekStartDay: string;
}
