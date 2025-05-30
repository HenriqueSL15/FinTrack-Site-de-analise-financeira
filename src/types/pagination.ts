// Interface para a paginação
export default interface PaginationType {
  currentPage: number;
  totalPages: number;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}
