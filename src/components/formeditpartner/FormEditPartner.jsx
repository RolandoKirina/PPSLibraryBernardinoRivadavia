import Btn from "../../components/btn/Btn.jsx";
import SaveIcon from '../../assets/img/save-icon.svg';
import Accordion from "../generic/accordion/Accordion.jsx";
import { useState } from "react";
import "./FormEditPartner.css";
export default function FormEditPartner() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleToggle = (id) => {
    setActiveAccordion(prev => prev === id ? null : id);
  };

  return (
    <form>
      <Accordion
        title="Datos personales"
        isActive={activeAccordion === 'personaldata'}
        onToggle={() => handleToggle('personaldata')}>

        <div className="items-info-details-form-accordion">
            <div className="form-details">
              <label htmlFor="name" className="title-name">Nombre</label>
              <input id="name" name="name" type="text" placeholder="Ingrese su nombre" />
            </div>

            <div className="form-details">
              <label htmlFor="surname">Apellido</label>
              <input id="surname" name="surname" type="text" placeholder="Ingrese su apellido" />
            </div>

            <div className="form-details">
              <label htmlFor="dateofbirthday">Fecha de nacimiento</label>
              <input id="dateofbirthday" name="dateofbirthday" type="date" />
            </div>

        </div>

        <div className="items-info-details-form-accordion">
          <div className="form-details">
            <label htmlFor="typeofdni">Tipo de documento</label>
            <select id="typeofdni" name="typeofdni" defaultValue="">
              <option value="" disabled>Seleccione un tipo</option>
              <option value="dni">DNI</option>
              <option value="le">LE (Libreta de Enrolamiento)</option>
              <option value="lc">LC (Libreta Cívica)</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="form-details">
            <label htmlFor="DNI">DNI</label>
            <input id="DNI" name="DNI" type="number" placeholder="Ingrese su DNI" />
          </div>

          <div className="form-details">
            <label htmlFor="dateofinscription">Fecha de inscripción</label>
            <input id="dateofinscription" name="dateofinscription" type="date" />
          </div>
        </div>
          
        <div className="items-info-details-form-accordion">
          <div className="form-details">
            <label htmlFor="profession">Profesión</label>
            <input id="profession" name="profession" type="text" placeholder="Ingrese su profesión" />
          </div>

          <div className="form-details">
            <label htmlFor="presentedby">Presentado por</label>
            <input id="presentedby" name="presentedby" type="text" placeholder="Presentado por" />
          </div>

          <div className="form-details">
            <label htmlFor="maritalstatus">Estado civil</label>
            <select id="maritalstatus" name="maritalstatus" defaultValue="">
              <option value="" disabled>Seleccione un estado</option>
              <option value="soltero">Soltero/a</option>
              <option value="casado">Casado/a</option>
              <option value="divorciado">Divorciado/a</option>
              <option value="viudo">Viudo/a</option>
              <option value="union">Unión convivencial</option>
            </select>
          </div>
        </div>
          
        <div  className="items-info-details-form-accordion">
          <div className="form-details">
            <label htmlFor="category">Categoría</label>
            <select id="category" name="category" defaultValue="">
              <option value="" disabled>Seleccione una categoría</option>
              <option value="regular">Regular</option>
              <option value="honorario">Honorario</option>
              <option value="protector">Protector</option>
              <option value="socio">Socio</option>
            </select>
          </div>

          <div className="form-details">
            <label htmlFor="nacionality">Nacionalidad</label>
            <input id="nacionality" name="nacionality" type="text" placeholder="Nacionalidad" />
          </div>
        </div>
          
      </Accordion>



      <Accordion
        title="Contacto particular"
        isActive={activeAccordion === 'privatecontact'}
        onToggle={() => handleToggle('privatecontact')}>

              <div className="items-info-details-form-accordion">
          <div className="form-details">
            <label htmlFor="address">Dirección</label>
            <input id="address" name="address" type="text" placeholder="Ingrese su dirección" />
          </div>

          <div className="form-details">
            <label htmlFor="phone">Teléfono</label>
            <input id="phone" name="phone" type="tel" placeholder="Ingrese su teléfono" />
          </div>
        </div>



{/*habria q consumir una api aca*/}
        <div className="items-info-details-form-accordion">
          <div className="form-details">
            <label htmlFor="locality">Localidad</label>
            <select id="locality" name="locality" defaultValue="">
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
            <label htmlFor="postalcode">Código postal</label>
            <input id="postalcode" name="postalcode" type="text" placeholder="Ingrese el código postal" />
          </div>
        </div>
          
      </Accordion>


    <Accordion
        title="Cobro"
        isActive={activeAccordion === 'collection'}
        onToggle={() => handleToggle('collection')}>

          <div className="items-info-details-form-accordion">
          <div className="form-details">
            <label htmlFor="address">Direcciones de cobro</label>
            <input id="address" name="address" type="text" placeholder="Ingrese la dirección de cobro" />
          </div>

          <div className="form-details">
            <label htmlFor="phone">Hora preferida</label>
            <input id="phone" name="phone" type="datetime-local" placeholder="Ingrese su hora de cobro" />
          </div>
        </div>
      </Accordion>

         
    <Accordion
        title="Estado del socio"
        isActive={activeAccordion === 'stateofpartner'}
        onToggle={() => handleToggle('stateofpartner')}>

         <div className="items-info-details-form-accordion">
          <div className="form-details-checkbox">
            <label>Estado del socio</label>
            <div className="checkbox-group">
              <label htmlFor="active">
                <div className="checkbox">
               <input
                  type="checkbox"
                  id="active"
                  name="estado"
                  value="activo"
                />
                <p>Activo</p>
                </div>
           
              </label>
              <label htmlFor="inactive">

                <div className="checkbox">
                   <input
                  type="checkbox"
                  id="inactive"
                  name="estado"
                  value="baja"
                />
                <p>Baja</p>
                </div>
               
              </label>
            </div>
        </div>

         <div className="form-details">
            <label htmlFor="reasonofwithdrawal">Motivo de baja</label>
            <input id="reasonofwithdrawal" name="reasonofwithdrawal" type="text" placeholder="Ingrese su motivo de baja" />
          </div>


            <div className="form-details">
            <label htmlFor="dateofwithdrawal">Fecha de baja</label>
            <input id="dateofwithdrawal" name="dateofwithdrawal" type="date" placeholder="Ingrese su fecha de baja" />
            </div>
        </div>


      <div className="items-info-details-form-accordion">
            <div className="">
            <label htmlFor="observations">Observaciones</label>
            <input id="observations" name="observations" type="text" className="inputobservations"placeholder="Ingrese sus observaciones" />
            </div>
        
            <div className="form-details">
            <label htmlFor="resignationdate">Fecha de renuncia</label>
            <input id="resignationdate" name="resignationdate" type="date" placeholder="Ingrese su fecha de renuncia" />
            </div>
      </div>
        
      </Accordion>


      <Btn
        text="Guardar"
        className="changes btn"
        icon={
          <div className="img-ico">
            <img src={SaveIcon} alt="Guardar" />
          </div>
        }
      />
    </form>
  );
}
