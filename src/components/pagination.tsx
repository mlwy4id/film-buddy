import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/usePagination";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: Props) => {
  const {
    handleNext,
    handlePrevious,
    handlePageClick,
    getPaginationPageNumbers,
  } = usePagination(onPageChange, totalPages, currentPage);
  const pageNumbers = getPaginationPageNumbers(totalPages, currentPage);

  return (
    <div className="flex items-center justify-center gap-3 pt-4">
      <Button
        variant="outline"
        disabled={currentPage === 1 || isLoading}
        onClick={handlePrevious}
        className="border-0"
      >
        <LucideChevronLeft />
      </Button>

      <div className="flex items-center gap-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            disabled={isLoading}
            className={`px-3 py-1 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              page === currentPage
                ? "bg-primary text-primary-foreground"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        disabled={currentPage === totalPages || isLoading}
        onClick={handleNext}
        className="border-0"
      >
        <LucideChevronRight />
      </Button>
    </div>
  );
};
