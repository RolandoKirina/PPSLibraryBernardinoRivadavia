

import Btn from "../../../components/common/btn/Btn.jsx";
import SaveIcon from "../../../assets/img/save-icon.svg";
import Accordion from "../../generic/accordion/Accordion.jsx";
import { useState, useEffect } from "react";
import { useEntityManagerAPI } from "../../../hooks/useEntityManagerAPI.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext.jsx";
import { useRef } from "react";

import "./FormEditPartner.css";

export default function FormEditPartner({ selectedPartner }) {
  const entityManagerApi = useEntityManagerAPI("partners");

  const [activeAccordion, setActiveAccordion] = useState(null);
  const [maritalStatuses, setMaritalStatuses] = useState([]);
  const [idReason, setIdReason] = useState([]);
  const [existingPartner, setExistingPartner] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { auth } = useAuth();

  const id = selectedPartner?.id;

  useEffect(() => {
    setLoading(false);
    setError("");
    setSuccess("");

    const fetchPartner = async () => {
      const data = await entityManagerApi.getItem(id);
      setExistingPartner(data);
      setFormValues(data);
    };
    fetchPartner();
  }, [id]);

  useEffect(() => {
    fetchMaritalStatuses();
    fetchReasonWithdrawal();
  }, []);

  const submittingRef = useRef(false);


  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    birthDate: "",
    documentType: "",
    documentNumber: "",
    profession: "",
    presentedBy: "",
    nationality: "",
    homeAddress: "",
    homePhone: "",
    LocalityId: "",
    idCategory: "",
    MaritalStatusId: "",
    collectionAddress: "",
    collectiontime: "",
    homePostalCode: "",
    workplace: "",
    workAddress: "",
    workPhone: "",
    workPostalCode: "",
    resignationdate: "",
    observations: "",
    isActive: "",
    idReason: "",
    registrationDate: "",
  });



  const fetchMaritalStatuses = async () => {
    const res = await fetch("http://localhost:4000/api/v1/marital-statuses", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.token}`
      }
    });
    setMaritalStatuses(await res.json());
  };

  const fetchReasonWithdrawal = async () => {
    const res = await fetch("http://localhost:4000/api/v1/reason-for-withdrawal", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.token}`
      }
    });
    setIdReason(await res.json());
  };

  const handleToggle = (id) => {
    setActiveAccordion(prev => (prev === id ? null : id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submittingRef.current) return;

    if (!existingPartner) {
      setError("No se encontró el socio para editar.");
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...existingPartner,
        ...formValues,
        documentType: Number(formValues.documentType || existingPartner.documentType),
        MaritalStatusId: formValues.MaritalStatusId !== "" ? Number(formValues.MaritalStatusId) : null,
        idReason: Number(formValues.idReason || existingPartner.idReason),
        birthDate: formValues.birthDate || existingPartner.birthDate || null,
        resignationdate: formValues.resignationdate || existingPartner.resignationdate || null,
      };

      await entityManagerApi.updateItem(id, payload);

      setSuccess("Socio editado correctamente");

      // if (onPartnerCreated) {
      //   setTimeout(() => {
      //     onPartnerCreated?.();
      //   }, 2000);
      // }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error al editar socio. Intente nuevamente.");
      submittingRef.current = false;
      setLoading(false);
    }
  };
  return (
    <div className="form-edit-partner">
      <form onSubmit={handleSubmit}>
        <div className="numberAssigned">
          <h2> Socio N°: {formValues.partnerNumber} </h2>
        </div>

        <Accordion title="Datos personales" isActive={activeAccordion === "personal"} onToggle={() => handleToggle("personal")}>

          <div className="row">
            <div className="form-details">
              <label htmlFor="name" className="title-name">Nombre <span className='required'>*</span></label>
              <input name="name" placeholder="Nombre" onChange={handleChange} value={formValues.name || ""} />
            </div >

            <div className="form-details" >
              <label htmlFor="surname">Apellido <span className='required'>*</span></label>
              <input name="surname" placeholder="Apellido" onChange={handleChange} value={formValues.surname || ""} />
            </div>

            <div className="form-details">
              <label htmlFor="dateofbirthday">Fecha de nacimiento <span className='required'>*</span></label>
              <input type="date" name="birthDate" onChange={handleChange} value={formValues.birthDate || ""} />
            </div>
            <div className="form-details">
              <label htmlFor="documentType">Tipo de documento <span className='required'>*</span></label>
              <select name="documentType" onChange={handleChange} value={formValues.documentType || ""}>
                <option value="" disabled>Tipo documento</option>
                <option value="1">DNI</option>
                <option value="2">LE</option>
                <option value="3">LC</option>
                <option value="4">Pasaporte</option>
              </select>
            </div >

            <div className="form-details">
              <label htmlFor="documentNumber">Numero de documento <span className='required'>*</span></label>
              <input name="documentNumber" placeholder="Documento" onChange={handleChange} value={formValues.documentNumber || ""} />
            </div>
            <div className="form-details" >
              <label htmlFor="profession">Profesion</label>
              <input name="profession" placeholder="Profesión" onChange={handleChange} value={formValues.profession || ""} />
            </div>
            <div className="form-details">
              <label htmlFor="presentedBy">Presentado por <span className='required'>*</span></label>
              <input name="presentedBy" placeholder="Presentado por" onChange={handleChange} value={formValues.presentedBy || ""} />

            </div>
            <div className="form-details">
              <label htmlFor="nationality">Nacionalidad </label>
              <input name="nationality" placeholder="Nacionalidad" onChange={handleChange} value={formValues.nationality || ""} />

            </div>
            <div className="form-details">

              <label htmlFor="MaritalStatusId">Estado civil </label>
              <select name="MaritalStatusId" onChange={handleChange} value={formValues.MaritalStatusId || ""}>
                <option value="" disabled>Estado civil</option>
                {maritalStatuses.map(m => (
                  <option key={m.id} value={m.id}>{m.statusName}</option>
                ))}
              </select>
            </div>

            <div className="form-details">

              <label htmlFor="idCategory">Categoria <span className='required'>*</span></label>

              <select name="idCategory" onChange={handleChange} value={formValues.idCategory || ""}>
                <option value="" disabled>Categoría</option>
                <option value="1">Regular</option>
                <option value="2">Honorario</option>
                <option value="3">Protector</option>
                <option value="4">Socio</option>
              </select>
            </div>

          </div >
        </Accordion >


        <Accordion title="Contacto" isActive={activeAccordion === "contact"} onToggle={() => handleToggle("contact")}>

          <div className="row">
            <div className="form-details">
              <label htmlFor="homeAddress">Direccion particular <span className='required'>*</span></label>
              <input name="homeAddress" placeholder="Dirección" onChange={handleChange} value={formValues.homeAddress || ""} />
            </div>
            <div className="form-details">
              <label htmlFor="homePhone">Teléfono <span className='required'>*</span></label>
              <input name="homePhone" placeholder="Teléfono" onChange={handleChange} value={formValues.homePhone || ""} />

            </div>
            <div className="form-details">
              <label htmlFor="homePostalCode">Código postal </label>
              <input name="homePostalCode" placeholder="Código postal" onChange={handleChange} value={formValues.homePostalCode || ""} />
            </div>
            <div className="form-details">
              <label htmlFor="LocalityId">Localidad </label>
              <select name="LocalityId" onChange={handleChange} value={formValues.LocalityId || ""}  >
                <option value="" disabled >Localidad</option>
                <option value="1">Tandil</option>
              </select>
            </div>
          </div >



        </Accordion >

        <Accordion title="Trabajo" isActive={activeAccordion === "work"} onToggle={() => handleToggle("work")}>
          <div className="row">
            <div className="form-details">
              <label htmlFor="workplace">Lugar laboral</label>
              <input name="workplace" placeholder="Lugar de trabajo" onChange={handleChange} value={formValues.workplace || ""} />
            </div>
            <div className="form-details">
              <label htmlFor="workAddress">Dirección laboral</label>
              <input name="workAddress" placeholder="Dirección laboral" onChange={handleChange} value={formValues.workAddress || ""} />
            </div>
            <div className="form-details">
              <label htmlFor="workPhone">Teléfono laboral</label>
              <input name="workPhone" placeholder="Teléfono laboral" onChange={handleChange} value={formValues.workPhone || ""} />

            </div>
            <div className="form-details">

              <label htmlFor="workPostalCode">Código postal laboral</label>
              <input name="workPostalCode" placeholder="CP laboral" onChange={handleChange} value={formValues.workPostalCode || ""} />
            </div>
          </div >

        </Accordion >

        <Accordion title="Cobro" isActive={activeAccordion === "collection"} onToggle={() => handleToggle("collection")}>
          <div className="row">
            <div className="form-details">
              <label htmlFor="collectionAddress">Dirección de cobro</label>
              <input name="collectionAddress" placeholder="Dirección de cobro" onChange={handleChange} value={formValues.collectionAddress || ""} />
            </div>
            <div className="form-details">
              <label htmlFor="collectiontime">Hora preferida de cobro</label>
              <input type="time" name="collectiontime" onChange={handleChange} value={formValues.collectiontime || ""} />
            </div>
          </div >
          <div className="form-details">
            <label htmlFor="collectiontime">Hora preferida de cobro</label>
            <input type="time" name="collectiontime" onChange={handleChange} />
          </div>

        </Accordion >

        <Accordion title="Estado del socio" isActive={activeAccordion === "state"} onToggle={() => handleToggle("state")}>
          <div className="row">
            <div className="form-details">
              <label htmlFor="resignationDate">Fecha de baja</label>
              <input type="date" name="resignationDate" onChange={handleChange} value={formValues.resignationDate || ""} />
            </div>
            <div className="form-details">
              <label htmlFor="observations">Observaciones</label>
              <input name="observations" placeholder="Observaciones" onChange={handleChange} value={formValues.observations || ""} />
            </div>
            <div className="form-details">
              <label htmlFor="isActive">Estado</label>
              <select name="isActive" onChange={handleChange} value={formValues.isActive || ""}>
                <option value="" disabled>Estado</option>
                <option value="1">Activo</option>
                <option value="2">Baja</option>
              </select>
            </div>
            <div className="form-details">
              <label htmlFor="idReason">Motivo de baja</label>
             <select name="idReason" onChange={handleChange} value={formValues.idReason || ""}>
                <option value="" disabled>Motivo de baja</option>

                {idReason
                  .filter(r => r.reason !== "Desconocido")
                  .map(r => (
                    <option key={r.idReason} value={r.idReason}>                      
                      {r.reason}
                    </option>
                  ))
                }
              </select>
            </div>
          </div >

        </Accordion >

        <div className="message-center">
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
        </div>


        <div className="btn-save-container">
          {/* <Btn text="Guardar socio" type="submit" icon={<img src={SaveIcon} alt="Guardar" />} variant="save" /> */}
          <Btn
            text={loading ? "Guardando..." : "Guardar socio"}
            type="submit"
            icon={<img src={SaveIcon} alt="Guardar" />}
            variant="save"
            disabled={loading}
          />
        </div>

      </form >
    </div >
  );
}
