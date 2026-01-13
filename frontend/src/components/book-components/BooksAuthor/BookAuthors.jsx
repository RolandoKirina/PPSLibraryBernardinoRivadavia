import './BookAuthors.css';
import { Table } from '../../common/table/Table';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import deleteIcon from '../../../assets/img/delete-icon.svg';
import { useState, useEffect } from 'react';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
export default function BookAuthors({ authorsSelected, setAuthorsSelected, bookId }) {

    const [signature, setSignature] = useState("");
    const { items: authorItems, getItems: getAuthorItems, createItem: createAuthorItem, updateItem: updateAuthorItem, deleteItem: deleteAuthorItem } = useEntityManagerAPI("authors");

    const { items, getItems, getItem, createItem, updateItem, deleteItem } = useEntityManagerAPI("book-authors");

    useEffect(() => {
        if (!authorsSelected || authorsSelected.length === 0) {
            setSignature("");
            return;
        }

        const newSignature = authorsSelected
            .map(author => {
                if (author.Author?.name) return author.Author.name;
                if (author.name) return author.name;
                return null;
            })
            .filter(Boolean)
            .join(" - ");

        setSignature(newSignature);
    }, [authorsSelected]);


    return (
        <>

            <div>
                <h3 className='title-signature'>Signatura:</h3>
                <div className='container-signature'>
                    <div className='signature'>
                        <p>
                            {signature.trim() !== ""
                                ? signature
                                : "Todavía no se ha asignado ningun autor."}
                        </p>
                    </div>

                </div>

            </div>

        </>
    )
}