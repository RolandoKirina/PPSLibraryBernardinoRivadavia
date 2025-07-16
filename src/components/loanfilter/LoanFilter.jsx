import { useState } from 'react';
import './LoanFilter.css';

export default function LoanFilter() {
  const [type, setType] = useState('room');
  const [state, setState] = useState('current');

  return (
    <aside className="loan-filter-aside">
      

      <div className="loan-filter-form">
       
        <form>
           <div className="loan-filter-title">
             <h3>Filtro de préstamos</h3>
          </div>
          <div className="loan-form-checkbox-group">
            <h4>Tipo de préstamos</h4>
            <label>
              <input
                type="radio"
                name="loan-type"
                value="room"
                checked={type === 'room'}
                onChange={() => setType('room')}
              />
              En sala
            </label>
            <label>
              <input
                type="radio"
                name="loan-type"
                value="retired"
                checked={type === 'retired'}
                onChange={() => setType('retired')}
              />
              Retirado
            </label>
            <label>
              <input
                type="radio"
                name="loan-type"
                value="all"
                checked={type === 'all'}
                onChange={() => setType('all')}
              />
              Todos
            </label>
          </div>

          <div className="loan-form-checkbox-group">
            <h4>Estado de préstamo</h4>
            <label>
              <input
                type="radio"
                name="loan-state"
                checked={state === 'current'}
                onChange={() => setState('current')}
              />
              Actuales
            </label>
            <label>
              <input
                type="radio"
                name="loan-state"
                checked={state === 'returned'}
                onChange={() => setState('returned')}
              />
              Devueltos
            </label>
            <label>
              <input
                type="radio"
                name="loan-state"
                checked={state === 'all'}
                onChange={() => setState('all')}
              />
              Todos
            </label>
          </div>

          <div className="loan-form-input-group">
            <h4>Fecha de retiro</h4>
            <label>Mayor a: </label>
            <input type="date" />
            <label>Y Menor a: </label>
            <input type="date" />
          </div>

          <div className="loan-form-input-group">
            <h4>Fecha de devolución</h4>
            <label>Mayor a: </label>
            <input type="date" />
            <label>Y Menor a: </label>
            <input type="date" />
          </div>

          <div className="loan-form-checkbox-group">
            <h4>Socio</h4>
            <label>Nombre</label>
            <input />
            <label>
              <input type="checkbox" />
              Solo los activos
            </label>
          </div>

          <div className="loan-form-input-group">
            <h4>Libro</h4>
            <label>Título</label>
            <input />
            <label>Código</label>
            <input />
          </div>
        </form>
      </div>
    </aside>
  );
}
