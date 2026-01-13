import "./formeditbook.css";
import Btn from "../../common/btn/Btn.jsx";
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useState, useEffect } from "react";
import BackviewBtn from "../../common/backviewbtn/BackviewBtn.jsx";
import BookAuthors from "../BooksAuthor/BookAuthors.jsx";
import { useEntityManagerAPI } from "../../../hooks/useEntityManagerAPI.js";

export default function FormEditBook({ selectedBook, getItems }) {
    const [popupView, setPopupView] = useState('default');
    const [authorsSelected, setAuthorsSelected] = useState([]);
    const entityManagerApi = useEntityManagerAPI("books");
    const { items: booksTypes, getItems: getBookTypes, deleteItem, createItem, updateItem } = useEntityManagerAPI("book-types");
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const [selectedLost, setSelectedLost] = useState("");
    const [results, setResults] = useState([]);
    const [SearchAuthor, setSearchAuthor] = useState("");
    const { items: authors = [], getItems: getAuthors } =
        useEntityManagerAPI("authors");

    async function onHandleFindAuthor(value) {
        try {
            if (!value.trim()) {
            setResults([]);
            return;
            }
            const res = await getAuthors({ authorName: value });
            setResults(res);
        } catch (err) {
        console.error(err);
        }
    }

    let title = "Libros";
    useEffect(() => {
        getBookTypes();
    }, []);

    useEffect(() => {
        if (selectedBook?.type && booksTypes.length > 0) {
            setSelectedType(String(selectedBook.type));
        }
    }, [selectedBook, booksTypes]);

    useEffect(() => {
        if (selectedBook?.BookAuthors) {
            setAuthorsSelected(selectedBook.BookAuthors);
        }

        if (selectedBook?.lost !== undefined) {
            setSelectedLost(selectedBook.lost ? "true" : "false");
        }
    }, [selectedBook]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);


        const rawDate = data.get("dateOfBuy");
        const parsedDate = rawDate ? new Date(rawDate) : null;

        const updatedItem = {
            codeInventory: data.get("code") || selectedBook.codeInventory,
            BookId: selectedBook.BookId,
            codeCDU: data.get("codeCDU") || selectedBook.codeCDU,
            title: data.get("title") || selectedBook.title,
            ubication: data.get("ubication") || selectedBook.ubication,
            editorial: data.get("editorial") || selectedBook.editorial,
            numberEdition: data.get("numberEdition") ? Number(data.get("numberEdition")) : selectedBook.numberEdition,
            yearEdition: data.get("year") || selectedBook.yearEdition,
            translator: data.get("translator") || selectedBook.translator,
            codeClasification: data.get("codClas") || selectedBook.codeClasification,
            pages: data.get("pages") || selectedBook.pages,
            numberOfCopies: data.get("quantity") ? Number(data.get("quantity")) : selectedBook.numberOfCopies,
            notes: data.get("notes") || selectedBook.notes,
            type: selectedType ? Number(selectedType) : null,
            lost: selectedLost === "true" ? true : selectedLost === "false" ? false : null,
            codeLing: data.get("codeLing") || selectedBook.codeLing,
            idSupplier: data.get("idSupplier") ? Number(data.get("idSupplier")) : selectedBook.idSupplier,
            invoiceNumber: data.get("numfactura") || selectedBook.invoiceNumber,
            dateOfBuy: data.get("dateOfBuy") || selectedBook.dateOfBuy,
            lossDate: data.get("lossDate") || selectedBook.lossDate,
            lostPartnerNumber: data.get("lostPartnerNumber") ? Number(data.get("lostPartnerNumber")) : selectedBook.lostPartnerNumber,
            authors: authorsSelected
        };
        try {
            const updated = await entityManagerApi.updateItem(selectedBook.BookId, updatedItem);

            if (updated) {
                setSuccessMessage(" ✅ Libro actualizado con exito");

                setTimeout(() => setSuccessMessage(""), 10000);

                await getItems();
            }
        } catch (error) {
            alert("Error al actualizar el libro");
            console.error("Error al editar libro:", error);
        }
    };


    return (
        <>
            {popupView === "default" && (
                <>
                    <form className="formeditbook" onSubmit={handleSubmit}>
                        <div className="columns-container">
                            <div className="contentformedit">
                                <div className="input">
                                    <label htmlFor="code">
                                        Código
                                    </label>
                                    <input
                                        id="code"
                                        name="code"
                                        type="text"
                                        placeholder="Código"
                                        defaultValue={selectedBook?.codeInventory || ""}
                                    />
                                </div>

                                <div className="input">
                                    <div className="cdu">
                                        <label htmlFor="codeCDU">
                                            Código CDU
                                        </label>
                                        <div className="cdu-options">
                                            <input
                                                id="codeCDU"
                                                name="codeCDU"
                                                type="text"
                                                defaultValue={selectedBook?.codeCDU || ""}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="input">
                                    <label htmlFor="title">
                                        Título
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Título"
                                        defaultValue={selectedBook?.title || ""}
                                    />
                                </div>

                                <div className="input">
                                    <div className="divconteiner content">
                                        <div>
                                            <label htmlFor="ubication">
                                                Ubicación
                                            </label>
                                            <input
                                                id="ubication"
                                                name="ubication"
                                                type="text"
                                                placeholder="Ubicación"
                                                defaultValue={selectedBook?.ubication || ""}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="quantity">
                                                Cantidad
                                            </label>
                                            <input
                                                id="quantity"
                                                name="quantity"
                                                type="number"
                                                placeholder="Cantidad"
                                                defaultValue={selectedBook?.numberOfCopies || ""}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="input">
                                    <div className="divconteiner content">
                                        <div>
                                            <label htmlFor="editorial">
                                                Editorial
                                            </label>
                                            <input
                                                id="editorial"
                                                name="editorial"
                                                type="text"
                                                placeholder="Editorial"
                                                defaultValue={selectedBook?.editorial || ""}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="type">
                                                Tipo
                                            </label>


                                            <select
                                                name="type"
                                                id="type"
                                                className="selectform"
                                                value={selectedType}
                                                onChange={(e) => setSelectedType(e.target.value)}
                                                required
                                            >
                                                <option value="">Seleccione un tipo</option>
                                                {booksTypes.map((type) => (
                                                    <option
                                                        key={type.bookTypeId}
                                                        value={String(type.bookTypeId)}
                                                    >
                                                        {type.typeName}
                                                    </option>
                                                ))}
                                            </select>



                                        </div>
                                    </div>
                                </div>

                                <div className="input">
                                    <label htmlFor="translator">Traductor</label>
                                    <input
                                        id="translator"
                                        name="translator"
                                        type="text"
                                        placeholder="Traductor"
                                        defaultValue={selectedBook?.translator || ""}
                                    />
                                </div>

                                <div className="input">
                                    <div className="divconteiner content">
                                        <div>
                                            <label htmlFor="idSupplier">Número de prov</label>
                                            <input
                                                id="idSupplier"
                                                name="idSupplier"
                                                type="number"
                                                placeholder="Número de prov"
                                                defaultValue={selectedBook?.idSupplier || ""}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="numfactura">Núm. factura</label>
                                            <input
                                                id="numfactura"
                                                name="numfactura"
                                                type="text"
                                                placeholder="Número de factura"
                                                defaultValue={selectedBook?.invoiceNumber || ""}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="dateOfBuy">Fecha de compra</label>
                                            <input
                                                id="dateOfBuy"
                                                name="dateOfBuy"
                                                type="date"
                                                defaultValue={selectedBook?.dateOfBuy || ""}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <h3 className="findauthor">Agregar autor al libro</h3>
                                <div className="input">
                                    <label htmlFor="author">Autor</label>
                                    <input id="author" name="author" type="text" placeholder="Buscar autor"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setSearchAuthor(value);
                                            onHandleFindAuthor(value);
                                        }} />
                                </div>



                                <div className="btns-row-container">
                                    <div className="flex-content">
                                        <div>
                                            <h4>Resultados</h4>
                                            <ul className="results-list">
                                                {results.map((author) => {
                                                    const authorKey = author.authorCode || author.AuthorId || author.id;

                                                    return (
                                                        <li key={authorKey} className="result-item">
                                                            <span>{author.Author?.name || author.name}</span>
                                                            <button
                                                                className="add-button"
                                                                type="button"
                                                                onClick={() => {
                                                                    if (!authorsSelected.some(a =>
                                                                        (a.authorCode || a.AuthorId || a.id) === authorKey
                                                                    )) {
                                                                        setAuthorsSelected([...authorsSelected, author]);
                                                                    }
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4>Autores seleccionados</h4>
                                            <div className="selected-authors">
                                                {authorsSelected.map((author) => {
                                                    const authorKey = author.authorCode || author.AuthorId || author.id;

                                                    return (
                                                        <div key={authorKey} className="selected-author">
                                                            <span>{author.Author?.name || author.name}</span>
                                                            <button
                                                                className="remove-button"
                                                                type="button"
                                                                onClick={() => {
                                                                    setAuthorsSelected(
                                                                        authorsSelected.filter(a =>
                                                                            (a.authorCode || a.AuthorId || a.id) !== authorKey
                                                                        )
                                                                    );
                                                                }}
                                                            >
                                                                ❌
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {successMessage && (
                                        <div className="success">
                                            <p>{successMessage}</p>
                                        </div>
                                    )}
                                </div>


                            </div>

                            <div className="contentformedit">
                                <div className="input">
                                    <label htmlFor="notes">Notas</label>
                                    <input
                                        id="notes"
                                        name="notes"
                                        type="text"
                                        className="notes"
                                        defaultValue={selectedBook?.notes || ""}
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="year">Año de edición</label>
                                    <input
                                        id="year"
                                        name="year"
                                        type="number"
                                        defaultValue={selectedBook?.yearEdition || ""}
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="numberEdition">Número de edición</label>
                                    <input
                                        id="numberEdition"
                                        name="numberEdition"
                                        type="number"
                                        defaultValue={selectedBook?.numberEdition || ""}
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="pages">Páginas</label>
                                    <input
                                        id="pages"
                                        name="pages"
                                        type="number"
                                        min={0}
                                        defaultValue={selectedBook?.pages || ""}
                                    />
                                </div>

                                <div className="input">
                                    <label htmlFor="codClas">Código clasificación</label>
                                    <input
                                        id="codClas"
                                        name="codClas"
                                        type="text"
                                        defaultValue={selectedBook?.codClas || ""}
                                    />
                                </div>
                                <div className="input">
                                    <label htmlFor="codeLing">Código lingüístico</label>
                                    <input
                                        id="codeLing"
                                        name="codeLing"
                                        type="text"
                                        placeholder="Código lingüístico"
                                        defaultValue={selectedBook?.codeLing || ""}
                                    />
                                </div>


                                <div className="input">
                                    <div>
                                        <label htmlFor="lost">Perdido  <span className="required">*</span></label>
                                        <select
                                            name="lost"
                                            value={selectedLost}
                                            onChange={(e) => setSelectedLost(e.target.value)}
                                            className="selectform"
                                            required
                                        >
                                            <option value="">Seleccione</option>
                                            <option value="true">Si</option>
                                            <option value="false">No</option>
                                        </select>
                                    </div>


                                    <div className="input">
                                        <div className="divconteiner content">
                                            <div>
                                                <label htmlFor="lossDate">Fecha de pérdida</label>
                                                <input
                                                    id="lossDate"
                                                    name="lossDate"
                                                    type="date"
                                                    defaultValue={selectedBook?.lossDate || ""}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="lostPartnerNumber">Núm. socio pérdida</label>
                                                <input
                                                    id="lostPartnerNumber"
                                                    name="lostPartnerNumber"
                                                    type="number"
                                                    placeholder="Número de socio"
                                                    defaultValue={selectedBook?.lostPartnerNumber || ""}
                                                />
                                            </div>



                                        </div>
                                    </div>


                                </div>
                            </div>


                        </div>

                        <div className="btns-row-container">
                            <div className="btns-row">
                                <Btn text="Guardar" className="changes btn" icon={<div className="img-ico"><img src={SaveIcon} alt="Guardar" /></div>} type="submit" variant="primary" />
                                <Btn
                                    text="Calcular signatura"
                                    className="secondary-btn"
                                    onClick={() => setPopupView('signature')}
                                    variant="primary"
                                />
                            </div>
                        </div>
                    </form>
                </>
            )}

            {popupView === "chooseAuthor" && (
                <>
                    <div className="books-author-container">
                        <BackviewBtn menu={"default"} changeView={setPopupView} />
                        <BookAuthors
                            selectedBook={selectedBook}
                        //authorsSelected={authorsSelected}
                        //setAuthorsSelected={setAuthorsSelected}
                        />
                    </div>
                </>
            )}

            {popupView === 'signature' && (
                <>
                    <div className="books-author-container">
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <BookAuthors
                            authorsSelected={authorsSelected}
                            setAuthorsSelected={setAuthorsSelected}
                        />
                    </div>
                </>
            )}
        </>
    );
}