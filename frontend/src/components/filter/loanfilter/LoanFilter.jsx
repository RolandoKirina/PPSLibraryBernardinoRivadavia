import { useState } from 'react';
import './LoanFilter.css';
import { useAuth } from '../../../auth/AuthContext';
import roles from '../../../auth/roles';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import { useEffect } from 'react';

export default function LoanFilter({ onFilterChange }) {
  const { auth } = useAuth();

  const {
    items: bookTypes,
    getItems: getBookTypes,
  } = useEntityManagerAPI("book-types");

  const [formData, setFormData] = useState({
    state: '',
    materialType: '',
    selectedMaterial: '',
    startDate: '',
    endDate: '',
    returnStartDate: '',
    returnEndDate: '',
    partnerName: '',
    partnerSurname: '',
    onlyActiveMembers: false,
    bookTitle: '',
    bookCode: '',
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => {
      const updated = { ...prev, [name]: newValue };
      console.log('Campo modificado:', name, '→', newValue);
      console.log('Nuevo estado del form:', updated);

      return updated;
    });
  };

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(formData);
    }
  }, [formData, onFilterChange]);

  return (
    <aside className="loan-filter-aside">
      <div className="loan-filter-form">
        <form>
          <div className="loan-filter-title">
            <h3>Filtro de préstamos</h3>
          </div>

          <div className="loan-form-checkbox-group">
            <h4>Estado de préstamo</h4>
            {['current', 'returned', 'all'].map((val) => (
              <label key={val}>
                <input
                  type="radio"
                  name="state"
                  value={val}
                  checked={formData.state === val}
                  onChange={handleChange}
                />
                {val === 'current' ? 'Actuales' : val === 'returned' ? 'Devueltos' : 'Todos'}
              </label>
            ))}
          </div>

          <div className="loan-form-input-group">
            <h4>Fecha de retiro</h4>
            <label>Mayor a: </label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
            <label>Y Menor a: </label>
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
          </div>

          <div className="loan-form-input-group">
            <h4>Fecha de devolución</h4>
            <label>Mayor a: </label>
            <input type="date" name="returnStartDate" value={formData.returnStartDate} onChange={handleChange} />
            <label>Y Menor a: </label>
            <input type="date" name="returnEndDate" value={formData.returnEndDate} onChange={handleChange} />
          </div>

          {auth.role === roles.admin && (
            <div className="loan-form-checkbox-group partner-checkbox-group">
              <h4>Socio</h4>
              <div className='active-partners-checkbox-group'>
                <label>
                  <input type="checkbox" name="onlyActiveMembers" checked={formData.onlyActiveMembers} onChange={handleChange} />
                  Solo los activos
                </label>
              </div>
              <div className='partner-name-loan-filter'>
                <label>Nombre</label>
                <input className='' name="partnerName" value={formData.partnerName} onChange={handleChange} />
              </div>


            </div>
          )}


          {/* <div className="loan-form-input-group">
            <h4>Libro</h4>
            <label>Título</label>
            <input name="bookTitle" value={formData.bookTitle} onChange={handleChange} />
            <label>Código</label>
            <input name="bookCode" value={formData.bookCode} onChange={handleChange} />
          </div> */}
        </form>
      </div>
    </aside>
  );
}
