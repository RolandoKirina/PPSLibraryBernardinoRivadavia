import AuthorBooks from '../AuthorBooks/AuthorBooks';
import './AuthorForm.css';
import { useState } from 'react';
import BackviewBtn from '../../backviewbtn/BackviewBtn';
import GenericForm from '../../generic/GenericForm/GenericForm';
import ShowDetails from '../../generic/ShowDetails/ShowDetails';
import { authorBooksDetails } from '../../../data/author/AuthorDetails';
import { editAuthorBookFormFields } from '../../../data/author/AuthorForms';

export default function AuthorForm() {
    const [popupView, setPopupView] = useState('default');
    return (
        <>



            <div className='add-author-form-container'>
                {popupView === 'default' && (
                    <>
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
                <AuthorBooks menu={setPopupView}/>
                </>
                )}
                {popupView === 'editForm' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <GenericForm title={'Editar Libro de autor'} fields={editAuthorBookFormFields} onSubmit={(data) => console.log('Formulario enviado:', data)}/>
                    </>
                )}
                {popupView === 'details' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <ShowDetails insidePopup={true} titleText={'Detalles de libros de autor'} isPopup={false} detailsData={authorBooksDetails} />
                    </>
                )}
                {popupView === 'addForm' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <GenericForm title={'Agregar Libro de autor'} fields={editAuthorBookFormFields} onSubmit={(data) => console.log('Formulario enviado:', data)}/>
                    </>
                )}

                
            </div>


         

            
        </>
    )
}