import "./feefiltercheckbox.css";
export default function BookFilter() {


      return (
        <aside className="book-filter-aside">
            
        
        <div className="book-filter-form">
            
            <form>
                
                <h3 className='titleh3'>Filtro de socios</h3>

                 <div className="book-form-input-group">


                <div className="feefiltercheckbox">
                     <input type="checkbox" />
                     <label> Solo socios con cuotas impagas </label>
                </div>
                   
                </div>

                <div className="book-form-input-group">
                    <label>Buscar por apellido </label>
                    <input type="text" />
                </div>

                <div className="book-form-input-group">
                    <label>Buscar por nombre </label>
                    <input type="text" />
                </div>    


                  <div className="book-form-input-group">
                    <label className="color-secondary">Cantidad de cuotas pagas: 0 </label>
                  </div>    

                  <div className="book-form-input-group">
                    <label >Fecha de pago</label>
                                        <input type="date" />

                  </div>    
            </form>
        </div>
        </aside>
    
    )
}