import "./formAddbook.css";
import Btn from "../../common/btn/Btn.jsx";
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useState, useEffect } from "react";
import BackviewBtn from "../../common/backviewbtn/BackviewBtn.jsx";
import BookAuthors from "../BooksAuthor/BookAuthors.jsx";
import { useEntityManagerAPI } from "../../../hooks/useEntityManagerAPI.js";

export default function FormAddBook() {

    const [popupView, setPopupView] = useState('default');
    const [authorsSelected, setAuthorsSelected] = useState([]);
    const [selectedType, setSelectedType] = useState();
    const [successMessage, setSuccessMessage] = useState("");
    const [SearchAuthor, setSearchAuthor]= useState("");
    const entityManagerApi = useEntityManagerAPI("books");
    const [results, setResults] = useState([]);

  const {items: authors = [], getItems: getAuthors} = useEntityManagerAPI("authors");
    const {items: booksTypes = [],getItems: getBookTypes} = useEntityManagerAPI("book-types");
    
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
                    console.log(author);
                    await createBookAuthor({
                    BookId: createdBook.BookId,
                    authorCode: author.id
                });
                
                }
            }

            setSuccessMessage(" ✅ Libro guardado con exito");
           
            setTimeout(() => setSuccessMessage(""), 10000);

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
                                    <label htmlFor="code">
                                        Codigo <span className="required">*</span>
                                    </label>
                                    <input id="code" name="code" type="number" placeholder="Codigo" required />
                                </div>

                                <div className="input">
                                    <div className="cdu">
                                        <label htmlFor="codeCDU1">
                                            Código CDU <span className="required">*</span>
                                        </label>
                                        <div className="cdu-options">
                                            <input name="codeCDU1" type="number" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="input">
                                    <label htmlFor="title">
                                        Titulo <span className="required">*</span>
                                    </label>
                                    <input id="title" name="title" type="text" placeholder="Titulo" required />
                                </div>

                                <div className="input">
                                    <div className="divconteiner content">
                                        <div>
                                            <label htmlFor="ubication">
                                                Ubicación <span className="required">*</span>
                                            </label>
                                            <input id="ubication" name="ubication" type="text" placeholder="Ubicacion" required />
                                        </div>
                                        <div>
                                            <label htmlFor="quantity">
                                                Cantidad <span className="required">*</span>
                                            </label>
                                            <input id="quantity" name="quantity" type="number" placeholder="Cantidad" required maxLength={3} />
                                        </div>
                                    </div>
                                </div>

                                <div className="input">
                                    <div className="divconteiner content">
                                        <div>
                                            <label htmlFor="editorial">
                                                Editorial <span className="required">*</span>
                                            </label>
                                            <input id="editorial" name="editorial" type="text" placeholder="Editorial" required />
                                        </div>
                                        <div>
                                            <label htmlFor="type">
                                                Tipo <span className="required">*</span>
                                            </label>
                                            <select
                                                name="type"
                                                id="type"
                                                className="selectform"
                                                value={selectedType || ""}
                                                onChange={(e) => setSelectedType(e.target.value)}
                                                required
                                            >
                                                <option value="">Seleccione un tipo</option>
                                                {booksTypes.map((type) => (
                                                    <option key={type.bookTypeId} value={type.bookTypeId}>
                                                        {type.typeName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="input">
                                    <label htmlFor="translator">Traductor <span className="required">*</span></label>
                                    <input id="translator" name="translator" type="text" placeholder="Traductor" required />
                                </div>

                                <div className="input">
                                    <div className="divconteiner content">
                                        <div>
                                            <label htmlFor="idSupplier">Numero de prov <span className="required">*</span></label>
                                            <input id="idSupplier" name="idSupplier" type="number" placeholder="Numero de prov" required />
                                        </div>
                                        <div>
                                            <label htmlFor="numfactura">Num factura <span className="required">*</span></label>
                                            <input id="numfactura" name="numfactura" type="text" placeholder="Numero de factura" required />
                                        </div>
                                    </div>
                                    <div className="input">
                                        <label htmlFor="dateOfBuy">Fecha de compra <span className="required">*</span></label>
                                        <input id="dateOfBuy" name="dateOfBuy" type="date" required />
                                    </div>
                                </div>

                                    <h3 className="findauthor">Agregar autor al libro</h3>
                                        <div className="input">
                                            <label htmlFor="author">Autor</label>
                                            <input id="author" name="author" type="text" placeholder="Buscar autor" 
                                            onChange={(e) => {
                                                setSearchAuthor(e.target.value);
                                                onHandleFindAuthor();
                                            }}/>
                                        </div>
                              
                            </div>
                                                                


                           
                            <div className="contentformedit">
                                    <div className="input">
                                        <label htmlFor="notes">Notas</label>
                                        <input id="notes" name="notes" type="text" className="notes" />
                                    </div>

                                    <div className="input">
                                        <label htmlFor="year">Año de edición <span className="required">*</span></label>
                                        <input id="year" name="year" type="number" min="1850" max="2035" required />
                                    </div>

                                    <div className="input">
                                        <label htmlFor="number">Numero de edición <span className="required">*</span></label>
                                        <input id="numberEdition" name="numberEdition" type="text" required maxLength={4} />
                                    </div>

                                    <div className="input">
                                        <label htmlFor="pages">Páginas <span className="required">*</span></label>
                                        <input id="pages" name="pages" type="number" required />
                                    </div>

                                    <div className="input">
                                        <label htmlFor="codeLing">Codigo linguistico</label>
                                        <input id="codeLing" name="codeLing" type="text" placeholder="Codigo linguistico" />
                                    </div>
                                      <div className="input">
                                        <label htmlFor="codClas">Código clasificación</label>
                                        <input
                                            id="codClas"
                                            name="codClas"
                                            type="text"
                                            placeholder="Codigo clasificación"
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
