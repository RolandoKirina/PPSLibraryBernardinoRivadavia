import "./formAddbook.css";
import Btn from "../../common/btn/Btn.jsx";
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useState } from "react";
import BackviewBtn from "../../common/backviewbtn/BackviewBtn.jsx";
import BookAuthors from "../BooksAuthor/BookAuthors.jsx";

export default function FormEditBook(){
    const [popupView, setPopupView] = useState('default');
    const [authorsSelected, setAuthorsSelected] = useState([]);


    let title ="Libros";
    function redirect(action){
         switch(action){
            case 'renewed':{
                window.open(`${window.location.origin}/loans/renewes`, '_blank',title);
            }
            case 'authors':{
                window.open(`${window.location.origin}/authors`, '_blank',title)
            }
            case 'booksauthor':{
                window.open(`${window.location.origin}/books/booksauthor`, '_blank',title)
            }
            case 'signature':{
                window.open(`${window.location.origin}/books/signature`, '_blank',title)
            }
        }   
    }
    return(
        <>
   {popupView === 'default' && (
        <>
            <form className="formeditbook">
            <div className="contentformedit">

                <div className="input">
                <label htmlFor="code">
                    Codigo <span className="required">*</span>
                </label>
                <input id="code" type="number" placeholder="Codigo"/>
                </div>
                
                <div className="input">
                <div className="cdu">
                    <label htmlFor="codeCDU1">
                    Código CDU <span className="required">*</span>
                    </label>
                    <div className="cdu-options">   
                    <input name="codeCDU1" type="number" />
                    <input name="codeCDU1" type="number" />
                    </div>
                </div>
                </div>

                <div className="input">
                <label htmlFor="title">
                    Titulo <span className="required">*</span>
                </label>
                <input id="title" type="text" placeholder="Titulo"/>
                </div>

                <div className="input">
                <div className="divconteiner content">
                    <div>
                    <label htmlFor="ubication">
                        Ubicación <span className="required">*</span>
                    </label>
                    <input id="ubication" type="text" placeholder="Ubicacion" />
                    </div>
                    <div>
                    <label htmlFor="quantity">
                        Cantidad <span className="required">*</span>
                    </label>
                    <input id="quantity" type="number" placeholder="Cantidad"/>
                    </div>
                </div>
                </div>

                <div className="input">
                <div className="divconteiner content">
                    <div>
                    <label htmlFor="editorial">
                        Editorial <span className="required">*</span>
                    </label>
                    <input id="editorial" type="text" placeholder="Editorial" />
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
                <input id="translator" type="text" placeholder="Traductor"/>
                </div>

                <div className="input">
                <div className="divconteiner content">
                    <div>
                    <label htmlFor="prov">Numero de prov</label>
                    <input id="prov" type="number" placeholder="Numero de prov" />
                    </div>
                    <div>
                    <label htmlFor="numfactura">Num factura</label>
                    <input id="numfactura" type="text" placeholder="Numero de factura" />
                    </div>
                    <div>
                    <label htmlFor="dateof">Fecha de</label>
                    <input id="dateof" type="date" placeholder="Fecha de" />
                    </div>
                </div>
                </div>

                <div className="line"></div>
                
                <div className="input">
                <div className="divconteiner checkbox">
                    <input id="Lost" type="checkbox" placeholder="Perdido"  />
                    <label htmlFor="Lost" className="checkboxin">Perdido</label>
                </div>
                </div>

                <div className="input">
                <div className="divconteiner content">
                    <div>
                    <label htmlFor="prov">Numero de socio</label>
                    <input id="prov" type="number" placeholder="Numero de prov" />
                    </div>
                    <div>
                    <label htmlFor="dateofbuy">Fecha de compra</label>
                    <select name="type" id="dateofbuy" className="selectform">
                        <option value="1">opcion 1</option>
                        <option value="2">opcion 2</option>
                        <option value="3">opcion 3</option>
                    </select>
                    </div>
                </div>
                </div>   

            </div>
            
            <div className="contentformedit">
                <div className="input">
                <label htmlFor="notes">Notas</label>
                <input id="notes" type="text" className="notes" />
                </div>
                
                <div className="input">
                <label htmlFor="year">Año de edición</label>
                <input id="year" type="date" />
                </div>

                <div className="input">
                <label htmlFor="number">Numero de edición</label>
                <input id="number" type="text" />
                </div>
                <div className="input">
                <label htmlFor="pages">Páginas</label>
                <input id="pages" type="text" />
                </div>

                <div className="btns-form">
                <div>
                    <Btn text="Autores del libro" className="secondary-btn" onClick={() => setPopupView('chooseAuthor')} variant="primary"  />
                    <Btn text="Ver reservas" className="secondary-btn" onClick={() => redirect('renewed')} variant="primary"/>
                </div>
                <div>
                    <Btn text="Ver autores" className="secondary-btn" onClick={() => redirect('authors')}variant="primary" />
                </div>
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
                    variant="primary"
                    />
                </div>
                </div>
            </div>
            </form>
        </>
        )}

            {popupView === 'chooseAuthor' && (
                <>
                <div className='books-author-container'>
                    <BackviewBtn menu={'default'} changeView={setPopupView}/>
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
