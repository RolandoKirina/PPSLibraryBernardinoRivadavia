import "./formAddbook.css";
import Btn from "../../common/btn/Btn.jsx";
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useState } from "react";
import BackviewBtn from "../../common/backviewbtn/BackviewBtn.jsx";
import BookAuthors from "../BooksAuthor/BookAuthors.jsx";
import { useEntityManagerAPI } from "../../../hooks/useEntityManagerAPI.js";

export default function FormEditBook() {
    const [popupView, setPopupView] = useState('default');
    const [authorsSelected, setAuthorsSelected] = useState([]);
    const entityManagerApi = useEntityManagerAPI("books");
    let title = "Libros";

    function redirect(action) {
        switch (action) {
            case 'renewed': {
                window.open(`${window.location.origin}/loans/renewes`, '_blank', title);
            }
            case 'authors': {
                window.open(`${window.location.origin}/authors`, '_blank', title)
            }
            case 'booksauthor': {
                window.open(`${window.location.origin}/books/booksauthor`, '_blank', title)
            }
            case 'signature': {
                window.open(`${window.location.origin}/books/signature`, '_blank', title)
            }
        }
    }

     const handleSubmit = async (e)=>{
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
            codeClasification: data.get("ubication"),
            numberOfCopies: Number(data.get("quantity")),
            notes: data.get("notes"),
            type: Number(data.get("type")),
            codeLing: data.get("codeLing"), 
            idSupplier: Number(data.get("idSupplier")),
            invoiceNumber: data.get("numfactura"),
            dateOfBuy: data.get("dateOfBuy"),

            }
                
      
            try {
                const created = await entityManagerApi.createItem(newItem);
                if (created) {
                alert("Agregado con éxito");
                }
            } catch (error) {
                alert("Sin éxito");
                console.error("Error al crear libro:", error);
            }
    };
    
    return (
        <>
            {popupView === 'default' && (
                <>
                    <form className="formeditbook" onSubmit={handleSubmit}>
                        <div className="contentformedit">

                            <div className="input">
                                <label htmlFor="code">
                                    Codigo <span className="required">*</span>
                                </label>
                                <input id="code" name="code" type="number" placeholder="Codigo" />
                            </div>

                            <div className="input">
                                <div className="cdu">
                                    <label htmlFor="codeCDU1">
                                        Código CDU <span className="required">*</span>
                                    </label>
                                    <div className="cdu-options">
                                        <input name="codeCDU1" type="number" />
                                    </div>
                                </div>
                            </div>

                            <div className="input">
                                <label htmlFor="title">
                                    Titulo <span className="required">*</span>
                                </label>
                                <input id="title" name="title" type="text" placeholder="Titulo" />
                            </div>

                            <div className="input">
                                <div className="divconteiner content">
                                    <div>
                                        <label htmlFor="ubication">
                                            Ubicación <span className="required">*</span>
                                        </label>
                                        <input id="ubication" name="ubication" type="text" placeholder="Ubicacion" />
                                    </div>
                                    <div>
                                        <label htmlFor="quantity">
                                            Cantidad <span className="required">*</span>
                                        </label>
                                        <input id="quantity" name="quantity"type="number" placeholder="Cantidad" />
                                    </div>
                                </div>
                            </div>

                            <div className="input">
                                <div className="divconteiner content">
                                    <div>
                                        <label htmlFor="editorial">
                                            Editorial <span className="required">*</span>
                                        </label>
                                        <input id="editorial" name="editorial" type="text" placeholder="Editorial" />
                                    </div>
                                    <div>
                                        <label htmlFor="type">
                                            Tipo <span className="required">*</span>
                                        </label>
                                        <select name="type" id="type" className="selectform">
                                            <option value="1">opcion 1</option>
                                            <option value="2">opcion 2</option>
                                            <option value="3">opcion 3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="input">
                                <label htmlFor="translator">Traductor</label>
                                <input id="translator" name="translator" type="text" placeholder="Traductor" />
                            </div>

                            <div className="input">
                                <div className="divconteiner content">
                                    <div>
                                        <label htmlFor="idSupplier">Numero de prov</label>
                                        <input id="idSupplier" name="idSupplier"type="number" placeholder="Numero de prov" />
                                    </div>
                                    <div>
                                        <label htmlFor="numfactura">Num factura</label>
                                        <input id="numfactura" name="numfactura" type="text" placeholder="Numero de factura" />
                                    </div>
                                    <div>
                                        <label htmlFor="dateOfBuy">Fecha de compra</label>
                                        <input id="dateOfBuy" name="dateOfBuy" type="date" placeholder="Fecha de" />
                                    </div>
                                    
                                </div>
                            </div>


                        </div>

                        <div className="contentformedit">
                            <div className="input">
                                <label htmlFor="notes">Notas</label>
                                <input id="notes" name="notes" type="text" className="notes" />
                            </div>

                            <div className="input">
                                <label htmlFor="year">Año de edición</label>
                                <input id="year" name="year" type="date" />
                            </div>

                            <div className="input">
                                <label htmlFor="number">Numero de edición</label>
                                <input id="numberEdition" name="numberEdition"type="text" />
                            </div>
                            <div className="input">
                                <label htmlFor="pages">Páginas</label>
                                <input id="pages" name="pages" type="text" />
                            </div>
                            <div className="input">
                                <label htmlFor="codeLing">Codigo linguistico</label>
                                <input id="codeLing"  name="codeLing" type="date" placeholder="Codigo linguistico" />
                            </div>


                              <div>
                                <div className="btn-right">
                                        <Btn
                                            text="Guardar"
                                            className="changes btn"
                                            icon={
                                                <div className="img-ico">
                                                    <img src={SaveIcon} alt="Guardar" />
                                                </div>
                                            }
                                            type="submit"
                                            variant="primary"
                                        />
                                    </div>
                               </div>
                            <div className="btns-form">
                                <div>
                                    <Btn text="Autores del libro" className="secondary-btn" onClick={() => setPopupView('chooseAuthor')} variant="primary" />
                                    <Btn text="Ver reservas" className="secondary-btn" onClick={() => redirect('renewed')} variant="primary" />
                                </div>
                                <div>
                                    <Btn text="Ver autores" className="secondary-btn" onClick={() => redirect('authors')} variant="primary" />
                                </div>
                            </div>
                        </div>
                      
                          
                    </form>
                </>
            )}

            {popupView === 'chooseAuthor' && (
                <>
                    <div className='books-author-container'>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <BookAuthors
                            authorsSelected={authorsSelected}
                            setAuthorsSelected={setAuthorsSelected}
                        />
                    </div>

                </>
            )}



        </>

    )

}
