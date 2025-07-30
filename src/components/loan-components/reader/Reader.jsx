import './Reader.css';

export default function Reader() {

    return (
        <>
            <div className='search-partner-container'>
                <h2>Lector</h2>
                <div className='search-partner-inputs'>
                    <div>
                        <label>DNI</label>
                        <input type='number'/>
                    </div>
                     <div>
                        <label>Apellido, Nombre</label>
                        <input type='text'/>
                    </div>
                </div>
            </div>
        </>
    )
}