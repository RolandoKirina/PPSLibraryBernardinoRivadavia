import "./formAddbook.css";
import Btn from "../btn/Btn.jsx";
import SaveIcon from '../../assets/img/save-icon.svg';

export default function FormEditBook(){

    let title ="Libros";
    function redirect(action){
         switch(action){
            case 'renewed':{
                window.open(`${window.location.origin}/loans/renewes`, '_blank',title);
            }
            case 'authors':{
                window.open(`${window.location.origin}/books/authors`, '_blank',title)
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
        <form className="formeditbook">
            <div className="contentformedit">

                <div className="input">
                    <label htmlFor="code">Codigo</label>
                    <input id="code" type="number" placeholder="Codigo"/>
                </div>
                

               <div className="input margininput">
                <div className="content content-form">
                        <div>
                            <div>
                                <label htmlFor="codeCDU1">Código CDU </label>

                            </div>
                            <div>   
                                 <input id="codeCDU1" type="number" />
                                <input id="codeCDU1" type="number" />
                            </div>
                           

                        </div>
                       
                </div>
                </div>

                <div className="input">
                    <label htmlFor="title">Titulo</label>
                    <input id="title" type="text" placeholder="Titulo"/>
                </div>

                <div className="input">
                    
                    <div className="divconteiner content">
                        <div>
                            <label htmlFor="title">Ubicación</label>
                            <input id="ubication" type="text" placeholder="Ubicacion" />
                        </div>
                        <div>
                            <label htmlFor="title">Cantidad</label>
                            <input id="quantity" type="number" placeholder="Cantidad"/>
                        </div>
                    </div>
                </div>
                <div className="input">
                     <div className="divconteiner content">
                        <div>
                            <label htmlFor="editorial">Editorial</label>
                            <input id="editorial" type="text" placeholder="Editorial" />
                        </div>
                        <div>
                             <label htmlFor="type">Tipo</label>
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
                             <label htmlFor="type">Fecha de</label>
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
                            <label htmlFor="numfactura">Fecha de compra</label>
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
                
                
                <div className="input" >
                        <label htmlFor="notes" >Notas</label>
                        <input id="notes" type="text" className="notes" />
                </div>
                
                <div className="input" >
                        <label htmlFor="year" >Año de edición</label>
                        <input id="year" type="date" />
                </div>

                <div className="input" >
                        <label htmlFor="number" >Numero de edición</label>
                        <input id="number" type="text" />
                </div>
                <div className="input" >
                        <label htmlFor="pages" >Páginas</label>
                        <input id="pages" type="text" />
                </div>

                <div className="btns-form">
                
                    <div>
                        <Btn text="Autores del libro" className="secondary-btn" onClick={() => redirect('booksauthor')}  />
                        <Btn text="Ver reservas" className="secondary-btn" onClick={() => redirect('renewed')} />
                    </div>
                    <div>
                        <Btn text="Calcular signatura" className="secondary-btn" onClick={()=> redirect('signature')} />
                        <Btn text="Ver autores" className="secondary-btn" onClick={() => redirect('authors')} />
                    </div>
                </div>

                {/* 👇 Botón "Guardar" alineado a la derecha */}
                <div className="btn-right">
                    <Btn
                        text="Guardar"
                        className="changes btn"
                        icon={
                            <div className="img-ico">
                                <img src={SaveIcon} alt="Guardar" />
                            </div>
                        }
                    />
                </div>
            </div>
                
            

          
                
        </form>


         
        </>

        )

}
