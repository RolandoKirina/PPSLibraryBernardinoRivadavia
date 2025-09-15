import './BookAuthors.css';
import { Table } from '../../common/table/Table';
import { mockAuthors } from '../../../data/mocks/authors';
import { useEntityManager } from '../../../hooks/useEntityManager';
import AuthorIcon from '../../../assets/img/author-icon.svg';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import Btn from '../../common/btn/Btn';
import { useState, useEffect } from 'react';

export default function BookAuthors({ authorsSelected, setAuthorsSelected }) {

    const [signature, setSignature] = useState("");
    const { items: authorItems, getItem: getAuthorItem, createItem: createAuthorItem, updateItem: updateAuthorItem, deleteItem: deleteAuthorItem } = useEntityManager(mockAuthors, 'authors');

    useEffect(() => {
        const newSignature = authorsSelected.map(author => author.authorName).join(" - ");
        setSignature(newSignature);
    }, [authorsSelected]);
    function handleAddAuthorBook(author) {
        const alreadyExists = authorsSelected.some(a => a.id === author.id);
        if (alreadyExists) return;

        setAuthorsSelected(prev => [...prev, author]);


    }

    function handleDeleteAuthorBook(id) {
        setAuthorsSelected(prev => prev.filter(a => a.id !== id));
    }


    let columns = [
        { header: 'Nombre', accessor: 'authorName' },
        { header: 'Nacionalidad', accessor: 'nationality' },
        {
            header: 'Agregar',
            accessor: 'add',
            render: (_, row) => (
                <button type='button' className="button-table" onClick={() => {
                    handleAddAuthorBook(row)
                }}>
                    <img src={AuthorIcon} alt="Agregar" />
                </button>
            )
        }
    ];

    let columnsAddedAuthors = [
        { header: 'Nombre', accessor: 'authorName' },
        { header: 'Nacionalidad', accessor: 'nationality' },
        {
            header: 'Borrar',
            accessor: 'delete',
            render: (_, row) => (
                <button type='button' className="button-table" onClick={() => {

                    handleDeleteAuthorBook(row.id);
                }}>
                    <img src={DeleteIcon} alt="Borrar" />
                </button>
            )
        }
    ];

    return (
        <>
            <div className='book-authors-size'>
                {/* añadir posiciones de  autores al darle a agregar*/}
                <div className='library-books'>
                    <div className='author-books-title'>
                        <h3>Autores cargados en la biblioteca</h3>
                    </div>
                    <Table data={authorItems} columns={columns} />
                </div>
                <div className='author-books'>
                    <div className='author-books-title'>
                        <h3>Autores de este libro</h3>
                    </div>
                    <Table data={authorsSelected} columns={columnsAddedAuthors} />

                    <div className='signature'>
                        <h3>Signaturas:</h3>
                        <p >
                            {signature.trim() !== ""
                                ? signature
                                : "Todavía no se ha asignado ninguna signatura."}
                        </p>
                    </div>

                </div>



            </div>

        </>
    )
}