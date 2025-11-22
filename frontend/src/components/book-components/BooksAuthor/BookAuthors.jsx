import './BookAuthors.css';
import { Table } from '../../common/table/Table';
import { useEntityManager } from '../../../hooks/useEntityManager';
import AuthorIcon from '../../../assets/img/author-icon.svg';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import Btn from '../../common/btn/Btn';
import { useState, useEffect } from 'react';
import {useEntityManagerAPI} from '../../../hooks/useEntityManagerAPI';
export default function BookAuthors({ selectedBook }) {

    const [signature, setSignature] = useState("");
    const { items: authorItems, getItems: getAuthorItems, createItem: createAuthorItem, updateItem: updateAuthorItem, deleteItem: deleteAuthorItem } = useEntityManagerAPI("authors");

    const [authorsSelected, setAuthorsSelected] = useState(selectedBook.authors || []);
     
    const { items, getItems, getItem, createItem, updateItem, deleteItem } =
       useEntityManagerAPI("book-authors");
      


        useEffect(() => {
            if(authorsSelected){
                const newSignature = authorsSelected.map(author => author.authorName).join(" - ");
                setSignature(newSignature);
            }
        
        }, [authorsSelected]);

        useEffect(() => {
        getItems(); 
        getAuthorItems(); 
        }, []);

        useEffect(() => {
  console.log("Autores seleccionados para el libro:", authorsSelected);
}, [authorsSelected]);

async function addAuthorBook(row){
    
                try {
                
                
                const itemcreated = {
                    bookId: selectedBook.BookId,  
                    bookCode: selectedBook.codeInventory, 
                    authorCode: row.id,
                    authorName: row.name     
                }
                
                return await createItem({
                    itemcreated
                });
                
                } catch (err) {
                console.error("Error al crear relación libro-autor:", err);
                }   
            }


    /*function handleAddAuthorBook(author) {
        const alreadyExists = authorsSelected.some(a => a.id === author.id);
        if (alreadyExists) return;

        setAuthorsSelected(prev => [...prev, author]);


    }*/

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
            <button
                type='button'
                className="button-table"
                onClick={async () => {
                await addAuthorBook(row);
                }}
            >
                <img src={AuthorIcon} alt="Agregar" />
            </button>
            )
        }
        ];
    

    let columnsAddedAuthors = [
        { header: 'Nombre', accessor: 'name' },
        { header: 'Nacionalidad', accessor: 'nationality' },
        {
            header: 'Borrar',
            accessor: 'delete',
           render: (_, row) => (
                <button
                    type='button'
                    className="button-table"
                    onClick={() => addAuthorBook(row)}
                >
                    <img src={AuthorIcon} alt="Agregar" />
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