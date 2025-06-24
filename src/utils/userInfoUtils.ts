import axios from "axios";

// Função para obter todas as informações relacionadas ao usuário
const getUserInformation = async (userId: number) => {
  try {
    try {
      // Usando Promise.all para fazer requisições paralelas
      const [transactionsRes, categoriesRes, budgetsRes, goalsRes] =
        await Promise.all([
          axios.get(
            `https://fin-track-backend-ruddy.vercel.app/transaction/${userId}`
          ),
          axios.get(
            `https://fin-track-backend-ruddy.vercel.app/category/${userId}`
          ),
          axios.get(
            `https://fin-track-backend-ruddy.vercel.app/budget/${userId}`
          ),
          axios.get(
            `https://fin-track-backend-ruddy.vercel.app/goal/${userId}`
          ),
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
