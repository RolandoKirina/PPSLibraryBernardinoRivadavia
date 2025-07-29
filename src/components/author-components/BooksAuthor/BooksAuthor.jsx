import { Table } from '../../table/Table.jsx'; 
import Btn from '../../btn/Btn.jsx';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import DetailsIcon from '../../../assets/img/details-icon.svg';
import AddBookIcon from '../../../assets/img/add-book-icon.svg';
import SaveIcon from '../../../assets/img/save-icon.svg'
import { useState } from 'react';
import GenericForm from '../../generic/GenericForm/GenericForm.jsx';
import PopUp from '../../popup-table/PopUp2';
import data from '../../../data/booksauthor/booksauthor.js';
export default function BooksAuthor() {

    
    const BooksAuthor = [
        {
            idbook: 1,
            idauthor:1,
            name: 'Julio Cortázar',
            nacionality: 'Argentina',
            namebook: 'libro1'
        }
    ];
    

    const [PopUpAddBooksAuthor,setPopUpAddBooksAuthor]=useState(false);


    const columns = [
                { header: 'Nombre', accessor: 'name' },
                {header:'Nacionalidad',accessor:'nacionality'},
                {header:'Nombre libro',accessor:'namebook'},
                {
                    header: 'Borrar',
                    accessor: 'delete',
                    render: (_, row) => (
                     <button type='button' className="button-table" onClick={() => setDeletePopup(true)}>
                        <img src={DeleteIcon} alt="Borrar" />
                    </button>
                    )
                },
                {
                    header: 'Editar',
                    accessor: 'edit',
                    render: (_, row) => (
                    <button type='button' className="button-table" onClick={() => window.open(`${window.location.origin}/authors/author-books-edit`, '_blank')}>
                        <img src={EditIcon} alt="Editar" />
                    </button>
                    )
                },
                {
                    header: 'Ver detalle',
                    accessor: 'details',
                    render: (_, row) => (
                    <button type='button' className="button-table" onClick={() => window.open(`${window.location.origin}/authors/author-books-details`, '_blank')}>
                        <img src={DetailsIcon} alt="Detalles" />
                    </button>
                    )
                }
        ];



        
            return (
                <>
                    <div className='author-books-container'>
                        <h2 className='author-books-title'>Autores de este libro</h2>
        
                        <Table columns={columns} data={BooksAuthor}>
                            <div className='author-books-add-btn'>
                                <Btn onClick={() => setPopUpAddBooksAuthor(true)} text={'Agregar autor a este libro'} icon={<img src={AddBookIcon} alt='addBookIcon'/>} />
                            </div>
                            <div className='author-books-save-btn'>
                                <Btn text="Guardar" className="changes btn"
                                    icon={<div className="img-ico"><img src={SaveIcon} alt="Guardar" /></div>}/>

                            </div>
                            <div>
                                
                            </div>
                        </Table>
                        {PopUpAddBooksAuthor && (
                            <PopUp
                                title="Agregar autor al Libro"
                                onClick={() => setPopUpAddBooksAuthor(false)}
                            >
                                {/*aca en vez de esto se ouede utilizar una libreria de react que permite
                                buscar autores x texxto ala vez que esta el select, react select para mostrar muchos autords a la vez*/}
                                <GenericForm fields={data} title="Añadir autor a un libro"/>
                            </PopUp>
                            )}

                    
        
                    </div>
                </>
            )
}