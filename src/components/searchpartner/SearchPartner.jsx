import './SearchPartner.css';

export default function SearchPartner() {
    return (
        <>
            <div className='search-partner-container'>
                <h2>Socio</h2>
                <div className='search-partner-inputs'>
                    <div>
                        <label>Número</label>
                        <input type='number'/>
                    </div>
                     <div>
                        <label>Apellido, Nombre</label>
                        <input type='text'/>
                    </div>
                     <div>
                        <label>Busqueda por Memo</label>
                        <input type='text'/>
                    </div>
                </div>
                <div className='search-partner-buttons'>
                    <button>Cuotas Impagas</button>
                    <button>Libros Pendientes</button>
                    <button>Memo del Socio</button>
                </div>
            </div>
        </>
    )
}