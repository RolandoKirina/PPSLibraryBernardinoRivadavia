import '../pagination/Pagination.css';
export default function PaginatedList({
  items = [],
  itemsPerPage = 3,
  currentPage,
  setCurrentPage,
  renderItem,
  emptyMessage = "No hay elementos para mostrar"
}) { 
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <ul className="info-fee">
        {currentItems.length === 0 ? (
          <li className="centercardtext">{emptyMessage}</li>
        ) : (
          currentItems.map(renderItem)
        )}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
            <div className='pagination-options'>
        <div className='number-buttons'>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
          className="next-button"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
        </div>
        </div>
      )}
    </div>
  );
}