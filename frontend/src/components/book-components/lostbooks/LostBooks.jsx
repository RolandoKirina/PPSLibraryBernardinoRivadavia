import './LostBooks.css';
import { useEffect, useState, useCallback } from 'react';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { columnsByType } from '../../../data/generatedlist/generatedList';
import { useAuth } from '../../../auth/AuthContext';
import { generateUniversalPDF } from '../../../utils/pdfGenerator';

export default function LostBooks() {
  const BASE_URL = "http://localhost:4000/api/v1";
  const { auth } = useAuth();

  const chunkSize = 10000;
  const rowsPerPage = 35;
  const type = "LostBooks";


  const [formValues, setFormValues] = useState({
    orderDirection: 'DESC',
    orderBy: 'Fecha pérdida'
  });
  
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);


  const getLostBooks = useCallback(async (values, { limit, offset }, append = false) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (values.lossDateFrom) params.append("lossStartDate", values.lossDateFrom);
      if (values.lossDateTo) params.append("lossEndDate", values.lossDateTo);
      if (values.orderBy) params.append("orderBy", values.orderBy);
      if (values.orderDirection) params.append("direction", values.orderDirection);

      params.append("limit", limit);
      params.append("offset", offset);

      const url = `${BASE_URL}/books/lostBooks?${params.toString()}`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ msg: "Error del servidor" }));
        setError(errorData.msg || "Error desconocido");
        return;
      }

      const data = await res.json();
      setItems(prev => append ? [...prev, ...data.rows] : data.rows);
      setTotalItems(data.count);
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }, [auth.token]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setResetPageTrigger(prev => prev + 1);
      getLostBooks(formValues, { limit: chunkSize, offset: 0 }, false);
    }, 500);

    return () => clearTimeout(timer);
  }, [formValues, getLostBooks]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrint = () => {
    if (items.length === 0) return;
    const title = "Reporte de Libros Perdidos";
    const config = columnsByType[type];
    const headers = config.map(col => col.label || col.text || col.header || "Columna");
    const data = items.map(item => config.map(col => {
      const key = col.key || col.dataKey || col.field || col.accessor;
      return item[key] ?? '';
    }));
    generateUniversalPDF(title, headers, data, `libros_perdidos`);
  };

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    if (items.length < totalItems && lastItemIndex > items.length) {
      const newOffset = items.length;
      await getLostBooks(formValues, { limit: chunkSize, offset: newOffset }, true);
    }
  }

  return (
    <div className='lost-books-container'>
      <div className='lost-books-content'>
        <div className='lost-books-filters'>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className='lost-books-filter-option'>
              <div className='lost-books-filter-title'>
                <h3>Fecha de Pérdida</h3>
              </div>

              <div className='filter-options'>
                <div className='input column-input'>
                  <label htmlFor='lossDateFrom'>Fecha mayor a:</label>
                  <input 
                    type="date" 
                    name="lossDateFrom" 
                    id="lossDateFrom"
                    onChange={handleInputChange} 
                  />
                </div>
              </div>

              <div className='filter-options'>
                <div className='input column-input'>
                  <label htmlFor='lossDateTo'>Fecha menor a:</label>
                  <input 
                    type="date" 
                    name="lossDateTo" 
                    id="lossDateTo"
                    onChange={handleInputChange} 
                  />
                </div>
              </div>

              <div className='lost-books-filter-title'>
                <h3>Ordenamiento</h3>
              </div>

              <div className='filter-options'>
                <div className='input column-input'>
                  <label htmlFor='orderBy'>Ordenar por:</label>
                  <select 
                    className='order-by-select' 
                    id="orderBy" 
                    name='orderBy' 
                    value={formValues.orderBy} 
                    onChange={handleInputChange}
                  >
                    <option value="Apellido Socio">Apellido Socio</option>
                    <option value="Código Libro">Código Libro</option>
                    <option value="Fecha pérdida">Fecha pérdida</option>
                    <option value="Número Socio">Número Socio</option>
                    <option value="Título Libro">Título Libro</option>
                  </select>
                </div>
              </div>

              <div className='filter-options'>
                <div className='radio-inputs'>
                  <label>
                    <input 
                      type="radio" 
                      name="orderDirection" 
                      value="ASC" 
                      checked={formValues.orderDirection === 'ASC'} 
                      onChange={handleInputChange} 
                    /> Ascendente
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="orderDirection" 
                      value="DESC" 
                      checked={formValues.orderDirection === 'DESC'} 
                      onChange={handleInputChange} 
                    /> Descendente
                  </label>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>

      <div className='preview-list-container'>
        <GenerateListPopup
          dataByType={items}
          totalItems={totalItems}
          columnsByType={columnsByType[type]}
          typeList={type}
          title={'Libros Perdidos'}
          handleChangePage={handleChangePage}
          loading={loading}
          resetPageTrigger={resetPageTrigger}
          rowsPerPage={rowsPerPage}
          onPrint={handlePrint}
        />
        {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</div>}
      </div>
    </div>
  );
}