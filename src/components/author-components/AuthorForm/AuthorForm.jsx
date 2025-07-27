import AuthorBooks from '../AuthorBooks/AuthorBooks';
import './AuthorForm.css';

export default function AuthorForm() {
    return (
        <>
            <div className='add-author-form-container'>
                <form>
                    <div className='add-author-form-inputs'>
                        <div>
                            <label>Nombre</label>
                            <input type='text' />
                        </div>
                        <div>
                            <label>Nacionalidad</label>
                            <input type='text' />
                        </div>
                    </div>
                </form>
                <AuthorBooks />


            </div>
        </>
    )
}