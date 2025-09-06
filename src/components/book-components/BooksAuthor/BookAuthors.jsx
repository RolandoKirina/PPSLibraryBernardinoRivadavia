import './BookAuthors.css';
import { Table } from '../../common/table/Table';
import { mockAuthors } from '../../../data/mocks/authors';
import { useEntityManager } from '../../../hooks/useEntityManager';


export default function BookAuthors() {
    const { items: authorItems, getItem: getAuthorItem, createItem: createAuthorItem, updateItem: updateAuthorItem, deleteItem: deleteAuthorItem } = useEntityManager(mockAuthors, 'authors');

    let columns = [
        { header: 'Nombre', accessor: 'authorName' },
        { header: 'Nacionalidad', accessor: 'nationality' },
    ];

    return (
        <>
                <div className='library-books'>
                    <div className='author-books-title'>
                        <h3>Autores cargados en la biblioteca</h3>
                    </div>
                    <Table data={authorItems} columns={columns}/>
                </div>
                <div className='author-books'>
                    <div className='author-books-title'>
                        <h3>Autores de este libro</h3>
                    </div>
                    <Table/>
                </div>
        </>
    )
}