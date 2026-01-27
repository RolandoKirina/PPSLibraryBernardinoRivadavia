

import Btn from "../../../components/common/btn/Btn.jsx";
import SaveIcon from "../../../assets/img/save-icon.svg";
import Accordion from "../../generic/accordion/Accordion.jsx";
import { useState, useEffect } from "react";
import { useEntityManagerAPI } from "../../../hooks/useEntityManagerAPI.js";
import "./FormEditPartner.css";

export default function FormAddPartner() {
  const entityManagerApi = useEntityManagerAPI("partners");

  const [activeAccordion, setActiveAccordion] = useState(null);
  const [maritalStatuses, setMaritalStatuses] = useState([]);
  const [reasonOfWithdrawal, setReasonOfWithdrawal] = useState([]);

  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    birthDate: "",
    documentType: "",
    documentNumber: "",
    profession: "",
    presentedBy: "",
    nationality: "",
    address: "",
    phone: "",
    postalcode: "",
    locality: "",
    category: "",
    maritalstatus: "",
    collectionAddress: "",
    collectiontime: "",
    workplace: "",
    workAddress: "",
    workPhone: "",
    workPostalCode: "",
    resignationdate: "",
    observations: "",
    idState: "",
    reasonOfWithdrawal: "",
    registrationDate: "",
  });

  useEffect(() => {
    fetchMaritalStatuses();
    fetchReasonWithdrawal();
  }, []);

  const fetchMaritalStatuses = async () => {
    const res = await fetch("http://localhost:4000/api/v1/marital-statuses");
    setMaritalStatuses(await res.json());
  };

  const fetchReasonWithdrawal = async () => {
    const res = await fetch("http://localhost:4000/api/v1/reason-for-withdrawal");
    setReasonOfWithdrawal(await res.json());
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

    try {
      await entityManagerApi.createItem({
        ...formValues,
        documentType: Number(formValues.documentType),
        maritalstatus: Number(formValues.maritalstatus),
        category: Number(formValues.category),
        locality: Number(formValues.locality),
        idState: formValues.idState ? Number(formValues.idState) : null,
        reasonOfWithdrawal: formValues.reasonOfWithdrawal
          ? Number(formValues.reasonOfWithdrawal)
          : null,
      });

      alert("Socio editado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al editar socio");
    }
  };

  return (
    <div className="form-edit-partner">
      <form onSubmit={handleSubmit}>

        <Accordion title="Datos personales" isActive={activeAccordion === "personal"} onToggle={() => handleToggle("personal")}>
          
          <div className="row">
            <div className="form-details">
                <label htmlFor="name" className="title-name">Nombre <span className='required'>*</span></label>
                <input name="name" placeholder="Nombre" onChange={handleChange} />
            </div>

            <div className="form-details" >
              <label htmlFor="surname">Apellido <span className='required'>*</span></label>
              <input name="surname" placeholder="Apellido" onChange={handleChange} />
            </div>

            <div className="form-details">
              <label htmlFor="dateofbirthday">Fecha de nacimiento <span className='required'>*</span></label>
              <input type="date" name="birthDate" onChange={handleChange} />
            </div>
            <div className="form-details">
                <label htmlFor="documentType">Tipo de documento <span className='required'>*</span></label>
                <select name="documentType" onChange={handleChange}>
                    <option value="">Tipo documento</option>
                    <option value="1">DNI</option>
                    <option value="2">LE</option>
                    <option value="3">LC</option>
                    <option value="4">Pasaporte</option>
                  </select>
            </div>

      <div className="form-details">
         <label htmlFor="documentNumber">Numero de documento <span className='required'>*</span></label>
         <input name="documentNumber" placeholder="Documento" onChange={handleChange} />
      </div>
      <div className="form-details" >
        <label htmlFor="profession">Profesion</label>
        <input name="profession" placeholder="Profesión" onChange={handleChange} />

      </div>
      <div className="form-details">
        <label htmlFor="presentedBy">Presentado por <span className='required'>*</span></label>
        <input name="presentedBy" placeholder="Presentado por" onChange={handleChange} />

      </div>
      <div className="form-details">
        <label htmlFor="nationality">Nacionalidad </label>
        <input name="nationality" placeholder="Nacionalidad" onChange={handleChange} />

      </div>
      <div className="form-details">        
        
        <label htmlFor="maritalstatus">Estado civil </label>
        <select name="maritalstatus" onChange={handleChange}>
                  <option value="">Estado civil</option>
                  {maritalStatuses.map(m => (
                    <option key={m.id} value={m.id}>{m.statusName}</option>
                  ))}
                </select>
      </div>
        
      <div className="form-details">        
        
        <label htmlFor="category">Categoria <span className='required'>*</span></label>

                <select name="category" onChange={handleChange}>
                            <option value="">Categoría</option>
                            <option value="1">Regular</option>
                            <option value="2">Honorario</option>
                            <option value="3">Protector</option>
                            <option value="4">Socio</option>
                </select>
      </div>
              
</div>
        </Accordion>

      
        <Accordion title="Contacto" isActive={activeAccordion === "contact"} onToggle={() => handleToggle("contact")}>
         
          <div className="row">
            <div className="form-details">        
                <label htmlFor="address">Direccion particular <span className='required'>*</span></label>
                <input name="address" placeholder="Dirección" onChange={handleChange} />
            </div>
            <div className="form-details">
                <label htmlFor="phone">Teléfono <span className='required'>*</span></label>
                <input name="phone" placeholder="Teléfono" onChange={handleChange} />

            </div>
            <div className="form-details">
                  <label htmlFor="postalcode">Código postal </label>
                  <input name="postalcode" placeholder="Código postal" onChange={handleChange} />
            </div>
            <div className="form-details">
                <label htmlFor="locality">Localidad </label>
                <select name="locality" onChange={handleChange}>
                  <option value="">Localidad</option>
                  <option value="1">Tandil</option>
                </select>
            </div>  
          </div>


        
        </Accordion>

        <Accordion title="Trabajo" isActive={activeAccordion === "work"} onToggle={() => handleToggle("work")}>
          <div className="row">
                    <div className="form-details">
                      <label htmlFor="workplace">Lugar laboral</label>
                      <input name="workplace" placeholder="Lugar de trabajo" onChange={handleChange} />
                    </div>
                    <div className="form-details">          
                      <label htmlFor="workAddress">Dirección laboral</label>
                      <input name="workAddress" placeholder="Dirección laboral" onChange={handleChange} />
                    </div>
                    <div className="form-details">
                      <label htmlFor="workPhone">Teléfono laboral</label>
                      <input name="workPhone" placeholder="Teléfono laboral" onChange={handleChange} />

                    </div>
                    <div className="form-details">                      
                      
                        <label htmlFor="workPostalCode">Código postal laboral</label>
                        <input name="workPostalCode" placeholder="CP laboral" onChange={handleChange} />
                    </div>
          </div>  
          
        </Accordion>

        <Accordion title="Cobro" isActive={activeAccordion === "collection"} onToggle={() => handleToggle("collection")}>
          <div className="row">
                  <div className="form-details">
                    <label htmlFor="collectionAddress">Dirección de cobro</label>
                    <input name="collectionAddress" placeholder="Dirección de cobro" onChange={handleChange} />
                  </div>
                  <div className="form-details">
                      <label htmlFor="collectiontime">Hora preferida de cobro</label>
                      <input type="time" name="collectiontime" onChange={handleChange} />
                  </div>
            </div>
        </Accordion>

        <Accordion title="Estado del socio" isActive={activeAccordion === "state"} onToggle={() => handleToggle("state")}>
          <div className="row">
                    <div className="form-details">
                        <label htmlFor="resignationdate">Dirección de cobro</label>
                        <input type="date" name="resignationdate" onChange={handleChange} />
                    </div>
                    <div className="form-details">
                        <label htmlFor="observations">Observaciones</label>
                        <input name="observations" placeholder="Observaciones" onChange={handleChange} />
                    </div>
                    <div className="form-details">
                        <label htmlFor="idState">Estado</label>
                                <select name="idState" onChange={handleChange}>
                                  <option value="">Estado</option>
                                  <option value="1">Activo</option>
                                  <option value="2">Baja</option>
                                </select>
                    </div>
                    <div className="form-details">
                      <label htmlFor="reasonOfWithdrawal">Motivo de baja</label>
                      <select name="reasonOfWithdrawal" onChange={handleChange}>
                        <option value="">Motivo de baja</option>
                        {reasonOfWithdrawal.map(r => (
                          <option key={r.idReason} value={r.idReason}>{r.reason}</option>
                        ))}
                      </select>
                    </div>
          </div>

          
         
          
        </Accordion>
                
                
          <div className="btn-save-container">
                <Btn text="Guardar socio"  type="submit" icon={<img src={SaveIcon} alt="Guardar" />} variant="save"/>        

          </div>
        
      </form>
    </div>
  );
}
