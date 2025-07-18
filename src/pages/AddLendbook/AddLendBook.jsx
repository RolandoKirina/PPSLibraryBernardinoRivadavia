import './AddLendBook.css';
import SaveIcon from '../../assets/img/save-icon.svg';


export default function AddLendBook() {
    return (
        <>
                <div className="add-lend-book-container">
                    <div className='add-lend-book-title'>
                        <h2>Agregar Libro a Prestamo</h2>
                    </div>
                    <div className='add-lend-book-form'>
                        <form>
                            <div className='add-lend-book-inputs'>
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