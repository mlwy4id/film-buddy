export const usePagination = (
  onPageChange: React.Dispatch<React.SetStateAction<number>>,
  totalPages: number,
  currentPage: number,
) => {
  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPaginationPageNumbers = (
    totalPages: number,
    currentPage: number,
  ) => {
    if (!totalPages || totalPages < 1) return [];

    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return {
    handlePrevious,
    handleNext,
    handlePageClick,
    getPaginationPageNumbers,
  };
};
