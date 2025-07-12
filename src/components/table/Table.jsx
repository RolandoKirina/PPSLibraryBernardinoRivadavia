
export const Table = ({ columns, data }) => {
  return (
    <div className="content">
    <table className="table">
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
    </div>
  );
   
    
};

