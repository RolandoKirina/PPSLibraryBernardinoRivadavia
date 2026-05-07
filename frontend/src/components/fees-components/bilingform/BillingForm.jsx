import { useState } from 'react';
import './BillingForm.css';

export default function BillingForm() {
  const [filters, setFilters] = useState({
    partnerNumber: '',
    year: new Date().getFullYear().toString(),
    semester: '1' // Por defecto meses 1-6
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    
    if (!filters.partnerNumber || !filters.year) {
      alert("Por favor, completa el número de socio y el año.");
      return;
    }

    // Enviamos el semestre por query string
    const url = `/fees/generate-billing-form?partnerNumber=${filters.partnerNumber}&year=${filters.year}&semester=${filters.semester}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className="billing-form-container">
      <div className='billing-form-info-inputs'>
        <h2>Generar Planilla de Cobro</h2>
        <p>Selecciona el periodo para visualizar los troqueles.</p>

        <form onSubmit={handleGenerate} className="billing-form-grid">
          <div className='billing-fee-input'>
            <label>N° Socio</label>
            <input
              name="partnerNumber"
              type='text'
              placeholder="Ej: 1234"
              required
              value={filters.partnerNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className='billing-fee-input'>
            <label>Año</label>
            <input
              name="year"
              type='number'
              value={filters.year}
              onChange={handleInputChange}
            />
          </div>

          <div className='billing-fee-input'>
            <label>Periodo (Meses)</label>
            <select 
              name="semester" 
              value={filters.semester} 
              onChange={handleInputChange}
              className="billing-fee-select"
            >
              <option value="1">Enero - Junio (1 al 6)</option>
              <option value="2">Julio - Diciembre (7 al 12)</option>
            </select>
          </div>

          <div className='billing-form-actions'>
            <button type="submit" className="button-generate">
              Generar Planilla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}