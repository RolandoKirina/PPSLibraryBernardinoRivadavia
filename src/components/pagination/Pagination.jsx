import './Pagination.css';


import { useState } from 'react';

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageClick = (page) => setCurrentPage(page);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className='pagination'>
      <div className='pagination-options'>
        <div className='number-buttons'>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => handlePageClick(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={handleNext}>Siguiente</button>
        </div>
      </div>
    </div>
  );
}

