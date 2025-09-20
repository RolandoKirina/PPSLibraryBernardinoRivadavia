import { useState } from 'react';
import './LoanFilter.css';
import { authMock } from '../../../data/mocks/authMock';

export default function LoanFilter() {
  const [formData, setFormData] = useState({
    type: 'room',
    state: 'current',
    materialType: 'all',
    selectedMaterial: '',
    startDate: '',
    endDate: '',
    returnStartDate: '',
    returnEndDate: '',
    memberName: '',
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

  return (
    <aside className="loan-filter-aside">
      <div className="loan-filter-form">
        <form>
          <div className="loan-filter-title">
            <h3>Filtro de préstamos</h3>
          </div>

          <div className="loan-form-checkbox-group">
            <h4>Tipo de préstamos</h4>
            {['room', 'retired', 'all'].map((val) => (
              <label key={val}>
                <input
                  type="radio"
                  name="type"
                  value={val}
                  checked={formData.type === val}
                  onChange={handleChange}
                />
                {val === 'room' ? 'En sala' : val === 'retired' ? 'Retirado' : 'Todos'}
              </label>
            ))}
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

          {authMock.role === 'admin' && (
            <div className="loan-form-checkbox-group">
              <h4>Tipo de material retirado</h4>
              <label>
                <input
                  type="radio"
                  name="materialType"
                  value="all"
                  checked={formData.materialType === 'all'}
                  onChange={handleChange}
                />
                Todos
              </label>
              <label>
                <input
                  type="radio"
                  name="materialType"
                  value="specific"
                  checked={formData.materialType === 'specific'}
                  onChange={handleChange}
                />
                Los del tipo:
              </label>

              {formData.materialType === 'specific' && (
                <select
                  name="selectedMaterial"
                  value={formData.selectedMaterial}
                  onChange={handleChange}
                  className="loan-filter-select"
                >
                  <option value="">Seleccionar tipo...</option>
                  <option value="CD">CD</option>
                  <option value="DVD">DVD</option>
                  <option value="Libro">Libro</option>
                  <option value="Revista">Revista</option>
                  <option value="Texto">Texto</option>
                  <option value="Video">Video</option>
                </select>
              )}
            </div>
          )}


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

          {authMock.role === 'admin' && (
            <div className="loan-form-checkbox-group">
              <h4>Socio</h4>
              <label>Nombre</label>
              <input name="memberName" value={formData.memberName} onChange={handleChange} />
              <label>
                <input type="checkbox" name="onlyActiveMembers" checked={formData.onlyActiveMembers} onChange={handleChange} />
                Solo los activos
              </label>
            </div>
          )}


          <div className="loan-form-input-group">
            <h4>Libro</h4>
            <label>Título</label>
            <input name="bookTitle" value={formData.bookTitle} onChange={handleChange} />
            <label>Código</label>
            <input name="bookCode" value={formData.bookCode} onChange={handleChange} />
          </div>
        </form>
      </div>
    </aside>
  );
}
