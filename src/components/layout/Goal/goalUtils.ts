// Função para calcular os dias restantes até a data alvo
export default function calculateRemainingDays(date: string): number {
  const targetDate = new Date(date);
  const currentDate = new Date();

  const timeDiff = targetDate.getTime() - currentDate.getTime();
  if (timeDiff < 0) return 0;

  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Se a diferença for negativa, significa que a data já passou
  return daysDiff < 0 ? 0 : daysDiff;
}
