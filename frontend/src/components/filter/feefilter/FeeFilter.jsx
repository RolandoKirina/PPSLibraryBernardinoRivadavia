import "./feefiltercheckbox.css";
export default function BookFilter({formData, onChange, filteredfees
}) {


  return (
    <aside className="book-filter-aside">


      <div className="book-filter-form">

        <form>

          <h3 className='titleh3'>Filtro de socios</h3>

          <div className="book-form-input-group">

            <div className="feefiltercheckbox">
              <input type="checkbox"  name="partnerWithUnpaidFees" 
              checked={formData.partnerWithUnpaidFees} onChange={(e) =>
                  onChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked,
                    },
                  })}/>
              <label> Solo socios con cuotas impagas </label>
            </div>

          </div>

          <div className="book-form-input-group">
            <label>Buscar por apellido </label>
            <input type="text"  name="surname"value={formData.surname} onChange={onChange}/>
          </div>

          <div className="book-form-input-group">
            <label>Buscar por nombre </label>
            <input type="text"  name="name" value={formData.name} onChange={onChange}/>
          </div>


          <div className="book-form-input-group">
            <label className="color-secondary"> Cantidad de cuotas pagas:{filteredfees?.[0]?.quantitypaidfees ?? 0}</label>
          </div>

          <div className="book-form-input-group">
            <label >Fecha de pago</label>
            <input type="date" name="PaymentDate" value={formData.PaymentDate}  onChange={onChange}/>
          </div>

        </form>
      </div>
    </aside>

  )
}