import './PrintPartnerPopup.css';
import Btn from '../../common/btn/Btn';
//import { mockPartnersCategory } from '../../../data/mocks/partnersCategory';
//import { mockRemovePartnerReason } from '../../../data/mocks/removePartnerReason';
import { useState } from 'react';
import { listOptions, sortOptions, dataByType, columnsByType } from '../../../data/generatedlist/generatedList';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { useEffect } from 'react';

export default function PrintPartnerPopup({categoriespartner, statespartner}) {

    const [removePartnerReasons,setRemovePartnerReason] = useState([]);
    const [employees,setEmployees] = useState([]);
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        async function loadApis(){
            try {
                const [reasonwithdrawal, resEmployees] = await Promise.all([
                    fetch("http://localhost:4000/api/v1/reason-for-withdrawal"),
                    fetch("http://localhost:4000/api/v1/employees")
                ]); 
                const resWithdrawal = await reasonwithdrawal.json();
                const resEmployeesJson = await resEmployees.json();
                setRemovePartnerReason(resWithdrawal);
                setEmployees(resEmployeesJson);
            }
            catch(e){
                console.log(e);
            }
        }
      loadApis();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};

        formData.forEach((value, key) => {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        });

        console.log("Formulario:", data);
        setFormValues(data);
    };

    return (
        <>
            <div className='print-partners-container'>
                <div className='partner-list-container'>
                    <div className='partner-list-content'>
                        <div className='partner-list-filters'>
                            <form onSubmit={handleSubmit}>
                                <div className='partner-list-filter-option'>
                                    <div className='partner-list-filter-title'>
                                        <h3>Datos del socio</h3>
                                    </div>
                                    <div className='filter-options'>

                                        <div className='input'>
                                            <label htmlFor='category'>Categoría</label>
                                            <select id="category" name='category'>
                                                <option value=''>Elegir</option>
                                                {categoriespartner?.map((category, index) => (
                                                    <option key={index} value={category.idCategory}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="input">
                                            <label htmlFor="status">Estado</label>

                                            <select id="status" name='status'>
                                                <option value=''>Estado</option>
                                                {statespartner?.map((state,index) => (
                                                    <option key={index} value={state.idState}>
                                                        {state.status}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                      <div className="input birthDate-range">
                                            <label>Fecha de nacimiento</label>

                                            <div className="date-range">
                                                <div>
                                                <label htmlFor="birthDateFrom">Desde</label>
                                                <input
                                                    id="birthDateFrom"
                                                    name="birthDateFrom"
                                                    type="date"
                                                />
                                                </div>

                                                <div>
                                                <label htmlFor="birthDateTo">Hasta</label>
                                                <input
                                                    id="birthDateTo"
                                                    name="birthDateTo"
                                                    type="date"
                                                />
                                                </div>
                                            </div>
                                    </div>
                                    <div className="input registration-resignation">
                                            <label>Fecha de ingreso</label>
                                            <div>
                                                <label htmlFor="registrationStart">Desde</label>
                                                <input id="registrationStart" name="registrationStart" type="date" />
                                                <label htmlFor="registrationEnd">Desde</label>
                                                <input id="registrationEnd" name="registrationEnd" type="date" />
                                            </div>
                                        </div>

                                        <div className="input registration-resignation">
                                            <label>Fecha de renuncia</label>
                                            <div>
                                                <label htmlFor="resignationStart">Desde:</label> 
                                                <input id="resignationStart" name="resignationStart" type="date" />
                                                <label htmlFor="resignationEnd">Hasta:</label> 
                                                <input id="resignationEnd" name="resignationEnd" type="date" />
                                            </div>
                                        </div>

                                        <div className="input">
                                            <label htmlFor="removeReason">Motivo de baja</label> 
                                            <select id="removeReason" name='removeReason'>
                                                <option value=''>Elegir</option>
                                                {removePartnerReasons.map((removeReason, index) => (
                                                    <option key={index} value={removeReason.reason}>
                                                        {removeReason.reason}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="input">
                                            <label htmlFor="presentedBy">Presentado por:</label>
                                            <input id="presentedBy" name="presentedBy" type="text" placeholder="Nombre" />
                                        </div>

                                    </div>
                                </div>

                                <div className='partner-list-filter-option'>
                                    <div className='partner-list-filter-title'>
                                        <h3>Actividad en la biblioteca</h3>
                                    </div>
                                    <div className='filter-options'>
                                        <div className="input">
                                            <label htmlFor="cduCode">CDU de libros retirados por los socio</label>
                                            <div>
                                                <input id="cduCodeMin" name="cduCodeMin" type="number" />
                                                <input id="cduCodeMax" name="cduCodeMax" type="number" />
                                            </div>
                                        </div>
                                        <div className="input">
                                            <label htmlFor="borrowedBooks">Cantidad de libros retirados</label>
                                           
                                            <div>
                                                <label htmlFor="borrowedBooksMin">Más de</label>
                                                <input type="number" id="borrowedBooksMin" name="borrowedBooksMin" />
                                            </div>
                                            <div>
                                                <label htmlFor="borrowedBooksMax">Y menos de:</label>
                                                <input type="number" id="borrowedBooksMax" name="borrowedBooksMax" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='partner-list-filter-option'>
                                    <div className='partner-list-filter-title'>
                                        <h3>Estado de la cuenta</h3>
                                    </div>
                                    <div className='filter-options'>
                                        <div className="input">
                                            <label htmlFor="unpaidQuotes">Cuotas impagas</label>
                                            <div>
                                                <label htmlFor="unpaidQuotesMin">Minimo </label>
                                                <input type="number" id="unpaidQuotesMin" name="unpaidQuotesMin" />
                                            </div>
                                            <div>
                                                <label htmlFor="unpaidQuotesMax">Maximo</label>
                                                <input type="number" id="unpaidQuotesMax" name="unpaidQuotesMax" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='partner-list-filter-option'>
                                    <div className='partner-list-filter-title'>
                                        <h3>Opciones de listado</h3>
                                    </div>
                                    <div className='filter-options'>
                                        <div className='listTitleInput'>
                                            <div className="input">
                                                <label htmlFor="listTitle">Título del listado</label>
                                                <input id="listTitle" name="listTitle" type="text" placeholder="Ej: Socios activos 2025" />
                                            </div>
                                        </div>
                                        <div className="input">
                                            <label htmlFor="orderBy">Ordenado por: </label>
                                            <select id="orderBy" name='orderBy'>
                                                <option value=''>Elegir</option>
                                                {sortOptions.map((sortOption, index) => (
                                                    <option key={index} value="sortOption.value">{sortOption.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="input">
                                            <label htmlFor="listType">Tipo de listado</label>
                                            <select id="listType" name='listType'>
                                                <option value=''>Elegir</option>
                                                {listOptions.map((listOption, index) => (
                                                    <option key={index} value={listOption.value}>{listOption.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className='partner-list-btn'>
                                    <Btn variant={'primary'} text={'Generar'} type="submit" />
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
                <div className='preview-list-container'>
                    <GenerateListPopup dataByType={dataByType} columnsByType={columnsByType} typeList={formValues.listType ? formValues.listType : 'TypeOne'} title={formValues.listTitle} />
                </div>
            </div>

        </>
    )
}