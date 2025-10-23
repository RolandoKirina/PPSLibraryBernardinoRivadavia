import './LostBooks.css';
import Btn from '../../common/btn/Btn';
import { useState } from 'react';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { dataByType, columnsByType } from '../../../data/generatedlist/generatedList';

export default function LostBooks() {
  const [formValues, setFormValues] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });

    setFormValues(data);
    console.log("Formulario:", data);
  };

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
                    <input type="date" name="lossDateFrom" id="lossDateFrom" />
                  </div>
                </div>
                <div className='filter-options'>
                  <div className='input column-input'>
                    <label htmlFor='lossDateTo'>Fecha menor a:</label>
                    <input type="date" name="lossDateTo" id="lossDateTo" />
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
                      <option value="memberLastName">Apellido Socio</option>
                      <option value="bookCode">Código Libro</option>
                      <option value="lossDate">Fecha pérdida</option>
                      <option value="memberNumber">Número Socio</option>
                      <option value="bookTitle">Título Libro</option>
                    </select>
                  </div>
                </div>
                <div className='filter-options'>
                  <div className='radio-inputs'>
                    <label>
                      <input type="radio" name="orderDirection" value="asc" />
                      Ascendente
                    </label>
                    <label>
                      <input type="radio" name="orderDirection" value="desc" />
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
            dataByType={dataByType}
            columnsByType={columnsByType}
            typeList={'LostBooks'}
            title={formValues.listTitle}
          />
        </div>
      </div>
    </>
  );
}
