import './BookFilter.css';
import { useState } from 'react';
export default function BookFilter({ formData, onChange }) {

  const [partnerNumber, setPartnerNumber] = useState('');
  const [paidFeeCount, setPaidFeeCount] = useState(0);


  return (
    <aside className="book-filter-aside">
      <div className="book-filter-form">
        <form>
          <h3 className='titleh3'>Filtro de libros</h3>

          <div className="book-form-input-group">
            <label>Autor</label>
            <input type="text" name="author" value={formData.author} onChange={onChange} />
          </div>

          <div className="book-form-input-group">
            <label>Código de inventario</label>
            <input type="text" name="codeInventory" value={formData.codeInventory} onChange={onChange} />
          </div>

          <div className="book-form-input-group cdu">
            <label className='labelinput'>Código de CDU</label>

            <input type="text" name="codeCDU" value={formData.codeCDU} onChange={onChange} />

          </div>

          <div className="book-form-input-group">
            <label>Código de signatura</label>
            <input type="text" name="codeSignature" value={formData.codeSignature} onChange={onChange} />
          </div>

          <div className="book-form-input-group">
            <label>Titulo de libro</label>
            <input type="text" name="bookTitle" value={formData.bookTitle} onChange={onChange} />
          </div>

          <h3 className='titleh3'>Edición</h3>

          <div className="book-form-input-group">
            <label>Año</label>
            <input type="date" name="yearEdition" value={formData.yearEdition} onChange={onChange} />
          </div>

          <div className="book-form-input-group">
            <label>Número</label>
            <input type="number" name="numberEdition" value={formData.numberEdition} onChange={onChange} />
          </div>
        </form>
      </div>
    </aside>
  );
}

