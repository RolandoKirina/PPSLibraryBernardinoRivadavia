import './SearchBooks.css';
import SearchBooksTable from '../SearchBooksTable/SearchBooksTable';

export default function SearchBooks() {
    return (
        <>
            <form>
                <div className='add-loan-form-inputs'>
                    <div className='add-loan-retire-date'>
                        <label>Título</label>
                        <input type='text'/>
                    </div>
                    <div className='add-loan-retire-date'>
                        <label>Nota</label>
                        <input type='text'/>
                    </div>
                          <div className='add-loan-retire-date'>
                        <label>Autor</label>
                        <input type='text'/>
                    </div>
                </div>
                <SearchBooksTable />
            </form>
        </>
    )
}