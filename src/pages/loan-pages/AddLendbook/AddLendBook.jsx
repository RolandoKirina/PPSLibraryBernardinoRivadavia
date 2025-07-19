import './AddLendBook.css';
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useState } from 'react';

export default function AddLendBook({method}) {
    const [renewalResponseChoosed, setRenewalResponseChoosed] = useState('');

    const [returnResponseChoosed, setReturnResponseChoosed] = useState('');


    return (
        <>
                <div className="add-lend-book-container">
                    <div className='add-lend-book-title'>
                        {method === 'add' && <h2>Agregar Libro a Prestamo</h2>}
                        {method === 'update' && <h2>Editar Libro en Prestamo</h2>}
                    </div>
                    <div className='add-lend-book-form'>
                        <form>
                            <div className='add-lend-book-inputs'>

                                {method==='add' &&
                                    <>
                                        <div>
                                            <label>Codigo de Libro</label>
                                            <input />
                                        </div>
                                        <div>
                                            <label>Título</label>
                                            <input />
                                        </div>
                                        <div>
                                            <label>Fecha Prevista</label>
                                            <input />
                                        </div>
                                        <div>
                                            <label>Fecha de Devolución</label>
                                            <input />
                                        </div>
                                        <div className='add-lend-book-checkbox'>
                                            <label>
                                                <input type='checkbox'/>
                                                Devuelto
                                            </label> 
                                        </div>
                                        <div className='add-lend-book-checkbox'>
                                            <label>
                                                <input type='checkbox'/>
                                                Renovación
                                            </label> 
                                        </div>
                                    </>
                                }


                                {method==='update' &&
                                    <>
                                        <div>
                                            <label>Renovación</label>
                                            <select value={renewalResponseChoosed} onChange={(e) => setRenewalResponseChoosed(e.target.value)}>
                                            <option value="">Si/no</option>
                                            <option value="si">Sí</option>
                                            <option value="no">No</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>Devuelto</label>
                                           <select value={returnResponseChoosed} onChange={(e) => setReturnResponseChoosed(e.target.value)}>
                                            <option value="">Si/no</option>
                                            <option value="si">Sí</option>
                                            <option value="no">No</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>Fecha Prevista</label>
                                            <input type='date'/>
                                        </div>
                                        <div>
                                            <label>Fecha de Devolución</label>
                                            <input type='date'/>
                                        </div>
                                        <div className='add-lend-book-checkbox'>
                                            <label>
                                                <input type='checkbox'/>
                                                Devuelto
                                            </label> 
                                        </div>
                                        <div className='add-lend-book-checkbox'>
                                            <label>
                                                <input type='checkbox'/>
                                                Renovación
                                            </label> 
                                        </div>
                                    </>
                                }


                            </div>
                            <div className='add-lend-book-save'>
                                <button><img src={SaveIcon}/>Guardar</button>
                            </div>


                        </form>
                    </div>
                </div>
        </>
    );
}