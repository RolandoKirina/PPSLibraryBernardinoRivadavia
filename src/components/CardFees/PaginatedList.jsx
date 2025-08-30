import '../pagination/Pagination.css';
import Pagination from '../pagination/Pagination.jsx'; // Asegurate de importar correctamente

export default function PaginatedList({
  items = [],
  itemsPerPage,
  currentPage,
  setCurrentPage,
  renderItem,
  emptyMessage = "No hay elementos para mostrar",
  buttonsPerBlock = 4
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
        <Pagination
          totalItems={items.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          buttonsPerBlock={buttonsPerBlock}
        />
      )}
    </div>
  );
}
