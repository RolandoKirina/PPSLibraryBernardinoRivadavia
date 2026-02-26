import Btn from "../../../components/common/btn/Btn.jsx";
import SaveIcon from "../../../assets/img/save-icon.svg";
import Accordion from "../../generic/accordion/Accordion.jsx";
import { useState, useEffect, useRef } from "react";
import "../formeditpartner/FormEditPartner.css";
import { useEntityManagerAPI } from "../../../hooks/useEntityManagerAPI.js";

export default function FormAddPartner({ onPartnerCreated,employees }) {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const entityManagerApi = useEntityManagerAPI("partners");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const today = new Date().toLocaleDateString("en-CA");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [maritalStatuses, setMaritalStatuses] = useState([]);
  const [localities, setLocalities] = useState([]);

  // La referencia es clave para bloquear el hilo de ejecución instantáneamente
  const submittingRef = useRef(false);
  
  const maritalstatus = "http://localhost:4000/api/v1/marital-statuses";
  const statepartners = "http://localhost:4000/api/v1/state-partners";
  const partnerCategory = "http://localhost:4000/api/v1/partner-categories"  
  const locality  = "http://localhost:4000/api/v1/localities";
  useEffect(() => {
    async function loadOptions() {
      try {
        const [catRes, stateRes, maritalRes, localityres] = await Promise.all([
          fetch(partnerCategory),
          fetch(statepartners),
          fetch(maritalstatus),
          fetch(locality)
        ]);

        const catJson = await catRes.json();
        const stateJson = await stateRes.json();
        const maritalJson = await maritalRes.json();
        const localityJson = await localityres.json();
        setCategories(catJson.rows);
        setStates(stateJson.rows);
        setMaritalStatuses(maritalJson);
        setLocalities(localityJson);
        console.log(maritalStatuses)
      } catch (err) {
        console.error("Error cargando opciones", err);
      }
    }

    loadOptions();
  }, []);

  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    birthDate: "",
    documentType: "",
    documentNumber: "",
    registrationDate: today,
    profession: "",
    presentedBy: "",
    MaritalStatusId: "",
    idCategory: "",
    nationality: "",
    homeAddress: "",
    homePhone: "",
    LocalityId: "",
    homePostalCode: "",
    collectionAddress: "",
    preferredTime: "",
    workplace: "",
    workAddress: "",
    workPhone: "",
    workPostalCode: "",
    idState: 1
  });

  const requiredFields = [
    "name", "surname", "birthDate", "documentType", "documentNumber",
    "MaritalStatusId", "idCategory", "nationality", "homeAddress",
    "homePhone", "LocalityId", "homePostalCode", "profession", "collectionAddress"
  ];

  const fieldLabels = {
    name: "Nombre",
    surname: "Apellido",
    birthDate: "Fecha de nacimiento",
    documentType: "Tipo de documento",
    documentNumber: "Número de documento",
    MaritalStatusId: "Estado civil",
    idCategory: "Categoría",
    nationality: "Nacionalidad",
    homeAddress: "Dirección",
    homePhone: "Teléfono",
    LocalityId: "Localidad",
    homePostalCode: "Código postal",
    profession: "Profesión",
    collectionAddress: "Dirección de cobro"
  };

  const formatPreferredTime = (value) => {
    if (!value) return null;
    return value.replace("T", " ");
  };

  const handleToggle = (id) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // BLOQUEO 1: Si ya se está enviando, abortamos cualquier clic extra
    if (submittingRef.current) return;

    submittingRef.current = true;
    setLoading(true);
    setError("");
    setSuccess("");

    // Validación de campos
    const missingFields = requiredFields.filter(
      field => !formValues[field] || formValues[field] === ""
    );

    if (missingFields.length > 0) {
      const missingLabels = missingFields.map(field => fieldLabels[field] || field);
      setError("Faltan completar: " + missingLabels.join(", "));
      
      // Liberamos el bloqueo solo porque el formulario falló validación
      submittingRef.current = false;
      setLoading(false);
      return;
    }

    const payload = {
      ...formValues,
      preferredTime: formatPreferredTime(formValues.preferredTime),
      idState: 1,
      unpaidFees: 0,
      pendingBooks: 0,
    };

    try {
      await entityManagerApi.createItem(payload);
      setSuccess("Socio creado correctamente");

      if (onPartnerCreated) {
        setTimeout(() => {
          onPartnerCreated?.();
          // No liberamos loading para que el botón no parpadee antes de irse
        }, 2000);
      }
    } catch (err) {
      setError("Error al crear socio. Intente nuevamente.");
      submittingRef.current = false;
      setLoading(false);
    }
  };

  return (
    <div className="form-edit-partner">
      <form onSubmit={handleSubmit}>

        <Accordion title="Datos personales" isActive={activeAccordion === "personal"} onToggle={() => handleToggle("personal")}>
          <div className="row">
            <div className="form-details">
              <label>Nombre <span className='required'>*</span></label>
              <input name="name" value={formValues.name} onChange={handleChange} placeholder="Nombre" />
            </div>
            <div className="form-details">
              <label>Apellido <span className='required'>*</span></label>
              <input name="surname" value={formValues.surname} onChange={handleChange} placeholder="Apellido" />
            </div>
            <div className="form-details">
              <label>Fecha de nacimiento <span className='required'>*</span></label>
              <input type="date" name="birthDate" value={formValues.birthDate} onChange={handleChange} />
            </div>
            <div className="form-details">
              <label>Tipo de documento <span className='required'>*</span></label>
              <select name="documentType" value={formValues.documentType} onChange={handleChange}>
                <option value="">Tipo documento</option>
                <option value="1">DNI</option>
                <option value="2">LE</option>
                <option value="3">LC</option>
                <option value="4">Pasaporte</option>
              </select>
            </div>
            <div className="form-details">
              <label>Número de documento <span className='required'>*</span></label>
              <input name="documentNumber" value={formValues.documentNumber} onChange={handleChange} placeholder="Documento" />
            </div>
            <div className="form-details">
              <label>Fecha de registro</label>
              <input type="date" name="registrationDate" value={formValues.registrationDate} readOnly />
            </div>
            
         <div className="form-details">
            <label>Estado civil <span className='required'>*</span></label>
            <select
              name="MaritalStatusId"
              value={formValues.MaritalStatusId}
              onChange={handleChange}
            >
              <option value="">Estado civil</option>
              {maritalStatuses?.map(ms => (
                <option key={ms.id} value={ms.id}> {}
                  {ms.statusName} {}
                </option>
              ))}
            </select>
          </div>
            <div className="form-details">
              <label>Categoría <span className='required'>*</span></label>
              <select name="idCategory" value={formValues.idCategory} onChange={handleChange}>
                  <option value="">Categoría</option>
                  {categories?.map(cat => (
                    <option key={cat.idCategory} value={cat.idCategory}>
                      {cat.name}
                    </option>
                  ))}
                </select>
            </div>
            <div className="form-details">
              <label>Nacionalidad</label>
              <input name="nationality" value={formValues.nationality} onChange={handleChange} placeholder="Nacionalidad" />
            </div>
            <div className="form-details" >
              <label>Presentado por </label>
              <input name="presentedBy" value={formValues.presentedBy} onChange={handleChange} placeholder="Presentado por" />
            </div>
          </div>
        </Accordion>

        <Accordion title="Contacto" isActive={activeAccordion === "contact"} onToggle={() => handleToggle("contact")}>
          <div className="row">
            <div className="form-details" >
              <label>Dirección <span className='required'>*</span></label>
              <input name="homeAddress" value={formValues.homeAddress} onChange={handleChange} placeholder="Dirección" />
            </div>
            <div className="form-details" >
              <label>Teléfono personal <span className='required'>*</span></label>
              <input name="homePhone" value={formValues.homePhone} onChange={handleChange} placeholder="Teléfono" />
            </div>
            <div className="form-details" >
              <label>Localidad <span className='required'>*</span></label>
              <select name="LocalityId" value={formValues.LocalityId} onChange={handleChange} >
                <option value="">Localidad</option>
                {localities?.map(loc=>(
                <option key={loc.id} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>
            <div className="form-details" >
              <label>Código postal <span className='required'>*</span></label>
              <input name="homePostalCode" value={formValues.homePostalCode} onChange={handleChange} placeholder="Código postal" />
            </div>
          </div>
        </Accordion>

        <Accordion title="Trabajo" isActive={activeAccordion === "work"} onToggle={() => handleToggle("work")}>
          <div className="row">
            <div className="form-details" >
              <label>Profesión <span className='required'>*</span></label>
              <input name="profession" value={formValues.profession} onChange={handleChange} placeholder="Profesión" />
            </div>
            <div className="form-details">
              <label>Lugar laboral</label>
              <input name="workplace" value={formValues.workplace} onChange={handleChange} placeholder="Lugar de trabajo" />
            </div>
            <div className="form-details">
              <label>Dirección laboral</label>
              <input name="workAddress" value={formValues.workAddress} onChange={handleChange} placeholder="Dirección laboral" />
            </div>
            <div className="form-details">
              <label>Teléfono laboral</label>
              <input name="workPhone" value={formValues.workPhone} onChange={handleChange} placeholder="Teléfono laboral" />
            </div>
            <div className="form-details">
              <label>CP laboral</label>
              <input name="workPostalCode" value={formValues.workPostalCode} onChange={handleChange} placeholder="CP laboral" />
            </div>
          </div>
        </Accordion>

        <Accordion title="Cobro" isActive={activeAccordion === "collection"} onToggle={() => handleToggle("collection")}>
          <div className="row">
            <div className="form-details" >
              <label>Dirección de cobro <span className='required'>*</span></label>
              <input name="collectionAddress" value={formValues.collectionAddress} onChange={handleChange} placeholder="Dirección de cobro" />
            </div>
            <div className="form-details">
              <label>Hora preferida de cobro</label>
              <input type="time" name="preferredTime" value={formValues.preferredTime} onChange={handleChange} />
            </div>
          </div>
        </Accordion>

        <div className="message-center">
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
        </div>

        <div className="btn-save-container">
          <Btn
            text={loading ? "Guardando..." : "Guardar socio"}
            type="submit"
            icon={<img src={SaveIcon} alt="Guardar" />}
            variant="save"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}