import { Table } from '../../common/table/Table.jsx'; 
import Btn from '../../common/btn/Btn.jsx';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import ChooseIcon from '../../../assets/img/choose-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import DetailsIcon from '../../../assets/img/details-icon.svg';
import AddBookIcon from '../../../assets/img/add-book-icon.svg';
import SaveIcon from '../../../assets/img/save-icon.svg'
import { useState } from 'react';
import GenericForm from '../../generic/GenericForm/GenericForm.jsx';
import PopUp from '../../common/popup-table/PopUp';
import data from '../../../data/forms/booksauthorforms.js';
import GenericSection from '../../generic/GenericSection/GenericSection';
import { mockAuthors } from '../../../data/mocks/authors.js';
import { useEntityManager } from '../../../hooks/useEntityManager.js';

export default function BooksAuthor() {
    const { items: authorItems, getItem: getAuthorItem, createItem: createAuthorItem, updateItem: updateAuthorItem, deleteItem: deleteAuthorItem } = useEntityManager(mockAuthors, 'authors');
    
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
                { header: 'Nombre', accessor: 'authorName' },
                { header:'Nacionalidad',accessor:'nationality' },
                {
                    header: 'Elegir',
                    accessor: 'choose',
                    render: (_, row) => (
                    <button className="button-table"  onClick={() => setConfirmPopup(true)}>
                        <img src={ChooseIcon} alt="Elegir" />
                    </button>
                    )
                }
    ];

            return (
                <>
                    <GenericSection title={'Elegir autores para este libro'} columns={columns} data={authorItems}/>

                </>
            )
}