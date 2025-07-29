import './AuthorSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import PopUpDelete from '../../components/deletebtnComponent/PopUpDelete';
import { editAuthorFormFields, addAuthorFormFields } from '../../data/author/AuthorForms';
import GenericForm from '../../components/generic/GenericForm/GenericForm';
import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import { useState } from 'react';
import Btn from '../../components/btn/Btn';
import PlusIcon from '../../assets/img/plus-icon.svg';
import AuthorForm from '../../components/author-components/AuthorForm/AuthorForm';

export default function AuthorSection() {
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);

    
    const authorsPopups = [
            {
                key: 'deletePopup',
                title: 'Borrar autor',
                className: 'delete-size-popup',
                content: <PopUpDelete title={"Autor"} closePopup={() => setDeletePopup(false)} />,
                close: () => setDeletePopup(false),
                condition: deletePopup,
                variant: 'delete'
            },
            {
                key: 'editPopup',
                title: 'Editar autor',
                className: '',
                content: <GenericForm fields={editAuthorFormFields} onSubmit={(data) => console.log('Formulario enviado:', data)}/>,
                close: () => setEditPopup(false),
                condition: editPopup
            },
            {
                key: 'addPopup',
                title: 'Agregar autor',
                className: '',
                content: <AuthorForm />,
                close: () => setAddPopup(false),
                condition: addPopup
            }
    ];

    const authors = [
    { id: 1, name: 'Carolina Gómez', nationality: 'Argentino' },
    { id: 1, name: 'Carolina Gómez', nationality: 'Argentino' },
    { id: 1, name: 'Carolina Gómez', nationality: 'Argentino' },
    { id: 1, name: 'Carolina Gómez', nationality: 'Argentino' },
    { id: 1, name: 'Carolina Gómez', nationality: 'Argentino' }
    ];

    const columns = [
        { header: 'Nombre', accessor: 'name' },
        { header: 'Nacionalidad', accessor: 'nationality' },
        {
            header: 'Borrar',
            accessor: 'delete',
            render: (_, row) => (
            <button className="button-table" onClick={() => setDeletePopup(true)}>
                <img src={DeleteIcon} alt="Borrar" />
            </button>
            )
        },
        {
            header: 'Editar',
            accessor: 'edit',
            render: (_, row) => (
            <button className="button-table"  onClick={() => setEditPopup(true)}>
                <img src={EditIcon} alt="Editar" />
            </button>
            )
        }
    ];

    return (
        <>
            <GenericSection title={'Listado de autores'} columns={columns} data={authors} popups={authorsPopups} 
            actions={
                <>
                <div className='author-actions'>
                    <Btn text={'Nuevo'}  onClick={() => setAddPopup(true)} className='new-btn' icon={<img src={PlusIcon} alt='plusIconBtn'/>}/> 
                    <div className='author-filter'>
                        <label>Filtro por nombre: </label>
                        <input type='text' name='author-name' />
                    </div>
                </div>
                
                </>
            }
            />
        </>
    )
}
