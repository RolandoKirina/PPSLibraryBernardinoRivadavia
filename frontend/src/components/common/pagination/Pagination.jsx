import './Pagination.css';
import { useState, useEffect } from 'react';

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  buttonsPerBlock = 4,
  handleChangePage
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [paginationBlock, setPaginationBlock] = useState(0);

  useEffect(() => {
    const newBlock = Math.floor((currentPage - 1) / buttonsPerBlock);
    setPaginationBlock(newBlock);
  }, [currentPage, buttonsPerBlock]);

  const startPage = paginationBlock * buttonsPerBlock + 1;
  const endPage = Math.min(startPage + buttonsPerBlock - 1, totalPages);

  const changePage = (page) => {
    onPageChange(page);
    handleChangePage?.(page);
  };

  const handlePrevBlock = () => {
    if (startPage > 1) {
      changePage(startPage - 1);
    }
  };

  const handleNextBlock = () => {
    if (endPage < totalPages) {
      changePage(endPage + 1);
    }
  };

  return (
    <div className="pagination">
      <div className="pagination-options">
        <div className="number-buttons">
          <button
            type="button"
            onClick={handlePrevBlock}
            disabled={startPage === 1}
          >
            ←
          </button>

          {[...Array(Math.max(0, endPage - startPage + 1))].map((_, i) => {
            const pageNumber = startPage + i;
            return (
              <button
                type="button"
                key={pageNumber}
                className={currentPage === pageNumber ? 'active' : ''}
                onClick={() => changePage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            type="button"
            className="next-button"
            onClick={handleNextBlock}
            disabled={endPage === totalPages}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
