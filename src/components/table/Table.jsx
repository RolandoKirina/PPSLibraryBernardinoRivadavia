import Pagination from "../pagination/Pagination";



export const Table = ({ columns =[], data=[], children, popupLength }) => {
  return (
   
    <div className="content-table">

      <table className={`table ${popupLength ? popupLength : ''}`}>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.accessor} className={col.className ? col.className : ''}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {columns.map((col, j) => (
                  <td key={j} className={col.className ? col.className : ''}>
                    {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
      </table>
      {data.length > 4 && <Pagination />}
      {children}

        
   
    </div>
    

   

  );
   
    
};

