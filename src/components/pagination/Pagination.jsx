import './Pagination.css';




export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {

  const totalPages = Math.ceil(totalItems / itemsPerPage);


   

  return (
    <div className="pagination">
       <div className='pagination-options'>
        <div className='number-buttons'>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={currentPage === i + 1 ? "active" : ""}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
    </div>
    
    </div>


  );
}

