import "./formAddbook.css";
import Btn from "../../common/btn/Btn.jsx";
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useState, useEffect } from "react";
import BackviewBtn from "../../common/backviewbtn/BackviewBtn.jsx";
import BookAuthors from "../BooksAuthor/BookAuthors.jsx";
import { useEntityManagerAPI } from "../../../hooks/useEntityManagerAPI.js";

export default function FormAddBook({ getItems }) {

    const [popupView, setPopupView] = useState('default');
    const [authorsSelected, setAuthorsSelected] = useState([]);
    const [selectedType, setSelectedType] = useState();
    const [successMessage, setSuccessMessage] = useState("");
    const [SearchAuthor, setSearchAuthor] = useState("");
    const entityManagerApi = useEntityManagerAPI("books");
    const [results, setResults] = useState([]);

    const { items: authors = [], getItems: getAuthors } = useEntityManagerAPI("authors");
    const { items: booksTypes = [], getItems: getBookTypes } = useEntityManagerAPI("book-types");

    const [bookForm, setBookForm] = useState({
        code: '',
        codeCDU1: '',
        title: '',
        ubication: '',
        quantity: '',
        editorial: '',
        type: '',
        translator: '',
        idSupplier: '',
        numfactura: '',
        dateOfBuy: '',
        notes: '',
        year: '',
        numberEdition: '',
        pages: '',
        codeLing: '',
        codClas: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookForm(prev => ({
            ...prev,
            [name]: value
        }));
    };



    useEffect(() => {
        if (SearchAuthor.trim() === "") {
            setResults([]);
            getAuthors({ authorName: "" });
        }
    }, [SearchAuthor]);

    async function onHandleFindAuthor() {
        try {
            if (SearchAuthor.trim() === "") {
                setResults([]);
                return;
            }

            const res = await getAuthors({ authorName: SearchAuthor });
            setResults(res);
        } catch (err) {
            console.error(err);
            setSuccessMessage("");
        }
    }
    const {
        items: bookAuthors,
        getItems: getBookAuthors,
        createItem: createBookAuthor,
        deleteItem: deleteBookAuthor,
        updateItem: updateBookAuthor
    } = useEntityManagerAPI("book-authors");

    useEffect(() => {
        getBookTypes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const data = new FormData(form);

        const newItem = {
            codeInventory: data.get("code"),
            codeCDU: data.get("codeCDU1"),
            title: data.get("title"),
            editorial: data.get("editorial"),
            numberEdition: Number(data.get("numberEdition")),
            yearEdition: Number(data.get("year")),
            translator: data.get("translator"),
            pages: data.get("pages"),
            ubication: data.get("ubication"),
            numberOfCopies: Number(data.get("quantity")),
            notes: data.get("notes"),
            type: Number(selectedType),
            codeLing: data.get("codeLing"),
            idSupplier: Number(data.get("idSupplier")),
            invoiceNumber: data.get("numfactura"),
            dateOfBuy: data.get("dateOfBuy"),
        };

        try {
            const createdBook = await entityManagerApi.createItem(newItem);
            console.log("Libro creado:", createdBook);

            if (authorsSelected.length > 0) {
                for (const author of authorsSelected) {
                    await createBookAuthor({
                        BookId: createdBook.BookId,
                        authorCode: author.id
                    });

                }
            }

            setSuccessMessage(" ✅ Libro guardado con exito");

            setTimeout(() => setSuccessMessage(""), 10000);

            await getItems();

            form.reset();
            setAuthorsSelected([]);
            setSelectedType("");

        } catch (err) {
            console.error(err);
            setSuccessMessage("❌ Error al guardar el libro");
            setTimeout(() => setSuccessMessage(""), 10000);
        }
    };

    return (
        <>
            {popupView === 'default' && (
                <>
                    <form className="formeditbook" onSubmit={handleSubmit}>
                        <div className="columns-container">

                            <div className="contentformedit">

                                <div className="input">
                                    <label>Codigo <span className="required">*</span></label>
                                    <input
                                        name="code"
                                        type="number"
                                        value={bookForm.code}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input">
                                    <label>Código CDU <span className="required">*</span></label>
                                    <input
                                        name="codeCDU1"
                                        type="number"
                                        value={bookForm.codeCDU1}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input">
                                    <label>Titulo <span className="required">*</span></label>
                                    <input
                                        name="title"
                                        type="text"
                                        value={bookForm.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input">
                                    <label>Ubicación <span className="required">*</span></label>
                                    <input
                                        name="ubication"
                                        type="text"
                                        value={bookForm.ubication}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input">
                                    <label>Cantidad <span className="required">*</span></label>
                                    <input
                                        name="quantity"
                                        type="number"
                                        value={bookForm.quantity}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input">
                                    <label>Editorial <span className="required">*</span></label>
                                    <input
                                        name="editorial"
                                        type="text"
                                        value={bookForm.editorial}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input">
                                    <label>Tipo <span className="required">*</span></label>
                                    <select
                                        name="type"
                                        value={bookForm.type}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Seleccione un tipo</option>
                                        {booksTypes.map(type => (
                                            <option key={type.bookTypeId} value={type.bookTypeId}>
                                                {type.typeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input">
                                    <label>Traductor <span className="required">*</span></label>
                                    <input
                                        name="translator"
                                        type="text"
                                        value={bookForm.translator}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input">
                                    <label>Numero de prov <span className="required">*</span></label>
                                    <input
                                        name="idSupplier"
                                        type="number"
                                        value={bookForm.idSupplier}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input">
                                    <label>Num factura <span className="required">*</span></label>
                                    <input
                                        name="numfactura"
                                        type="text"
                                        value={bookForm.numfactura}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input">
                                    <label>Fecha de compra <span className="required">*</span></label>
                                    <input
                                        name="dateOfBuy"
                                        type="date"
                                        value={bookForm.dateOfBuy}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* 🔴 ESTO NO SE TOCA */}
                                <h3 className="findauthor">Agregar autor al libro</h3>

                                <div className="input">
                                    <label>Autor</label>
                                    <input
                                        type="text"
                                        placeholder="Buscar autor"
                                        onChange={(e) => {
                                            setSearchAuthor(e.target.value);
                                            onHandleFindAuthor();
                                        }}
                                    />
                                </div>

                            </div>

                            <div className="contentformedit">

                                <div className="input">
                                    <label>Notas</label>
                                    <input
                                        name="notes"
                                        type="text"
                                        value={bookForm.notes}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="input">
                                    <label>Año de edición <span className="required">*</span></label>
                                    <input
                                        name="year"
                                        type="number"
                                        value={bookForm.year}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input">
                                    <label>Numero de edición <span className="required">*</span></label>
                                    <input
                                        name="numberEdition"
                                        type="text"
                                        value={bookForm.numberEdition}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input">
                                    <label>Páginas <span className="required">*</span></label>
                                    <input
                                        name="pages"
                                        type="number"
                                        value={bookForm.pages}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="input">
                                    <label>Codigo linguistico</label>
                                    <input
                                        name="codeLing"
                                        type="text"
                                        value={bookForm.codeLing}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="input">
                                    <label>Código clasificación</label>
                                    <input
                                        name="codClas"
                                        type="text"
                                        value={bookForm.codClas}
                                        onChange={handleInputChange}
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="btns-row-container">
                            <div className="flex-content">
                                <div>
                                    <h4>Resultados</h4>
                                    <ul className="results-list">
                                        {results.map((author) => (
                                            <li key={author.id} className="result-item">
                                                <span>{author.name}</span>
                                                <button
                                                    className="add-button"
                                                    type="button"
                                                    onClick={() => {
                                                        if (!authorsSelected.some(a => a.id === author.id)) {
                                                            setAuthorsSelected([...authorsSelected, author]);
                                                        }
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4>Autores seleccionados</h4>
                                    <div className="selected-authors">
                                        {authorsSelected.map((author) => (
                                            <div key={author.id} className="selected-author">
                                                {author.name}
                                                <button
                                                    className="remove-button"
                                                    onClick={() => {
                                                        setAuthorsSelected(authorsSelected.filter(a => a.id !== author.id));
                                                    }}
                                                >
                                                    ❌
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            {successMessage && (
                                <div className="success">
                                    <p> {successMessage}</p>
                                </div>
                            )}

                            <div className="btns-row">
                                <Btn
                                    text="Guardar"
                                    className="changes btn"
                                    icon={<div className="img-ico"><img src={SaveIcon} alt="Guardar" /></div>}
                                    type="submit"
                                    variant="primary"
                                />

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
