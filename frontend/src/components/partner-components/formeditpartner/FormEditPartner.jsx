// import Btn from "../../../components/common/btn/Btn.jsx";
// import SaveIcon from '../../../assets/img/save-icon.svg';
// import Accordion from "../../generic/accordion/Accordion.jsx";
// import { useState, useEffect, useRef  } from "react";
// import "./FormEditPartner.css";
// import BackviewBtn from "../../common/backviewbtn/BackviewBtn.jsx";
// import UnpaidFees from "../../loan-components/unpaidfees/UnpaidFees.jsx";
// import { Table } from "../../common/table/Table.jsx";
// import { useEntityManagerAPI } from "../../../hooks/useEntityManagerAPI.js";
// export default function FormEditPartner({selectedPartner}) {
//   const options = ["default", "unpaidfees", "pendingbooks"];
//   const loadedRef = useRef(false);
//   const [reasonOfWithdrawal,setreasonOfWithdrawal] = useState([]);
//     const [MaritalStatuses,setMaritalStatuses] = useState([]);

//   const [activeAccordion, setActiveAccordion] = useState(null);
//   const entityManagerApi = useEntityManagerAPI("partners");

//   const [formValues, setFormValues] = useState({
//     name: "",
//     surname:  "",
//     birthDate:  "",
//     documentNumber:  "",
//     profession: "",
//     presentedBy: "",
//     nacionality:  "",
//     address: "",
//     phone: "",
//     postalcode:  "",
//     collectionAddress:  "",
//     collectiontime:  "",
//     resignationdate:  "",
//     observations: "",
//     workplace:"",
//     workAddress: "",
//     workPhone:  "",
//     workPostalCode: "",
//     collector:  "",
//     documentType:  "",
//     maritalstatus:  "",
//     category: "",
//     locality: "",
//     idState: "",
//     reasonOfWithdrawal: "",
//     registrationDate: "",
//   });

//   useEffect(() => {
//   if (selectedPartner  && !loadedRef.current) {
//     setFormValues({
//       name: selectedPartner.name || "",
//       surname: selectedPartner.surname || "",
//       birthDate: selectedPartner.birthDate || "",
//       documentNumber: selectedPartner.documentNumber || "",
//       profession: selectedPartner.profession || "",
//       presentedBy: selectedPartner.presentedBy || "",
//       nacionality: selectedPartner.nationality || "",
//       address: selectedPartner.homeAddress || "",
//       phone: selectedPartner.homePhone || "",
//       postalcode: selectedPartner.homePostalCode || "",
//       collectionAddress: selectedPartner.collectionAddress || "",
//       collectiontime: selectedPartner.preferredTime ? selectedPartner.preferredTime.slice(11,16) : "",
//       resignationdate: selectedPartner.resignationDate || "",
//       observations: selectedPartner.observations || "",
//       workplace: selectedPartner.workplace || "",
//       workAddress: selectedPartner.workAddress || "",
//       workPhone: selectedPartner.workPhone || "",
//       workPostalCode : selectedPartner.workPostalCode || "",
//       collector: selectedPartner.collector   || "",
//       documentType: selectedPartner.documentType?.toString() || "",
//       maritalstatus: selectedPartner.MaritalStatusId?.toString() || "",
//       category: selectedPartner.idCategory?.toString() || "",
//       locality: selectedPartner.LocalityId?.toString() || "",
//       idState: selectedPartner.idState?.toString() || "",
//       reasonOfWithdrawal: selectedPartner.idReason?.toString() || "",
//       registrationDate: selectedPartner.registrationDate || "",
//     });

//      loadedRef.current = true;
//   }
// }, [selectedPartner]);

//   useEffect(() => {
//     fetchReasonWithDrawal();
//     getMaritalStatuses();
//   }, []);


//   const handleToggle = (id) => {
//     setActiveAccordion(prev => prev === id ? null : id);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const updatedPartner = {
//       ...selectedPartner,
//       name: formValues.name,
//       surname: formValues.surname,
//       birthDate: formValues.birthDate,
//       documentType: Number(formValues.documentType),
//       documentNumber: formValues.documentNumber,
//       profession: formValues.profession,
//       homeAddress: formValues.address || null,
//       homePhone: formValues.phone || null,
//       homePostalCode: formValues.postalcode || null,
//       LocalityId: Number(formValues.locality) || null,
//       idCategory: Number(formValues.category) || null,
//       nationality: formValues.nacionality,
//       resignationDate: formValues.resignationdate || null,
//       observations: formValues.observations || null,
//       preferredTime: formValues.collectiontime || null,
//       presentedBy: formValues.presentedBy || null,
//       workplace: formValues.workplace || null,
//       workAddress: formValues.workAddress || null,
//       workPhone: formValues.workPhone || null,
//       workPostalCode : formValues.workPostalCode || null,
//       collectionAddress: formValues.collectionAddress || null,
//       collector: formValues.collector || null,
//       idReason:  Number(formValues.reasonOfWithdrawal)|| null,
//       idState: formValues.idState !== ""
//         ? Number(formValues.idState)
//         : null,        
//       MaritalStatusId: Number(formValues.maritalstatus) || null,

//     };

//     try {
//       const updated = await entityManagerApi.updateItem(selectedPartner.id, updatedPartner);
//       if (updated) {
//         console.log(updated)
        
//       }
//     } catch (error) {
//       alert("Error al actualizar el socio");
//     }
//   };



//   async function fetchReasonWithDrawal() {
//     try {

//       const res = await fetch(`http://localhost:4000/api/v1/reason-for-withdrawal`);
//       const json = await res.json();
//       setreasonOfWithdrawal(json);

//     } catch (error) {
//       console.error("Error al cargar cuotas impagas", error);
//     } 
//   }

//     async function getMaritalStatuses() {
//     try {

//       const res = await fetch(`http://localhost:4000/api/v1/marital-statuses`);
//       const json = await res.json();
//       setMaritalStatuses(json);

//     } catch (error) {
//       console.error("Error al cargar cuotas impagas", error);
//     } 
//   }


// function renderView(){
 
//         return (
//           <form onSubmit={handleSubmit}>
//             <Accordion
//               title="Datos personales"
//               isActive={activeAccordion === 'personaldata'}
//               onToggle={() => handleToggle('personaldata')}>

//               <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="name" className="title-name">Nombre <span className='required'>*</span></label>
//                   <input id="name" name="name" type="text" placeholder="Ingrese su nombre" onChange={handleChange} value={formValues.name}/>
//                 </div>

//                 <div className="form-details">
//                   <label htmlFor="surname">Apellido <span className='required'>*</span></label>
//                   <input id="surname" name="surname" type="text" placeholder="Ingrese su apellido" onChange={handleChange} value={formValues.surname}/>
//                 </div>
//               </div>

//               <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="birthDate">Fecha de nacimiento <span className='required'>*</span></label>
//                   <input id="birthDate" name="birthDate" type="date" onChange={handleChange} value={formValues.birthDate}/>
//                 </div>

//                 <div className="form-details">
//                   <label htmlFor="documentType">Tipo de documento <span className='required'>*</span></label>
//                   <select id="documentType" name="documentType" onChange={handleChange} value={formValues.documentType}>
//                     <option value="" disabled>Seleccione un tipo</option>
//                     <option value="1">DNI</option>
//                     <option value="2">LE (Libreta de Enrolamiento)</option>
//                     <option value="3">LC (Libreta Cívica)</option>
//                     <option value="4">Pasaporte</option>
//                     <option value="5">Otro</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="documentNumber">DNI <span className='required'>*</span></label>
//                   <input id="documentNumber" name="documentNumber" type="number" placeholder="Ingrese su DNI" onChange={handleChange} value={formValues.documentNumber}/>
//                 </div>

//                 <div className="form-details">
//                   <label htmlFor="dateofinscription">Fecha de inscripción <span className='required'>*</span></label>
//                   <input id="dateofinscription" name="registrationDate" type="date" onChange={handleChange} value={formValues.registrationDate}/>
//                 </div>
//               </div>

//               <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="maritalstatus">Estado civil <span className='required'>*</span></label>
//                   <select id="maritalstatus" name="maritalstatus" onChange={handleChange} value={formValues.maritalstatus}>
//                     <option value="" disabled>Seleccione un estado</option>
//                     {MaritalStatuses.map((status) =>(
//                       <option key={status.id} value={status.id} >{status.statusName}</option>
//                     ))}
//                   </select>
//                 </div>
              

//                 <div className="form-details">
//                   <label htmlFor="category">Categoría <span className='required'>*</span></label>
//                   <select id="category" name="category" onChange={handleChange} value={formValues.category}>
//                     <option value="" disabled>Seleccione una categoría</option>
//                     <option value="1">Regular</option>
//                     <option value="2">Honorario</option>
//                     <option value="3">Protector</option>
//                     <option value="4">Socio</option>
//                   </select>
//                 </div>
//               </div>

//             <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="profession">Profesión </label>
//                   <input id="profession" name="profession" type="text" placeholder="Ingrese su profesión" onChange={handleChange} value={formValues.profession}/>
//                 </div>

//                 <div className="form-details">
//                   <label htmlFor="presentedBy">Presentado por</label>
//                   <input id="presentedBy" name="presentedBy" type="text" placeholder="Presentado por" onChange={handleChange} value={formValues.presentedBy}/>
//                 </div>
//               </div>
//               <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="nacionality">Nacionalidad</label>
//                   <input id="nacionality" name="nacionality" type="text" placeholder="Nacionalidad" onChange={handleChange} value={formValues.nacionality}/>
//                 </div>
//               </div>
//             </Accordion>

//             <Accordion
//               title="Contacto particular"
//               isActive={activeAccordion === 'privatecontact'}
//               onToggle={() => handleToggle('privatecontact')}>

//               <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="address">Dirección <span className='required'>*</span></label>
//                   <input id="address" name="address" type="text" placeholder="Ingrese su dirección" onChange={handleChange} value={formValues.address}/>
//                 </div>

//                 <div className="form-details">
//                   <label htmlFor="phone">Teléfono <span className='required'>*</span></label>
//                   <input id="phone" name="phone" type="tel" placeholder="Ingrese su teléfono" onChange={handleChange} value={formValues.phone}/>
//                 </div>
//               </div>

//               <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="locality">Localidad <span className='required'>*</span></label>
//                   <select id="locality" name="locality" onChange={handleChange} value={formValues.locality}>
//                     <option value="" disabled>Seleccione una localidad</option>
//                     <option value="1">Tandil</option>
//                   </select>
//                 </div>

//                 <div className="form-details">
//                   <label htmlFor="postalcode">Código postal <span className='required'>*</span></label>
//                   <input id="postalcode" name="postalcode" type="text" placeholder="Ingrese el código postal" onChange={handleChange} value={formValues.postalcode}/>
//                 </div>
//               </div>
//             </Accordion>
//             <Accordion
//               title="Trabajo"
//               isActive={activeAccordion === 'work'}
//               onToggle={() => handleToggle('work')}>

//               <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="workplace">Lugar de trabajo </label>
//                   <input id="workplace" name="workplace" type="text" placeholder="Ingrese lugar de trabajo" onChange={handleChange} value={formValues.workplace}/>
//                 </div>
//                 <div className="form-details">
//                   <label htmlFor="workAddress">Dirección de trabajo </label>
//                   <input id="workAddress" name="workAddress" type="text" placeholder="Ingrese la direccion del trabajo" onChange={handleChange} value={formValues.workAddress}/>
//                 </div>

//               </div>
//                 <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="workAddress">Telefono de trabajo</label>
//                   <input id="workPhone" name="workPhone" type="text" placeholder="Ingrese el telefono de trabajo" onChange={handleChange} value={formValues.workPhone}/>
//                 </div>

//                 <div className="form-details">
//                       <label htmlFor="workPostalCode">Codigo postal trabajo </label>
//                       <input id="workPostalCode" name="workPostalCode" type="text" placeholder="Ingrese el codigo postal del trabajo" onChange={handleChange} value={formValues.workPostalCode}/>
//                 </div>
//               </div>
//             </Accordion>

//             <Accordion
//               title="Cobro"
//               isActive={activeAccordion === 'collection'}
//               onToggle={() => handleToggle('collection')}>

//               <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="collectionAddress">Dirección de cobro <span className='required'>*</span></label>
//                   <input id="collectionAddress" name="collectionAddress" type="text" placeholder="Ingrese la dirección de cobro" onChange={handleChange} value={formValues.collectionAddress}/>
//                 </div>

//                 <div className="form-details">
//                   <label htmlFor="collectiontime">Hora preferida <span className='required'>*</span></label>
//                   <input id="collectiontime" name="collectiontime" type="time" onChange={handleChange}
//                   value={formValues.collectiontime}/>
//                 </div>
//               </div>
//             </Accordion>

//             <Accordion
//               title="Estado del socio"
//               isActive={activeAccordion === 'stateofpartner'}
//               onToggle={() => handleToggle('stateofpartner')}>
              
//               <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="resignationdate">Fecha de renuncia</label>
//                   <input id="resignationdate" name="resignationdate" type="date" onChange={handleChange} value={formValues.resignationdate}/>
//                 </div>

//                 <div className="form-details">
//                   <label htmlFor="observations">Observaciones</label>
//                   <input id="observations" name="observations" type="text" className="inputobservations" onChange={handleChange} value={formValues.observations}/>
//                 </div>
//               </div>

//               <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                   <label htmlFor="idState">Estado del socio</label>
//                   <select id="idState" name="idState" onChange={handleChange} value={formValues.idState}>
//                     <option value="" disabled>Seleccione un estado</option>
//                     <option value="1">Activo</option>
//                     <option value="2">Baja</option>
//                   </select>
//                 </div>
   

              
//               </div>

//               <div className="items-info-details-form-accordion">
//                 <div className="form-details">
//                  <label htmlFor="reasonOfWithdrawal">Motivo de baja</label>
//                       <select
//                         id="reasonOfWithdrawal"
//                         name="reasonOfWithdrawal"
//                         onChange={handleChange}
//                         value={formValues.reasonOfWithdrawal}>

//                         <option value="" disabled>
//                           Seleccione un motivo
//                         </option>

//                         {reasonOfWithdrawal.map((reason) => (
//                           <option key={reason.idReason} value={reason.idReason}>
//                             {reason.reason}
//                           </option>
//                         ))}
//                       </select>
//                 </div>
//               </div>
//             </Accordion>

//             <div className="btn-list-formeditpartner">
//               <Btn
//                 text="Guardar"
//                 type="submit"
//                 icon={<div className="img-ico"><img src={SaveIcon} alt="Guardar"/></div>}
//                 variant="primary"
//               />
               
//             </div>

//           </form>
//         );
//     }
  

//   return (
//     <div className="form-edit-partner">
//       {renderView()}
//     </div>
//   );
// }

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

      alert("Socio creado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al crear socio");
    }
  };

  return (
    <div className="form-edit-partner">
      <form onSubmit={handleSubmit}>

        {/* DATOS PERSONALES */}
        <Accordion title="Datos personales" isActive={activeAccordion === "personal"} onToggle={() => handleToggle("personal")}>
          <input name="name" placeholder="Nombre" onChange={handleChange} />
          <input name="surname" placeholder="Apellido" onChange={handleChange} />
          <input type="date" name="birthDate" onChange={handleChange} />

          <select name="documentType" onChange={handleChange}>
            <option value="">Tipo documento</option>
            <option value="1">DNI</option>
            <option value="2">LE</option>
            <option value="3">LC</option>
            <option value="4">Pasaporte</option>
          </select>

          <input name="documentNumber" placeholder="Documento" onChange={handleChange} />
          <input name="profession" placeholder="Profesión" onChange={handleChange} />
          <input name="presentedBy" placeholder="Presentado por" onChange={handleChange} />
          <input name="nationality" placeholder="Nacionalidad" onChange={handleChange} />

          <select name="maritalstatus" onChange={handleChange}>
            <option value="">Estado civil</option>
            {maritalStatuses.map(m => (
              <option key={m.id} value={m.id}>{m.statusName}</option>
            ))}
          </select>

          <select name="category" onChange={handleChange}>
            <option value="">Categoría</option>
            <option value="1">Regular</option>
            <option value="2">Honorario</option>
            <option value="3">Protector</option>
            <option value="4">Socio</option>
          </select>
        </Accordion>

        {/* CONTACTO */}
        <Accordion title="Contacto" isActive={activeAccordion === "contact"} onToggle={() => handleToggle("contact")}>
          <input name="address" placeholder="Dirección" onChange={handleChange} />
          <input name="phone" placeholder="Teléfono" onChange={handleChange} />
          <input name="postalcode" placeholder="Código postal" onChange={handleChange} />

          <select name="locality" onChange={handleChange}>
            <option value="">Localidad</option>
            <option value="1">Tandil</option>
          </select>
        </Accordion>

        {/* TRABAJO */}
        <Accordion title="Trabajo" isActive={activeAccordion === "work"} onToggle={() => handleToggle("work")}>
          <input name="workplace" placeholder="Lugar de trabajo" onChange={handleChange} />
          <input name="workAddress" placeholder="Dirección laboral" onChange={handleChange} />
          <input name="workPhone" placeholder="Teléfono laboral" onChange={handleChange} />
          <input name="workPostalCode" placeholder="CP laboral" onChange={handleChange} />
        </Accordion>

        {/* COBRO */}
        <Accordion title="Cobro" isActive={activeAccordion === "collection"} onToggle={() => handleToggle("collection")}>
          <input name="collectionAddress" placeholder="Dirección de cobro" onChange={handleChange} />
          <input type="time" name="collectiontime" onChange={handleChange} />
        </Accordion>

        {/* ESTADO */}
        <Accordion title="Estado del socio" isActive={activeAccordion === "state"} onToggle={() => handleToggle("state")}>
          <input type="date" name="resignationdate" onChange={handleChange} />
          <input name="observations" placeholder="Observaciones" onChange={handleChange} />

          <select name="idState" onChange={handleChange}>
            <option value="">Estado</option>
            <option value="1">Activo</option>
            <option value="2">Baja</option>
          </select>

          <select name="reasonOfWithdrawal" onChange={handleChange}>
            <option value="">Motivo de baja</option>
            {reasonOfWithdrawal.map(r => (
              <option key={r.idReason} value={r.idReason}>{r.reason}</option>
            ))}
          </select>
        </Accordion>

        <Btn
          text="Guardar socio"
          type="submit"
          icon={<img src={SaveIcon} alt="Guardar" />}
          variant="primary"
        />
      </form>
    </div>
  );
}
