import "./formeditbook.css";


export default function FormEditBook(){
    return(
        <>
        <form className="formeditbook">
            <div className="contentformedit">

                <div className="input">
                    <label htmlFor="code">Codigo</label>
                    <input id="code" type="number" placeholder="Codigo"/>
                </div>
                

               <div className="input">
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
            </div>
        </form>
        </>
    )

}