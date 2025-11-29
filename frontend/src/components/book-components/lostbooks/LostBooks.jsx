import './LostBooks.css';
import Btn from '../../common/btn/Btn';
import { useState } from 'react';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { dataByType, columnsByType } from '../../../data/generatedlist/generatedList';

export default function LostBooks() {
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState(null);
  const [lostBooksData, setLostBooksData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = {};

    formData.forEach((value, key) => {
      values[key] = value;
    });

    setFormValues(values);
    getLostBooks(values);
    console.log("Formulario:", values);
  };

  async function getLostBooks(values) {
    try {
      const params = new URLSearchParams();

      if (values.lossDateFrom) params.append("lossStartDate", values.lossDateFrom);
      if (values.lossDateTo) params.append("lossEndDate", values.lossDateTo);
      if (values.orderBy) params.append("orderBy", values.orderBy);
      if (values.orderDirection) params.append("direction", values.orderDirection);

      const url = `http://localhost:4000/api/v1/books/lost-book?${params.toString()}`;
      console.log("URL generada:", url);

      const res = await fetch(url);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ msg: "Error inesperado del servidor" }));
        setError(errorData.msg || "Error desconocido");
        return;
      }

      const lostBooks = await res.json();
      
      setLostBooksData(lostBooks);

    } catch (err) {
      setError("No se pudo conectar con el servidor");
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

            {error && <p className="error">{error}</p>}
          </div>
        </div>

        <div className='preview-list-container'>
          <GenerateListPopup
            dataByType={lostBooksData}
            columnsByType={columnsByType["LostBooks"]}
            typeList={'LostBooks'}
            title={formValues.listTitle}
          />
        </div>
      </div>
    </>
  );
}
