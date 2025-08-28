import './Pagination.css';

import { useState, useEffect } from 'react';


export default function Pagination({
 totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  buttonsPerBlock = 4
}   
) {
 const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [paginationBlock, setPaginationBlock] = useState(0);

  useEffect(() => {
      const newBlock = Math.floor((currentPage - 1) / buttonsPerBlock);
      setPaginationBlock(newBlock);
    }, [currentPage, buttonsPerBlock]);
    
  const startPage = paginationBlock * buttonsPerBlock + 1;
  const endPage = Math.min(startPage + buttonsPerBlock - 1, totalPages);
  const handlePrevBlock = () => {
    if (startPage > 1) {
      onPageChange(startPage - 1);
    }
  };

  const handleNextBlock = () => {
    if (endPage < totalPages) {
      onPageChange(endPage + 1);
    }
  };
 
  return (
    <div className="pagination">
      <div className="pagination-options">
        <div className="number-buttons">
          <button onClick={handlePrevBlock} disabled={startPage === 1}>
            ←
          </button>

          {[...Array(endPage - startPage + 1)].map((_, i) => {
            const pageNumber = startPage + i;
            return (
              <button
                key={pageNumber}
                className={currentPage === pageNumber ? 'active' : ''}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
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