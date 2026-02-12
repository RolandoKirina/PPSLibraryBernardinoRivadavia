import Btn from "../../../components/common/btn/Btn.jsx";
import SaveIcon from "../../../assets/img/save-icon.svg";
import Accordion from "../../generic/accordion/Accordion.jsx";
import { useState } from "react";
import "../formeditpartner/FormEditPartner.css";
import { useEntityManagerAPI } from "../../../hooks/useEntityManagerAPI.js";

export default function FormAddPartner( { onPartnerCreated } ) {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const entityManagerApi = useEntityManagerAPI("partners");

  const today = new Date().toLocaleDateString("en-CA");

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
  "name",
  "surname",
  "birthDate",
  "documentType",
  "documentNumber",
  "MaritalStatusId",
  "idCategory",
  "nationality",
  "homeAddress",
  "homePhone",
  "LocalityId",
  "homePostalCode",
  "profession",
  "collectionAddress"
];

  const formatPreferredTime = (value) => {
  if (!value) return null;
  return value.replace("T", " ");
}; 
  const handleToggle = (id) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const missingFields = requiredFields.filter(
          field => !formValues[field]
    ) ;
    if (missingFields.length > 0) {
      alert("Completá los campos obligatorios");
    return;
  }

    const payload = {
      name: formValues.name || null,
      surname: formValues.surname || null,
      birthDate: formValues.birthDate || null,
      registrationDate: formValues.registrationDate || null,
      documentType: formValues.documentType || null,
      documentNumber: formValues.documentNumber || null,
      MaritalStatusId: formValues.MaritalStatusId || null,
      idCategory: formValues.idCategory || null,
      LocalityId: formValues.LocalityId || null,
      nationality: formValues.nationality || null,
      homeAddress: formValues.homeAddress || null,
      homePhone: formValues.homePhone || null,
      homePostalCode: formValues.homePostalCode || null,
      profession: formValues.profession || null,
      presentedBy: formValues.presentedBy || null,
      collectionAddress: formValues.collectionAddress || null,
      preferredTime: formatPreferredTime(formValues.preferredTime),
      idState:1,
      unpaidFees:0,
      pendingBooks:0,
      workplace: formValues.workplace || null,
      workAddress: formValues.workAddress || null,
      workPhone: formValues.workPhone || null,
      workPostalCode: formValues.workPostalCode || null,
    };

    try {
      console.log(payload.idState)
       await entityManagerApi.createItem(payload);
  
        if (onPartnerCreated) {
            onPartnerCreated(); 
        }
        
    } catch (error) {
      console.error("ERROR:", error);
      alert("Error al crear socio");
    }
  };

  return (
    <div className="form-edit-partner">
      <form onSubmit={handleSubmit}>

        <Accordion title="Datos personales" isActive={activeAccordion === "personal"} onToggle={() => handleToggle("personal")}>
            
            <div className="row">
                  <div className="form-details">
                    <label htmlFor="name" className="title-name">Nombre <span className='required'>*</span></label>
                    <input name="name" value={formValues.name} onChange={handleChange} placeholder="Nombre" required />
                  </div>

                  <div className="form-details">
                    <label htmlFor="surname">Apellido <span className='required'>*</span></label>
                    <input name="surname" value={formValues.surname} onChange={handleChange} placeholder="Apellido" required />
                  </div>

                  <div className="form-details">
                      <label htmlFor="dateofbirthday">Fecha de nacimiento <span className='required'>*</span></label>
                      <input type="date" name="birthDate" value={formValues.birthDate} onChange={handleChange} required />
                          </div>
              <div className="form-details">
                <label htmlFor="documentType">Tipo de documento <span className='required'>*</span></label>
                <select name="documentType" value={formValues.documentType} onChange={handleChange} required>
                  <option value="">Tipo documento</option>
                  <option value="1">DNI</option>
                  <option value="2">LE</option>
                  <option value="3">LC</option>
                  <option value="4">Pasaporte</option>
              </select>
              </div>

              <div className="form-details">
              <label htmlFor="documentNumber">Numero de documento <span className='required'>*</span></label>
              <input name="documentNumber" value={formValues.documentNumber} onChange={handleChange} placeholder="Documento" required />
              </div>
            
                <div className="form-details">
                  <label htmlFor="registrationDate">Fecha de registro<span className='required'>*</span></label>
                    <input
                      type="date"
                      name="registrationDate"
                      value={formValues.registrationDate}
                      readOnly
                      
                    />
                </div>
         
          <div className="form-details" >
                              <label htmlFor="presentedby">Presentado por <span className='required'>*</span></label>
            <input name="presentedBy" value={formValues.presentedBy} onChange={handleChange} placeholder="Presentado por" required />

          </div>


             <div className="form-details" >
                              <label htmlFor="maritalstatus">Estado civil <span className='required'>*</span></label>
              <select name="MaritalStatusId" value={formValues.MaritalStatusId} onChange={handleChange} >
                      <option value="">Estado civil</option>
                      <option value="1">Soltero</option>
                      <option value="2">Casado</option>
                      <option value="3">Divorciado</option>
                      <option value="4">Viudo</option>
                    </select>
          </div>
         
          <div className="form-details">
                          <label htmlFor="category">Categoría <span className='required'>*</span></label>
                  <select name="idCategory" value={formValues.idCategory} onChange={handleChange} required>
                    <option value="">Categoría</option>
                    <option value="1">Regular</option>
                    <option value="2">Honorario</option>
                    <option value="3">Protector</option>
                    <option value="4">Socio</option>
                  </select>
          </div>

          <div className="form-details">
                    <label htmlFor="nacionality">Nacionalidad <span className='required'>*</span></label>
                    <input name="nationality"  value={formValues.nationality} onChange={handleChange} placeholder="Nacionalidad"  />
          </div>

        </div>
         
       
        </Accordion>

        <Accordion title="Contacto" isActive={activeAccordion === "contact"} onToggle={() => handleToggle("contact")}>
            
            <div className="row">
              <div className="form-details" >
                <label htmlFor="homeAddress">Direccion <span className='required'>*</span></label>
                <input name="homeAddress" value={formValues.homeAddress} onChange={handleChange} placeholder="Dirección" required/>
            </div>
            <div className="form-details" >
                <label htmlFor="homePhone">Telefono personal <span className='required'>*</span></label>
                <input name="homePhone" value={formValues.homePhone} onChange={handleChange} placeholder="Teléfono" required />
            </div>
        
            </div>
            <div className="row">
                <div className="form-details" >
                              <label htmlFor="LocalityId">Localidad <span className='required'>*</span></label>
                              <select name="LocalityId" value={formValues.LocalityId} onChange={handleChange} >
                              <option value="">Localidad</option>
                              <option value="1">Tandil</option>
                            </select>

                </div>


                <div className="form-details" >
                    <label htmlFor="homePostalCode">Codigo postal <span className='required'>*</span></label>
                    <input name="homePostalCode" value={formValues.homePostalCode} onChange={handleChange} placeholder="Código postal" />
                </div>
            </div>

         
        
        </Accordion>


        <Accordion title="Trabajo" isActive={activeAccordion === "work"} onToggle={() => handleToggle("work")}>
            
        <div className="row">
                    <div className="form-details" >
                      <label htmlFor="profession">Profesión <span className='required'>*</span></label>
                      <input name="profession" value={formValues.profession} onChange={handleChange} placeholder="Profesión"  />
                    </div>
          
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
                        <input name="workPostalCode" placeholder="CP laboral" onChange={handleChange} value={formValues.workPostalCode || ""}  />
                    </div>
          </div>  

         
        
        </Accordion>


        <Accordion title="Cobro" isActive={activeAccordion === "collection"} onToggle={() => handleToggle("collection")}>
          <div className="row">
          <div  className="form-details" >
            <label htmlFor="collectionAddress">Direccion de cobro <span className='required'>*</span></label>

            <input name="collectionAddress" value={formValues.collectionAddress} onChange={handleChange} placeholder="Dirección de cobro"  required/>

          </div>
             <div className="form-details">
                      <label htmlFor="collectiontime">Hora preferida de cobro</label> 
                      <input type="time" name="collectiontime" onChange={handleChange}  value={formValues.collectiontime || ""} required/>
              </div>

          </div>
         
        </Accordion>


<div className="btn-save-container">
       <Btn
          text="Guardar socio"
          type="submit"
          icon={<img src={SaveIcon} alt="Guardar" />}
          variant="save"
        />        


</div>
 
      </form>
    </div>
  );
}
