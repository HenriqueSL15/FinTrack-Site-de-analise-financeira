import axios from "axios";

// Função para obter todas as informações relacionadas ao usuário
const getUserInformation = async (userId: number) => {
  try {
    try {
      // Usando Promise.all para fazer requisições paralelas
      const [transactionsRes, categoriesRes, budgetsRes, goalsRes] =
        await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/transaction/${userId}`),
          axios.get(`${import.meta.env.VITE_API_URL}/category/${userId}`),
          axios.get(`${import.meta.env.VITE_API_URL}/budget/${userId}`),
          axios.get(`${import.meta.env.VITE_API_URL}/goal/${userId}`),
        ]);

      return {
        transactions: transactionsRes.data.transactions,
        categories: categoriesRes.data.categories,
        budgets: budgetsRes.data.budgets,
        goals: goalsRes.data.goals,
      };
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  } catch (err) {
    console.log(err);
  }
};

export default getUserInformation;
