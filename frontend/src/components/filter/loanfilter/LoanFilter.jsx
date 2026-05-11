import { useState, useEffect } from 'react';
import './LoanFilter.css';
import { useAuth } from '../../../auth/AuthContext';
import roles from '../../../auth/roles';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';

export default function LoanFilter({ onFilterChange }) {
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    sortBy: 'id',
    direction: 'desc',
    state: '',
    materialType: '',
    selectedMaterial: '',
    startDate: '',
    endDate: '',
    returnStartDate: '',
    returnEndDate: '',
    partnerName: '',
    partnerSurname: '',
    partnerNumber: '',
    onlyActiveMembers: false,
    bookTitle: '',
    bookCode: '',
    employeeCode: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "sortGroup") {
      const [sortBy, direction] = value.split('-');
      setFormData(prev => ({ ...prev, sortBy, direction }));
      return;
    }

    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(formData);
    }
  }, [formData, onFilterChange]);

  return (
    <aside className="loan-filter-aside">
      <div className="loan-filter-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="loan-filter-title">
            <h3>Filtro de préstamos</h3>
          </div>

          {/* SECCIÓN DE ORDENAMIENTO */}
          <div className="loan-form-input-group">
            <h4>Ordenar por</h4>
            <select
              name="sortGroup"
              value={`${formData.sortBy}-${formData.direction}`}
              onChange={handleChange}
              className="loan-filter-select"
            >
              <option value="id-desc">Más recientes (ID)</option>
              <option value="id-asc">Más antiguos (ID)</option>
              <option value="retiredDate-desc">Fecha de retiro (Nuevo a Viejo)</option>
              <option value="retiredDate-asc">Fecha de retiro (Viejo a Nuevo)</option>
              <option value="partnerNumber-desc">Número socio (Mayor a Menor)</option>
            </select>
            <hr />
          </div>

          {auth.role === roles.admin && (
            <>
              <div className="loan-form-checkbox-group partner-checkbox-group">
                <h4>Empleados</h4>
                <hr />
                <div className='partner-name-loan-filter'>
                  <label>Código</label>
                  <input name="employeeCode" value={formData.employeeCode} onChange={handleChange} />
                </div>
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
            </>
          )}

          {auth.role === roles.admin && (
            <div className="loan-form-checkbox-group partner-checkbox-group">
              <h4>Socios</h4>
              <hr />
              <div className='active-partners-checkbox-group'>
                <label>
                  <input type="checkbox" name="onlyActiveMembers" checked={formData.onlyActiveMembers} onChange={handleChange} />
                  Solo los activos
                </label>
              </div>
              <div className='partner-name-loan-filter'>
                <label>Nombre</label>
                <input name="partnerName" value={formData.partnerName} onChange={handleChange} />
              </div>

              <div className='partner-name-loan-filter'>
                <label>Apellido</label>
                <input name="partnerSurname" value={formData.partnerSurname} onChange={handleChange} />
              </div>

              <div className='partner-name-loan-filter'>
                <label>Número de Socio</label>
                <input type='number' name="partnerNumber" value={formData.partnerNumber} onChange={handleChange} />
              </div>
            </div>
          )}

          <div className="loan-form-input-group">
            <h4>Libros</h4>
            <hr />
            <div className='partner-name-loan-filter'>
              <label>Título</label>
              <input name="bookTitle" value={formData.bookTitle} onChange={handleChange} />
            </div>
            <div className='partner-name-loan-filter'>
              <label>Código / Inventario</label>
              <input name="bookCode" value={formData.bookCode} onChange={handleChange} />
            </div>
          </div>

          <div className="loan-form-input-group">
            <h4>Prestamos</h4>
            <hr />
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
        </form>
      </div>
    </aside>
  );
}