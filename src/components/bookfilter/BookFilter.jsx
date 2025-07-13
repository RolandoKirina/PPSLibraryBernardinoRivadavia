import { useState } from 'react';
import './BookFilter.css';

export default function BookFilter() {
  const [type, setType] = useState('room');
  const [state, setState] = useState('current');

  return (
    <aside className="book-filter-aside">
      <div className="book-filter-title">
        <h3>Filtro de préstamos</h3>
      </div>
      <div className="book-filter-form">
        <form>
          <div className="book-form-checkbox-group">
            <h4>Tipo de Préstamo</h4>
            <label>
              <input
                type="radio"
                name="book-type"
                value="room"
                checked={type === 'room'}
                onChange={() => setType('room')}
              />
              En sala
            </label>
            <label>
              <input
                type="radio"
                name="book-type"
                value="retired"
                checked={type === 'retired'}
                onChange={() => setType('retired')}
              />
              Retirado
            </label>
            <label>
              <input
                type="radio"
                name="book-type"
                value="all"
                checked={type === 'all'}
                onChange={() => setType('all')}
              />
              Todos
            </label>
          </div>

          <div className="book-form-checkbox-group">
            <h4>Estado de Préstamo</h4>
            <label>
              <input
                type="radio"
                name="book-state"
                checked={state === 'current'}
                onChange={() => setState('current')}
              />
              Actuales
            </label>
            <label>
              <input
                type="radio"
                name="book-state"
                checked={state === 'returned'}
                onChange={() => setState('returned')}
              />
              Devueltos
            </label>
            <label>
              <input
                type="radio"
                name="book-state"
                checked={state === 'all'}
                onChange={() => setState('all')}
              />
              Todos
            </label>
          </div>

          <div className="book-form-input-group">
            <h4>Fecha de Retiro</h4>
            <label>Mayor a: </label>
            <input type="date" />
            <label>Y Menor a: </label>
            <input type="date" />
          </div>

          <div className="book-form-input-group">
            <h4>Fecha de Devolución</h4>
            <label>Mayor a: </label>
            <input type="date" />
            <label>Y Menor a: </label>
            <input type="date" />
          </div>

          <div className="book-form-checkbox-group">
            <h4>Socio</h4>
            <label>Nombre</label>
            <input />
            <label>
              <input type="checkbox" />
              Solo los activos
            </label>
          </div>

          <div className="book-form-input-group">
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
