import { useState } from 'react';
import './BookFilter.css';

export default function BookFilter() {
    const [type, setType] = useState('room');
    const [state, setState] = useState('current');


    return (
        <>
            <aside className='filter-aside'>
                <div className='filter-title'>
                    <h3>Filtro de prestamos</h3>
                </div>
                <div className='filter-form'>
                    <form>
                        <div className='form-inputs-checkbox'>
                            <h4>Tipo de Prestamo</h4>
                            <label>
                                <input type='radio' name='loan-type' value='room' checked={type === 'room'} onChange={() => setType('room')}/>
                                En sala
                            </label>
                            <label>
                                <input type='radio' name='loan-type' value='retired' checked={type === 'retired'} onChange={() => setType('retired')}/>
                                Retirado
                            </label>
                            <label>
                                <input type='radio' name='loan-type' value='all' checked={type === 'all'} onChange={() => setType('all')}/>
                                Todos
                            </label>
                        </div>
                        <div className='form-inputs-checkbox'>
                            <h4>Estado de Prestamo</h4>
                            <label>
                                <input type='radio' name='loan-state' checked={state === 'current'} onChange={() => setState('current')}/>
                                Actuales
                            </label>
                            <label>
                                <input type='radio' name='loan-state' checked={state === 'returned'} onChange={() => setState('returned')}/>
                                Devueltos
                            </label>
                            <label>
                                <input type='radio' name='loan-state' checked={state === 'all'} onChange={() => setState('all')}/>
                                Todos
                            </label>
                        </div>
                        <div className='form-inputs'>
                            <h4>Fecha de Retiro</h4>
                            <label>Mayor a: </label>
                            <input type='date'/>
                            <label>Y Menor a: </label>
                            <input type='date'/>
                        </div>
                        <div className='form-inputs'>
                            <h4>Fecha de Devolución</h4>
                            <label>Mayor a: </label>
                            <input type='date'/>
                            <label>Y Menor a: </label>
                            <input type='date'/>
                        </div>
                        <div className='form-inputs-checkbox'>
                            <h4>Socio</h4>
                            <label>Nombre</label>
                            <input/>
                            <label>
                                <input type='checkbox'/>
                                Solo los activos
                            </label>
                        </div>
                        <div className='form-inputs'>
                            <h4>Libro</h4>
                            <label>Titulo</label>
                            <input/>
                            <label>Codigo</label>
                            <input/>
                        </div>

                    </form>
                </div>
            </aside>
        </>
    );
}