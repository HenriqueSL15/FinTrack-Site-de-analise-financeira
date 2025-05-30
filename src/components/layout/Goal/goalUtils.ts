// Função para calcular os dias restantes até a data alvo
const calculateRemaingDays = (date: string): number => {
  const targetDate = new Date(date);
  const currentDate = new Date();
  const timeDiff = targetDate.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Se a diferença for negativa, significa que a data já passou
  return daysDiff < 0 ? 0 : daysDiff;
};

export { calculateRemaingDays };
