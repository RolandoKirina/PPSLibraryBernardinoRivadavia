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
    if (actionAccessors.includes(col.accessor)) return;

    setSelectedInfo({
      accessor: col.accessor,
      value: col.render
        ? col.render(row[col.accessor], row)
        : row[col.accessor],
    });

    console.log(selectedInfo);

    setSelectedInfoPopup(true);
  };

  return (
    <div className="content-table">
      {loading ? (
        <p className="table-data-info">Cargando...</p>
      ) : data.length === 0 ? (
        <p className="table-data-info">No hay datos</p>
      ) : (
        <table className={`table ${popupLength ? popupLength : ""}`}>
          <thead className={isPrintList && "theadPrint"}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className={col.className ? col.className : ""}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={isPrintList && "tbodyPrint"}>
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
                    onClick={() => handleCellClick(col, row)}
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

      {/* PAGINATION */}
      <div className="pagination-items">
        {data.length >= rowsPerPage && (
          <Pagination
            totalItems={totalItems}
            itemsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            handleChangePage={handleChangePage}
          />
        )}

        {showCount && (
          <span>
            {data.length}{" "}
            {data.length === 1 ? "Fila encontrada" : "Filas encontradas"}
          </span>
        )}
      </div>

      {children}

      {/* POPUP INFO */}
      {selectedInfoPopup && (
        <PopUp
          title={columns.find(c => c.accessor === selectedInfo.accessor)?.header}
          onClick={() => setSelectedInfoPopup(false)}
        >
          <TableInfo text={selectedInfo} />
        </PopUp>
      )}
    </div>
  );
};