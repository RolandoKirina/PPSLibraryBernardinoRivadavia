import { useState } from 'react';
import './BookFilter.css';

export default function BookFilter() {
  const [type, setType] = useState('room');
  const [state, setState] = useState('current');

  return (
    <aside className="book-filter-aside">
         
      
      <div className="book-filter-form">
        
        <form>
           <h3 className='titleh3'>Filtro de libros</h3>
          <div className="book-form-input-group">
            <label>Autor </label>
            <input type="text" />
          </div>

          <div className="book-form-input-group">
            <label>Código de inventario </label>
            <input type="text" />
          </div>

           <div className="book-form-input-group cdu">
            <label className='labelinput'>Código de CDU </label>

            <div className='content'>
              <div className='inputCDU'>
                <input type="text" />
              </div>
              <input type="text" className='inputCodeCDU' />
            </div>
          </div>

           <div className="book-form-input-group">
            <label>Codigo de signatura </label>
            <input type="text" />
            </div>

          <h3 className='titleh3'>Edición</h3>

            <div className="book-form-input-group">
              <label>Año </label>
              <input type="date" />
            </div>


            <div className="book-form-input-group">
              <label>Numero </label>
              <input type="number" />
            </div>

    
        </form>
      </div>
    </aside>
  );
}
