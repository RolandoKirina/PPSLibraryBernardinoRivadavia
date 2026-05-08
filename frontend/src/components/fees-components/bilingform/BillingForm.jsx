import { useState } from 'react';
import './BillingForm.css';
import Btn from '../../common/btn/Btn';

export default function BillingForm() {
  const [filters, setFilters] = useState({
    partnerNumber: '',
    year: new Date().getFullYear().toString(),
    semester: '1', // 1: Enero-Junio, 2: Julio-Diciembre
    month: 'all'   // 'all' para todo el semestre, o el número de mes (1-12)
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Si cambia el semestre, reseteamos el mes a 'all' para evitar inconsistencias
    if (name === 'semester') {
      setFilters(prev => ({ ...prev, [name]: value, month: 'all' }));
    } else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    
    if (!filters.partnerNumber || !filters.year) {
      alert("Por favor, completa el número de socio y el año.");
      return;
    }

    // Construimos la URL base
    let url = `/fees/generate-billing-form?partnerNumber=${filters.partnerNumber}&year=${filters.year}&semester=${filters.semester}`;
    
    // Si se seleccionó un mes específico, lo añadimos como parámetro
    if (filters.month !== 'all') {
      url += `&month=${filters.month}`;
    }
    
    // Abrimos la planilla en una nueva pestaña
    window.open(url, '_blank');
  };

  return (
    <div className="billing-form-container billing-form-style">
      <div className='billing-form-info-inputs'>
        <h2>Generar Planilla de Cobro</h2>
        <p>Selecciona el socio y el periodo para visualizar los troqueles.</p>

        <form onSubmit={handleGenerate} className="billing-form-grid">
          
          {/* NÚMERO DE SOCIO */}
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

          {/* AÑO */}
          <div className='billing-fee-input'>
            <label>Año</label>
            <input
              name="year"
              type='number'
              value={filters.year}
              onChange={handleInputChange}
            />
          </div>

          {/* SEMESTRE */}
          <div className='billing-fee-input'>
            <label>Periodo Semestral</label>
            <select 
              name="semester" 
              value={filters.semester} 
              onChange={handleInputChange}
              className="billing-fee-select"
            >
              <option value="1">1° Semestre (Enero - Junio)</option>
              <option value="2">2° Semestre (Julio - Diciembre)</option>
            </select>
          </div>

          {/* MES ESPECÍFICO (Filtro dinámico) */}
          <div className='billing-fee-input'>
            <label>Mes (Opcional)</label>
            <select 
              name="month" 
              value={filters.month} 
              onChange={handleInputChange}
              className="billing-fee-select"
            >
              <option value="all">-- Imprimir todos los pendientes --</option>
              {filters.semester === "1" ? (
                <>
                  <option value="1">Enero</option>
                  <option value="2">Febrero</option>
                  <option value="3">Marzo</option>
                  <option value="4">Abril</option>
                  <option value="5">Mayo</option>
                  <option value="6">Junio</option>
                </>
              ) : (
                <>
                  <option value="7">Julio</option>
                  <option value="8">Agosto</option>
                  <option value="9">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </>
              )}
            </select>
          </div>

          <div className='billing-form-actions'>
             <Btn text="Visualizar Planilla" type="submit" variant="primary"/>
          </div>
        </form>
      </div>
    </div>
  );
}