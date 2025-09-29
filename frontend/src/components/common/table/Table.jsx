import Pagination from "../pagination/Pagination";
import './Table.css';
import { useState } from "react";


export const Table = ({ columns = [], data = [], children, popupLength, isPrintList, rowsPerPage = 5 }) => {
  const actionAccessors = ["add", "delete", "edit", "details", "return", "renewe"];
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  return (

    <div className="content-table">

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
      {data.length > rowsPerPage && (
        <Pagination
          totalItems={data.length}
          itemsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
      {children}



    </div>




  );


};

