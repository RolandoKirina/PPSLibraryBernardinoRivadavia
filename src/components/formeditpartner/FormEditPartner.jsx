import Btn from "../../components/btn/Btn.jsx";
import SaveIcon from '../../assets/img/save-icon.svg';
import Accordion from "../generic/accordion/Accordion.jsx";
import { useState } from "react";
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
        <div className="items-info-details">

            <div>
                <div className="item-details">
                    <label htmlFor="name">Nombre</label>
                    <input id="name" name="name" type="text" placeholder="Ingrese su nombre" />
                </div>
                <div className="item-details">
                    <label htmlFor="surname">Apellido</label>
                    <input id="surname" name="surname" type="text" placeholder="Ingrese su apellido" />
                </div>

                <div className="item-details">
                    <label htmlFor="dateofbirthday">Fecha de nacimiento</label>
                    <input id="dateofbirthday" name="dateofbirthday" type="date" placeholder="Ingrese su fecha de nacimiento" />
                </div>
            </div>
         

        <div>
            <div className="item-details">
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

            <div className="item-details">
                    <label htmlFor="DNI">DNI</label>
                    <input id="DNI" name="DNI" type="number" placeholder="Ingrese su dni" />
                </div>


            <div className="item-details">
                <label htmlFor="dateofinscription">Fecha de inscripción</label>
                <input id="dateofinscription" name="dateofinscription" type="date" placeholder="Ingrese la fecha de inscripción" />
            </div>

            <div>
                <div className="item-details">
                <label htmlFor="profession">Profesión</label>
                <input id="profession" name="profession" type="text" placeholder="Ingrese la fecha de inscripción" />
                </div>

                <div className="item-details">
                    <label htmlFor="presentedby">Presentado por</label>
                    <input id="presentedby" name="presentedby" type="date" placeholder="Presentado por" />
                </div>


                <div className="item-details">
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
          </div>
          
        </div>
      </Accordion>

    <Accordion
        title="Datos personales"
        isActive={activeAccordion === 'privateData'}
        onToggle={() => handleToggle('personaldata')}>
        <div className="items-info-details">
          <div className="item-details">
            <label htmlFor="name">Nombre</label>
            <input id="name" name="name" type="text" placeholder="Juan Pérez" />
          </div>

          <div className="item-details">
            <label htmlFor="dni">DNI</label>
            <input id="dni" name="dni" type="text" placeholder="12345678" />
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
