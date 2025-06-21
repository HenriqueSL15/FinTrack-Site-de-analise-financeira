import { Button } from "../ui/button.tsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PaginationType from "../../types/pagination";

function Pagination({
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
}: PaginationType) {
  return (
    <div className="flex justify-center items-center gap-3">
      <Button
        className="cursor-pointer"
        onClick={goToPreviousPage}
        id="previousPageButton"
      >
        <ArrowLeft />
        Página Anterior
      </Button>
      <h1 className="font-semibold w-20 text-center">
        {currentPage} / {totalPages}
      </h1>
      <Button
        className="cursor-pointer"
        onClick={goToNextPage}
        id="nextPageButton"
      >
        Próxima Página
        <ArrowRight />
      </Button>
    </div>
  );
}

export default Pagination;
