import axios from "axios";

// Função para obter todas as informações relacionadas ao usuário
const getUserInformation = async (userId: number) => {
  try {
    try {
      // Usando Promise.all para fazer requisições paralelas
      const [transactionsRes, categoriesRes, budgetsRes, goalsRes] =
        await Promise.all([
          axios.get(`http://localhost:3000/transaction/${userId}`),
          axios.get(`http://localhost:3000/category/${userId}`),
          axios.get(`http://localhost:3000/budget/${userId}`),
          axios.get(`http://localhost:3000/goal/${userId}`),
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
