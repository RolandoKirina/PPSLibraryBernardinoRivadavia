import Pagination from "../pagination/Pagination";
import './Table.css';
import { useState, useEffect } from "react";
export const Table = ({ columns = [], data = [], children, popupLength, isPrintList, rowsPerPage = 5, totalItems, handleChangePage, loading, resetPageTrigger }) => {
  const actionAccessors = ["add", "delete", "edit", "details", "return", "renewe", "choose", "materials"];
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    setCurrentPage(1);
  }, [resetPageTrigger]);



  return (
    <div className="content-table">
      {loading ? (
        <p className="table-data-info">Cargando...</p>
      ) : data.length === 0 ? (
        <p className="table-data-info">No hay datos</p>
      ) : (
        <table className={`table ${popupLength ? popupLength : ''}`}>
          <thead className={isPrintList && 'theadPrint'}>
            <tr>
              {columns.map(col => (
                <th key={col.accessor} className={col.className ? col.className : ''}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={isPrintList && 'tbodyPrint'}>
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
                  >
                    {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {data.length >= rowsPerPage && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          handleChangePage={handleChangePage}
        />
      )}

      {children}
    </div>
  );
};
