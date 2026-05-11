import Pagination from "../pagination/Pagination";
import "./Table.css";
import { useState, useEffect } from "react";
import TableInfo from "../tableinfo/TableInfo";
import PopUp from "../popup-table/PopUp";

export const Table = ({
  columns = [],
  data = [],
  children,
  popupLength,
  isPrintList,
  rowsPerPage = 5,
  totalItems,
  handleChangePage,
  loading,
  resetPageTrigger,
  showCount,
}) => {
  const actionAccessors = [
    "add",
    "delete",
    "edit",
    "details",
    "return",
    "renewe",
    "choose",
    "materials",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedInfoPopup, setSelectedInfoPopup] = useState(false);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    setCurrentPage(1);
  }, [resetPageTrigger]);

  const handleCellClick = (col, row) => {
    // 1. Si la columna está en la lista de acciones, no hacer nada
    if (actionAccessors.includes(col.accessor)) return;

    // 2. Obtener el valor que se renderizaría
    const renderedValue = col.render 
      ? col.render(row[col.accessor], row) 
      : row[col.accessor];

    // 3. Validar si el contenido es un objeto de React (un botón o componente)
    // Las celdas con botones suelen devolver objetos JSX en el render.
    // Si es un objeto y no es nulo, evitamos abrir el TableInfo.
    if (typeof renderedValue === 'object' && renderedValue !== null) {
        return;
    }

    setSelectedInfo({
      accessor: col.accessor,
      value: renderedValue,
    });

    setSelectedInfoPopup(true);
  };

  return (
    <div className="content-table">
      {loading ? (
        <div className="table-loading-container" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="table-data-info">Cargando...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="table-loading-container" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="table-data-info">No hay datos</p>
        </div>
      ) : (
        <table className={`table ${popupLength ? popupLength : ""}`}>
          <thead className={isPrintList ? "theadPrint" : ""}>
            <tr>
              {columns.map((col) => (
                <th key={col.accessor} className={col.className || ""}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={isPrintList ? "tbodyPrint" : ""}>
            {currentRows.map((row, i) => (
              <tr key={i}>
                {columns.map((col, j) => (
                  <td
                    key={j}
                    className={
                      actionAccessors.includes(col.accessor)
                        ? `${col.className || ""} action-cell`
                        : col.className || ""
                    }
                    onClick={() => !loading && handleCellClick(col, row)}
                  >
                    <div className="td-scroll">
                      {col.render
                        ? col.render(row[col.accessor], row)
                        : row[col.accessor]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination-items">
        {data.length > 0 && (
          <Pagination
            totalItems={totalItems}
            itemsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            handleChangePage={handleChangePage}
          />
        )}

        {showCount && data.length > 0 && (
          <span>
            {data.length}{" "}
            {data.length === 1 ? "Fila encontrada" : "Filas encontradas"}
          </span>
        )}
      </div>

      {children}

      {selectedInfoPopup && (
        <PopUp
          title={columns.find(c => c.accessor === selectedInfo?.accessor)?.header}
          onClick={() => setSelectedInfoPopup(false)}
        >
          <TableInfo text={selectedInfo} />
        </PopUp>
      )}
    </div>
  );
};