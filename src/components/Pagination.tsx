import React from "react";

type PaginationProps = {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const windowSize = 5;

  if (totalPages === 1) {
    return null;
  }

  const windowStart = Math.floor((currentPage - 1) / windowSize) * windowSize + 1;
  const windowEnd = Math.min(windowStart + windowSize - 1, totalPages);
  const visiblePages = Array.from(
    { length: windowEnd - windowStart + 1 },
    (_, index) => windowStart + index
  );

  const goToPage = (page: number) => {
    onPageChange(Math.max(1, Math.min(totalPages, page)));
  };

  return (
    <nav className="pagination" aria-label="Paginacion">
      <button
        type="button"
        className="ghost-btn"
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
      >
        Inicio
      </button>

      <button
        type="button"
        className="ghost-btn"
        onClick={() => goToPage(windowStart - windowSize)}
        disabled={windowStart === 1}
      >
        Anterior
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          type="button"
          className={page === currentPage ? "page-btn active" : "page-btn"}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="ghost-btn"
        onClick={() => goToPage(windowEnd + 1)}
        disabled={windowEnd === totalPages}
      >
        Siguiente
      </button>

      <button
        type="button"
        className="ghost-btn"
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        Final
      </button>
    </nav>
  );
}
