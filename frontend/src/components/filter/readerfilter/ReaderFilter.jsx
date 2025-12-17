import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import roles from '../../../auth/roles';

export default function ReaderFilter({ onFilterChange }) {
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    state: '',
    startDate: '',
    endDate: '',
    returnStartDate: '',
    returnEndDate: '',
    bookTitle: '',
    bookCode: ''
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
            <h3>Filtro de lectores</h3>
          </div>

          <div className="loan-form-input-group">
            <h4>Datos del lector</h4>
            <label>Nombre</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>DNI</label>
            <input
              name="dni"
              value={formData.dni}
              onChange={handleChange}
            />
          </div>

          <div className="loan-form-input-group">
            <h4>Datos del libro</h4>

            <label>Título</label>
            <input
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
            />

            <label>Código</label>
            <input
              name="bookCode"
              value={formData.bookCode}
              onChange={handleChange}
            />
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
                {val === 'current'
                  ? 'Actuales'
                  : val === 'returned'
                  ? 'Devueltos'
                  : 'Todos'}
              </label>
            ))}
          </div>

          <div className="loan-form-input-group">
            <h4>Fecha de retiro</h4>
            <label>Mayor a:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />

            <label>Y menor a:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          <div className="loan-form-input-group">
            <h4>Fecha de devolución</h4>
            <label>Mayor a:</label>
            <input
              type="date"
              name="returnStartDate"
              value={formData.returnStartDate}
              onChange={handleChange}
            />

            <label>Y menor a:</label>
            <input
              type="date"
              name="returnEndDate"
              value={formData.returnEndDate}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </aside>
  );
}
