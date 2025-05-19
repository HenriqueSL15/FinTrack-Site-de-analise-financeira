// Função utilitária para converter dd/mm/yyyy para yyyy-MM-dd
export function toISODate(dateStr: string): string {
  if (!dateStr) return "";

  // Tenta criar uma data válida
  const date = new Date(dateStr);

  // Verifica se a data é válida
  if (!isNaN(date.getTime())) {
    return date.toISOString().split("T")[0];
  }

  // Se não for válida, tenta dd/mm/yyyy manualmente
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    const parsedDate = new Date(`${year}-${month}-${day}`);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString().split("T")[0];
    }
  }

  // Não reconheceu o formato
  return "";
}
