import Btn from "../../../components/common/btn/Btn.jsx";
import SaveIcon from '../../../assets/img/save-icon.svg';
import Accordion from "../../generic/accordion/Accordion.jsx";
import { useState } from "react";
import "./FormEditPartner.css";
import BackviewBtn from "../../common/backviewbtn/BackviewBtn.jsx";
import UnpaidFees from "../../loan-components/unpaidfees/UnpaidFees.jsx";

export default function FormEditPartner() {
  const options = ["default", "unpaidfees", "pendingbooks"];
  const [popupView, setPopupView] = useState(options[0]);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const [formValues, setFormValues] = useState({});

  const handleToggle = (id) => {
    setActiveAccordion(prev => prev === id ? null : id);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // manejo de checkboxes múltiples
    if (type === "checkbox") {
      if (e.target.closest(".checkbox-group")) {
        setFormValues((prev) => {
          const current = prev[name] || [];
          if (checked) {
            return { ...prev, [name]: [...current, value] };
          } else {
            return { ...prev, [name]: current.filter((v) => v !== value) };
          }
        });
      } else {
        setFormValues((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    });

    console.log("FormData values:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    console.log("Raw formValues object:", formValues);
  };

  function renderView() {
    switch (popupView) {
      case "unpaidfees":
        return (
          <div>
            <UnpaidFees />
            <BackviewBtn menu={'default'} changeView={setPopupView} />
          </div>
        );

      case "pendingbooks":

        /* libros pendientes es una tabla con las columnas: 
        Codigo de libro, titulo, fecha retiro, fecha prevista, fecha devolucion, renovacion (cantidad de renovaciones, devuelto (si/no)),
  
        con los accesors:
        bookCode, bookTitle, retiredDate, expectedDate, returnedDate, renewes, returned
        
        */
        return (
          <form onSubmit={handleSubmit}>
            <Accordion
              title="Libros pendientes"
              isActive={activeAccordion === 'pendingbooks'}
              onToggle={() => handleToggle('pendingbooks')}
            >
              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="booktitle">Título del libro</label>
                  <input id="booktitle" name="booktitle" type="text" placeholder="Ingrese el título" onChange={handleChange} />
                </div>

                <div className="form-details">
                  <label htmlFor="duedate">Fecha de vencimiento</label>
                  <input id="duedate" name="duedate" type="date" onChange={handleChange} />
                </div>
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="daysdelayed">Días de atraso</label>
                  <input id="daysdelayed" name="daysdelayed" type="number" placeholder="Cantidad de días" onChange={handleChange} />
                </div>
              </div>

            </Accordion>
            <BackviewBtn menu={'default'} changeView={setPopupView} />
          </form>
        );

      default:
        return (
          <form onSubmit={handleSubmit}>
            <Accordion
              title="Datos personales"
              isActive={activeAccordion === 'personaldata'}
              onToggle={() => handleToggle('personaldata')}>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="name" className="title-name">Nombre <span className='required'>*</span></label>
                  <input id="name" name="name" type="text" placeholder="Ingrese su nombre" onChange={handleChange} />
                </div>

                <div className="form-details">
                  <label htmlFor="surname">Apellido <span className='required'>*</span></label>
                  <input id="surname" name="surname" type="text" placeholder="Ingrese su apellido" onChange={handleChange} />
                </div>


              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="dateofbirthday">Fecha de nacimiento <span className='required'>*</span></label>
                  <input id="dateofbirthday" name="dateofbirthday" type="date" onChange={handleChange} />
                </div>

                <div className="form-details">
                  <label htmlFor="typeofdni">Tipo de documento <span className='required'>*</span></label>
                  <select id="typeofdni" name="typeofdni" defaultValue="" onChange={handleChange}>
                    <option value="" disabled>Seleccione un tipo</option>
                    <option value="dni">DNI</option>
                    <option value="le">LE (Libreta de Enrolamiento)</option>
                    <option value="lc">LC (Libreta Cívica)</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="DNI">DNI <span className='required'>*</span></label>
                  <input id="DNI" name="DNI" type="number" placeholder="Ingrese su DNI" onChange={handleChange} />
                </div>

                <div className="form-details">
                  <label htmlFor="dateofinscription">Fecha de inscripción <span className='required'>*</span></label>
                  <input id="dateofinscription" name="dateofinscription" type="date" onChange={handleChange} />
                </div>
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="profession">Profesión <span className='required'>*</span></label>
                  <input id="profession" name="profession" type="text" placeholder="Ingrese su profesión" onChange={handleChange} />
                </div>

                <div className="form-details">
                  <label htmlFor="presentedby">Presentado por <span className='required'>*</span></label>
                  <input id="presentedby" name="presentedby" type="text" placeholder="Presentado por" onChange={handleChange} />
                </div>
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="maritalstatus">Estado civil <span className='required'>*</span></label>
                  <select id="maritalstatus" name="maritalstatus" defaultValue="" onChange={handleChange}>
                    <option value="" disabled>Seleccione un estado</option>
                    <option value="soltero">Soltero/a</option>
                    <option value="casado">Casado/a</option>
                    <option value="divorciado">Divorciado/a</option>
                    <option value="viudo">Viudo/a</option>
                    <option value="union">Unión convivencial</option>
                  </select>
                </div>

                <div className="form-details">
                  <label htmlFor="category">Categoría <span className='required'>*</span></label>
                  <select id="category" name="category" defaultValue="" onChange={handleChange}>
                    <option value="" disabled>Seleccione una categoría</option>
                    <option value="regular">Regular</option>
                    <option value="honorario">Honorario</option>
                    <option value="protector">Protector</option>
                    <option value="socio">Socio</option>
                  </select>
                </div>
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="nacionality">Nacionalidad <span className='required'>*</span></label>
                  <input id="nacionality" name="nacionality" type="text" placeholder="Nacionalidad" onChange={handleChange} />
                </div>
              </div>
            </Accordion>

            <Accordion
              title="Contacto particular"
              isActive={activeAccordion === 'privatecontact'}
              onToggle={() => handleToggle('privatecontact')}>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="address">Dirección <span className='required'>*</span></label>
                  <input id="address" name="address" type="text" placeholder="Ingrese su dirección" onChange={handleChange} />
                </div>

                <div className="form-details">
                  <label htmlFor="phone">Teléfono <span className='required'>*</span></label>
                  <input id="phone" name="phone" type="tel" placeholder="Ingrese su teléfono" onChange={handleChange} />
                </div>
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="locality">Localidad <span className='required'>*</span></label>
                  <select id="locality" name="locality" defaultValue="" onChange={handleChange}>
                    <option value="" disabled>Seleccione una localidad</option>
                    <option value="caba">Ciudad Autónoma de Buenos Aires</option>
                    <option value="cordoba">Córdoba</option>
                    <option value="rosario">Rosario</option>
                    <option value="mendoza">Mendoza</option>
                    <option value="la_plata">La Plata</option>
                    <option value="san_miguel">San Miguel</option>
                    <option value="mar_del_plata">Mar del Plata</option>
                    <option value="tucuman">San Miguel de Tucumán</option>
                  </select>
                </div>

                <div className="form-details">
                  <label htmlFor="postalcode">Código postal <span className='required'>*</span></label>
                  <input id="postalcode" name="postalcode" type="text" placeholder="Ingrese el código postal" onChange={handleChange} />
                </div>
              </div>
            </Accordion>

            <Accordion
              title="Cobro"
              isActive={activeAccordion === 'collection'}
              onToggle={() => handleToggle('collection')}>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="collectionaddress">Direcciones de cobro <span className='required'>*</span></label>
                  <input id="collectionaddress" name="collectionaddress" type="text" placeholder="Ingrese la dirección de cobro" onChange={handleChange} />
                </div>

                <div className="form-details">
                  <label htmlFor="collectiontime">Hora preferida <span className='required'>*</span></label>
                  <input id="collectiontime" name="collectiontime" type="datetime-local" placeholder="Ingrese su hora de cobro" onChange={handleChange} />
                </div>
              </div>
            </Accordion>

            <Accordion
              title="Estado del socio"
              isActive={activeAccordion === 'stateofpartner'}
              onToggle={() => handleToggle('stateofpartner')}>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="reasonofwithdrawal">Motivo de baja</label>
                  <input
                    id="reasonofwithdrawal"
                    name="reasonofwithdrawal"
                    type="text"
                    placeholder="Motivo de baja"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-details">
                  <label htmlFor="dateofwithdrawal">Fecha de baja</label>
                  <input
                    id="dateofwithdrawal"
                    name="dateofwithdrawal"
                    type="date"
                    placeholder="Ingrese su fecha de baja"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="resignationdate">Fecha de renuncia</label>
                  <input
                    id="resignationdate"
                    name="resignationdate"
                    type="date"
                    placeholder="Ingrese su fecha de renuncia"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-details ">
                  <label htmlFor="observations">Observaciones</label>
                  <input
                    id="observations"
                    name="observations"
                    type="text"
                    className="inputobservations"
                    placeholder="Ingrese sus observaciones"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details-checkbox">
                  <label>Estado del socio</label>
                  <div className="checkbox-group">
                    <label htmlFor="active" className="label">
                      <input
                        className="checkbox-size"
                        type="checkbox"
                        id="active"
                        name="estado"
                        value="activo"
                        onChange={handleChange}
                      />
                      <p>Activo</p>
                    </label>

                    <label htmlFor="inactive" className="label">
                      <input
                        className="checkbox-size"
                        type="checkbox"
                        id="inactive"
                        name="estado"
                        value="baja"
                        onChange={handleChange}
                      />
                      <p>Baja</p>
                    </label>
                  </div>
                </div>

                <div className="partner-state-btns">
                  <Btn
                    text="Cuotas impagas"
                    variant="secondary"
                    onClick={() => setPopupView("unpaidfees")}
                  />

                  <Btn
                    text="Libros pendientes"
                    variant="secondary"
                    onClick={() => setPopupView("pendingbooks")}
                  />
                </div>

              </div>
            </Accordion>
            <Accordion
              title="Guardar socio"
              isActive={activeAccordion === 'savepartner'}
              onToggle={() => handleToggle('savepartner')}>
              <div className="btn-list-formeditpartner">
                <div>
                  <Btn
                    text="Guardar"
                    type="submit"
                    icon={
                      <div className="img-ico">
                        <img src={SaveIcon} alt="Guardar" />
                      </div>
                    }
                    variant="primary"
                  />
                </div>
              </div>
            </Accordion>

          </form>
        );
    }
  }

  return (
    <div className="form-edit-partner">
      {renderView()}
    </div>
  );
}
