import Btn from "../../../components/common/btn/Btn.jsx";
import SaveIcon from "../../../assets/img/save-icon.svg";
import Accordion from "../../generic/accordion/Accordion.jsx";
import { useState } from "react";
import "../formeditpartner/FormEditPartner.css";
import { useEntityManagerAPI } from "../../../hooks/useEntityManagerAPI.js";

export default function FormAddPartner() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const entityManagerApi = useEntityManagerAPI("partners");

  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    dateofbirthday: "",
    typeofdni: "",
    DNI: "",
    dateofinscription: "",
    profession: "",
    presentedby: "",
    maritalstatus: "",
    category: "",
    nacionality: "",
    address: "",
    phone: "",
    locality: "",
    postalcode: "",
    collectionaddress: "",
    collectiontime: ""
  });

  const handleToggle = (id) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await entityManagerApi.createItem(formValues);
      alert("Socio creado correctamente");
      console.log("Enviado:", formValues);
    } catch (error) {
      console.error(error);
      alert("Error al crear el socio");
    }
  };

  return (
    <div className="form-edit-partner">
      <form onSubmit={handleSubmit}>

        {/* DATOS PERSONALES */}
        <Accordion
          title="Datos personales"
          isActive={activeAccordion === "personal"}
          onToggle={() => handleToggle("personal")}
        >
          <div className="items-info-details-form-accordion">
            <input name="name" value={formValues.name} onChange={handleChange} placeholder="Nombre" />
            <input name="surname" value={formValues.surname} onChange={handleChange} placeholder="Apellido" />
            <input type="date" name="dateofbirthday" value={formValues.dateofbirthday} onChange={handleChange} />

            <select name="typeofdni" value={formValues.typeofdni} onChange={handleChange}>
              <option value="">Tipo documento</option>
              <option value="dni">DNI</option>
              <option value="le">LE</option>
              <option value="lc">LC</option>
              <option value="pasaporte">Pasaporte</option>
            </select>

            <input name="DNI" value={formValues.DNI} onChange={handleChange} placeholder="DNI" />
            <input type="date" name="dateofinscription" value={formValues.dateofinscription} onChange={handleChange} />

            <input name="profession" value={formValues.profession} onChange={handleChange} placeholder="Profesión" />
            <input name="presentedby" value={formValues.presentedby} onChange={handleChange} placeholder="Presentado por" />

            <select name="maritalstatus" value={formValues.maritalstatus} onChange={handleChange}>
              <option value="">Estado civil</option>
              <option value="soltero">Soltero</option>
              <option value="casado">Casado</option>
              <option value="divorciado">Divorciado</option>
              <option value="viudo">Viudo</option>
            </select>

            <select name="category" value={formValues.category} onChange={handleChange}>
              <option value="">Categoría</option>
              <option value="regular">Regular</option>
              <option value="honorario">Honorario</option>
            </select>

            <input name="nacionality" value={formValues.nacionality} onChange={handleChange} placeholder="Nacionalidad" />
          </div>
        </Accordion>

        {/* CONTACTO */}
        <Accordion
          title="Contacto"
          isActive={activeAccordion === "contact"}
          onToggle={() => handleToggle("contact")}
        >
          <input name="address" value={formValues.address} onChange={handleChange} placeholder="Dirección" />
          <input name="phone" value={formValues.phone} onChange={handleChange} placeholder="Teléfono" />

          <select name="locality" value={formValues.locality} onChange={handleChange}>
            <option value="">Localidad</option>
            <option value="caba">CABA</option>
            <option value="cordoba">Córdoba</option>
          </select>

          <input name="postalcode" value={formValues.postalcode} onChange={handleChange} placeholder="Código postal" />
        </Accordion>

        {/* COBRO */}
        <Accordion
          title="Cobro"
          isActive={activeAccordion === "collection"}
          onToggle={() => handleToggle("collection")}
        >
          <input
            name="collectionaddress"
            value={formValues.collectionaddress}
            onChange={handleChange}
            placeholder="Dirección de cobro"
          />
          <input
            type="datetime-local"
            name="collectiontime"
            value={formValues.collectiontime}
            onChange={handleChange}
          />
        </Accordion>

        {/* GUARDAR */}
        <Accordion
          title="Guardar socio"
          isActive={activeAccordion === "save"}
          onToggle={() => handleToggle("save")}
        >
          <Btn
            text="Guardar"
            type="submit"
            icon={<img src={SaveIcon} alt="Guardar" />}
          />
        </Accordion>

      </form>
    </div>
  );
}
