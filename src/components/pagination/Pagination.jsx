import './Pagination.css';

export default function Pagination() { 
    return (
        <>
            <div className='pagination'>
                <div className='pagination-options'>
                    <div className='number-buttons'>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>Siguiente</button>
                    </div>
                </div>   
            </div>
        </>

    );
}