import Btn from "../../../components/common/btn/Btn.jsx";
import SaveIcon from '../../../assets/img/save-icon.svg';
import Accordion from "../../generic/accordion/Accordion.jsx";
import { useState } from "react";
import "./FormEditPartner.css";
import BackviewBtn from "../../common/backviewbtn/BackviewBtn.jsx";
import UnpaidFees from "../../loan-components/unpaidfees/UnpaidFees.jsx";
import { Table } from "../../common/table/Table.jsx";
import { useEntityManagerAPI } from "../../../hooks/useEntityManagerAPI.js";
export default function FormEditPartner({selectedPartner}) {
  const options = ["default", "unpaidfees", "pendingbooks"];
  const [popupView, setPopupView] = useState(options[0]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const entityManagerApi = useEntityManagerAPI("partners");

  const [formValues, setFormValues] = useState({
    name: selectedPartner.name || "",
    surname: selectedPartner.surname || "",
    birthDate: selectedPartner.birthDate || "",
    documentType: selectedPartner.documentType || "",
    documentNumber: selectedPartner.documentNumber || "",
    profession: selectedPartner.profession || "",
    presentedBy: selectedPartner.presentedBy || "",
    maritalstatus: selectedPartner.MaritalStatusId || "",
    category: selectedPartner.idCategory || "",
    nacionality: selectedPartner.nationality || "",
    address: selectedPartner.homeAddress || "",
    phone: selectedPartner.homePhone || "",
    locality: selectedPartner.LocalityId || "",
    postalcode: selectedPartner.homePostalCode || "",
    collectionAddress: selectedPartner.collectionAddress || "",
    collectiontime: selectedPartner.preferredTime ? selectedPartner.preferredTime.slice(11,16) : "",
    reasonOfWithdrawal: selectedPartner.idReason || "",
    resignationdate: selectedPartner.resignationDate || "",
    observations: selectedPartner.observations || "",
    isActive: selectedPartner.isActive || "",
    workplace: selectedPartner.workplace || "",
    workAddress: selectedPartner.workAddress || "",
    workPhone: selectedPartner.workPhone || "",
    workPostalCode : selectedPartner.workPostalCode || "",
    collector: selectedPartner.colector   || "",
  });

  const handleToggle = (id) => {
    setActiveAccordion(prev => prev === id ? null : id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPartner = {
      ...selectedPartner,
      name: formValues.name,
      surname: formValues.surname,
      birthDate: formValues.birthDate,
      documentType: Number(formValues.documentType),
      documentNumber: formValues.documentNumber,
      profession: formValues.profession,
      homeAddress: formValues.address || null,
      homePhone: formValues.phone || null,
      homePostalCode: formValues.postalcode || null,
      LocalityId: Number(formValues.locality) || null,
      idCategory: Number(formValues.category) || null,
      nationality: formValues.nacionality,
      resignationDate: formValues.resignationdate || null,
      observations: formValues.observations || null,
      isActive: Number(formValues.isActive) === 1 ? 1 : 2,
      preferredTime: formValues.collectiontime || null,
      presentedBy: formValues.presentedBy || null,
      workplace: formValues.workplace || null,
      workAddress: formValues.workAddress || null,
      workPhone: formValues.workPhone || null,
      workPostalCode : formValues.workPostalCode || null,
      collectionAddress: formValues.collectionAddress || null,
      collector: formValues.collector || null
    };

    try {
      const updated = await entityManagerApi.updateItem(selectedPartner.id, updatedPartner);
      if (updated) {
        console.log(updated)
        alert("Socio actualizado con éxito");
      }
    } catch (error) {
      alert("Error al actualizar el socio");
    }
  };


function renderView(){
 
        return (
          <form onSubmit={handleSubmit}>
            <Accordion
              title="Datos personales"
              isActive={activeAccordion === 'personaldata'}
              onToggle={() => handleToggle('personaldata')}>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="name" className="title-name">Nombre <span className='required'>*</span></label>
                  <input id="name" name="name" type="text" placeholder="Ingrese su nombre" onChange={handleChange} value={formValues.name}/>
                </div>

                <div className="form-details">
                  <label htmlFor="surname">Apellido <span className='required'>*</span></label>
                  <input id="surname" name="surname" type="text" placeholder="Ingrese su apellido" onChange={handleChange} value={formValues.surname}/>
                </div>
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="birthDate">Fecha de nacimiento <span className='required'>*</span></label>
                  <input id="birthDate" name="birthDate" type="date" onChange={handleChange} value={formValues.birthDate}/>
                </div>

                <div className="form-details">
                  <label htmlFor="documentType">Tipo de documento <span className='required'>*</span></label>
                  <select id="documentType" name="documentType" onChange={handleChange} value={formValues.documentType}>
                    <option value="" disabled>Seleccione un tipo</option>
                    <option value="1">DNI</option>
                    <option value="2">LE (Libreta de Enrolamiento)</option>
                    <option value="3">LC (Libreta Cívica)</option>
                    <option value="4">Pasaporte</option>
                    <option value="5">Otro</option>
                  </select>
                </div>
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="documentNumber">DNI <span className='required'>*</span></label>
                  <input id="documentNumber" name="documentNumber" type="number" placeholder="Ingrese su DNI" onChange={handleChange} value={formValues.documentNumber}/>
                </div>

                <div className="form-details">
                  <label htmlFor="dateofinscription">Fecha de inscripción <span className='required'>*</span></label>
                  <input id="dateofinscription" name="registrationDate" type="date" onChange={handleChange} value={formValues.registrationDate}/>
                </div>
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="maritalstatus">Estado civil <span className='required'>*</span></label>
                  <select id="maritalstatus" name="maritalstatus" onChange={handleChange} value={formValues.maritalstatus}>
                    <option value="" disabled>Seleccione un estado</option>
                    <option value="1">Soltero/a</option>
                    <option value="2">Casado/a</option>
                    <option value="3">Divorciado/a</option>
                    <option value="4">Viudo/a</option>
                    <option value="5">Unión convivencial</option>
                  </select>
                </div>

                <div className="form-details">
                  <label htmlFor="category">Categoría <span className='required'>*</span></label>
                  <select id="category" name="category" onChange={handleChange} value={formValues.category}>
                    <option value="" disabled>Seleccione una categoría</option>
                    <option value="1">Regular</option>
                    <option value="2">Honorario</option>
                    <option value="3">Protector</option>
                    <option value="4">Socio</option>
                  </select>
                </div>
              </div>

            <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="profession">Profesión </label>
                  <input id="profession" name="profession" type="text" placeholder="Ingrese su profesión" onChange={handleChange} value={formValues.profession}/>
                </div>

                <div className="form-details">
                  <label htmlFor="presentedBy">Presentado por</label>
                  <input id="presentedBy" name="presentedBy" type="text" placeholder="Presentado por" onChange={handleChange} value={formValues.presentedby}/>
                </div>
              </div>
              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="nacionality">Nacionalidad</label>
                  <input id="nacionality" name="nacionality" type="text" placeholder="Nacionalidad" onChange={handleChange} value={formValues.nacionality}/>
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
                  <input id="address" name="address" type="text" placeholder="Ingrese su dirección" onChange={handleChange} value={formValues.address}/>
                </div>

                <div className="form-details">
                  <label htmlFor="phone">Teléfono <span className='required'>*</span></label>
                  <input id="phone" name="phone" type="tel" placeholder="Ingrese su teléfono" onChange={handleChange} value={formValues.phone}/>
                </div>
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="locality">Localidad <span className='required'>*</span></label>
                  <select id="locality" name="locality" onChange={handleChange} value={formValues.locality}>
                    <option value="" disabled>Seleccione una localidad</option>
                    <option value="1">Tandil</option>
                  </select>
                </div>

                <div className="form-details">
                  <label htmlFor="postalcode">Código postal <span className='required'>*</span></label>
                  <input id="postalcode" name="postalcode" type="text" placeholder="Ingrese el código postal" onChange={handleChange} value={formValues.postalcode}/>
                </div>
              </div>
            </Accordion>
            <Accordion
              title="Trabajo"
              isActive={activeAccordion === 'work'}
              onToggle={() => handleToggle('work')}>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="workplace">Lugar de trabajo </label>
                  <input id="workplace" name="workplace" type="text" placeholder="Ingrese lugar de trabajo" onChange={handleChange} value={formValues.workplace}/>
                </div>
                <div className="form-details">
                  <label htmlFor="workAddress">Dirección de trabajo </label>
                  <input id="workAddress" name="workAddress" type="text" placeholder="Ingrese la direccion del trabajo" onChange={handleChange} value={formValues.workAddress}/>
                </div>

              </div>
                <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="workAddress">Telefono de trabajo</label>
                  <input id="workPhone" name="workPhone" type="text" placeholder="Ingrese el telefono de trabajo" onChange={handleChange} value={formValues.workPhone}/>
                </div>

                <div className="form-details">
                      <label htmlFor="workPostalCode">Codigo postal trabajo </label>
                      <input id="workPostalCode" name="workPostalCode" type="text" placeholder="Ingrese el codigo postal del trabajo" onChange={handleChange} value={formValues.workPostalCode}/>
                </div>
              </div>
            </Accordion>

            <Accordion
              title="Cobro"
              isActive={activeAccordion === 'collection'}
              onToggle={() => handleToggle('collection')}>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="collectionAddress">Dirección de cobro <span className='required'>*</span></label>
                  <input id="collectionAddress" name="collectionAddress" type="text" placeholder="Ingrese la dirección de cobro" onChange={handleChange} value={formValues.collectionAddress}/>
                </div>

                <div className="form-details">
                  <label htmlFor="collectiontime">Hora preferida <span className='required'>*</span></label>
                  <input id="collectiontime" name="collectiontime" type="time" onChange={handleChange}
                  value={formValues.collectiontime}/>
                </div>
              </div>
            </Accordion>

            <Accordion
              title="Estado del socio"
              isActive={activeAccordion === 'stateofpartner'}
              onToggle={() => handleToggle('stateofpartner')}>
              
              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="resignationdate">Fecha de renuncia</label>
                  <input id="resignationdate" name="resignationdate" type="date" onChange={handleChange} value={formValues.resignationdate}/>
                </div>

                <div className="form-details">
                  <label htmlFor="observations">Observaciones</label>
                  <input id="observations" name="observations" type="text" className="inputobservations" onChange={handleChange} value={formValues.observations}/>
                </div>
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="isActive">Estado del socio</label>
                  <select id="isActive" name="isActive" onChange={handleChange} value={formValues.isActive}>
                    <option value="" disabled>Seleccione un estado</option>
                    <option value="1">Activo</option>
                    <option value="2">Baja</option>
                  </select>
                </div>
   

              
              </div>

              <div className="items-info-details-form-accordion">
                <div className="form-details">
                  <label htmlFor="reasonOfWithdrawal">Motivo de baja </label>
                  <select id="reasonOfWithdrawal" name="reasonOfWithdrawal" onChange={handleChange} value={formValues.reasonOfWithdrawal}>
                    <option value="" disabled>Seleccione un motivo</option>
                    <option value="1">Renunció</option>
                    <option value="2">Deuda</option>
                    <option value="3">Aumento de cuota</option>
                    <option value="4">No puede pagar</option>
                    <option value="5">De baja</option>
                    <option value="6">Sin domicilio</option>
                    <option value="7">Falleció</option>
                    <option value="8">Perdió interes</option>
                  </select>
                </div>
              </div>
            </Accordion>

            <div className="btn-list-formeditpartner">
              <Btn
                text="Guardar"
                type="submit"
                icon={<div className="img-ico"><img src={SaveIcon} alt="Guardar"/></div>}
                variant="primary"
              />
               
            </div>

          </form>
        );
    }
  

  return (
    <div className="form-edit-partner">
      {renderView()}
    </div>
  );
}

