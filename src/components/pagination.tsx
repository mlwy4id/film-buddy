"use client";

import { Button } from "@/components/ui/button";
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
  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    if (!totalPages || totalPages < 1) return [];

    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

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
