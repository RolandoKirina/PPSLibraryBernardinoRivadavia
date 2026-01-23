import './LostBooks.css';
import Btn from '../../common/btn/Btn';
import { useState } from 'react';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { dataByType, columnsByType } from '../../../data/generatedlist/generatedList';

export default function LostBooks() {
  const BASE_URL = "http://localhost:4000/api/v1";
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState(null);

  const chunkSize = 100;
  const rowsPerPage = 35;
  const [offsetActual, setOffsetActual] = useState(0);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);

  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = {};

    formData.forEach((value, key) => {
      if (value !== '') values[key] = value;
    });

    setFormValues(values);

    setItems([]);
    setOffsetActual(0);
    setResetPageTrigger(prev => prev + 1);

    getLostBooks(values, { limit: chunkSize, offset: 0 });
  };

  async function getLostBooks(values, { limit, offset }, append = false) {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (values.lossDateFrom) params.append("lossStartDate", values.lossDateFrom);
      if (values.lossDateTo) params.append("lossEndDate", values.lossDateTo);
      if (values.orderBy) params.append("orderBy", values.orderBy);
      if (values.orderDirection) params.append("direction", values.orderDirection);

      params.append("limit", limit);
      params.append("offset", offset);

      const url = `${BASE_URL}/books/lostBooks?${params.toString()}`;

      const res = await fetch(url);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ msg: "Error del servidor" }));
        setError(errorData.msg || "Error desconocido");
        return;
      }

      const data = await res.json();

      setItems(prev =>
        append ? [...prev, ...data.rows] : data.rows
      );

      setTotalItems(data.count);
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    if (items.length < totalItems && lastItemIndex > items.length) {
      const newOffset = items.length;

      await getLostBooks(
        formValues,
        { limit: chunkSize, offset: newOffset },
        true
      );

      setOffsetActual(newOffset);
    }
  }

  return (
    <>
      <div className='lost-books-container'>
        <div className='lost-books-content'>
          <div className='lost-books-filters'>
            <form onSubmit={handleSubmit}>
              <div className='lost-books-filter-option'>

                <div className='lost-books-filter-title'>
                  <h3>Fecha de Perdida</h3>
                </div>

                <div className='filter-options'>
                  <div className='input column-input'>
                    <label htmlFor='lossDateFrom'>Fecha mayor a:</label>
                    <input type="date" name="lossDateFrom" id="lossDateFrom"
                      min="2000-01-01" max="2100-12-31" />
                  </div>
                </div>

                <div className='filter-options'>
                  <div className='input column-input'>
                    <label htmlFor='lossDateTo'>Fecha menor a:</label>
                    <input type="date" name="lossDateTo" id="lossDateTo"
                      min="2000-01-01" max="2100-12-31" />
                  </div>
                </div>

                <div className='lost-books-filter-title'>
                  <h3>Ordenamiento</h3>
                </div>

                <div className='filter-options'>
                  <div className='input column-input'>
                    <label htmlFor='orderBy'>Ordenar por:</label>
                    <select className='order-by-select' id="orderBy" name='orderBy'>
                      <option value=''>Elegir</option>
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
                      <input type="radio" name="orderDirection" value="ASC" />
                      Ascendente
                    </label>
                    <label>
                      <input type="radio" name="orderDirection" value="DESC" />
                      Descendente
                    </label>
                  </div>
                </div>

              </div>

              <div className='lost-books-btn'>
                <Btn variant={'primary'} text={'Generar'} type="submit" />
              </div>
            </form>

          </div>
        </div>

        <div className='preview-list-container'>
          <GenerateListPopup
            dataByType={items}
            totalItems={totalItems}
            columnsByType={columnsByType["LostBooks"]}
            typeList={'LostBooks'}
            title={formValues.listTitle}
            handleChangePage={handleChangePage}
            loading={loading}
            resetPageTrigger={resetPageTrigger}
            rowsPerPage={rowsPerPage}
          />
        </div>
      </div>
    </>
  );
}
