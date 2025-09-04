import './PrintPartnerPopup.css';
import Btn from '../btn/Btn';
import { mockPartnersCategory } from '../../data/mocks/partnersCategory';
import { useEntityManager } from '../../hooks/useEntityManager';
import { mockRemovePartnerReason } from '../../data/mocks/removePartnerReason';
import { useState } from 'react';
import { listOptions, sortOptions, dataByType, columnsByType } from '../../data/generatedlist/generatedList';
import GenerateListPopup from '../generatelistpopup/GenerateListPopup';

export default function PrintPartnerPopup() {
    const { items: partnerCategories } = useEntityManager(mockPartnersCategory, 'partnerCategories');
    const { items: removePartnerReasons } = useEntityManager(mockRemovePartnerReason, 'removePartnerReason');
    // const [generateListPopup, setGenerateListPopup] = useState(false);
    const [formValues, setFormValues] = useState({});

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
    setFormValues(data); // 👈 Guardás en el estado
    };

    return (
        <>
        <div className='print-partners-container'>
            <div className='partner-list-container'>
                <div className='partner-list-content'>
                    <div className='partner-list-filters'>  
                        <form onSubmit={handleSubmit}>
                            {/* Datos del socio */}
                            <div className='partner-list-filter-option'>
                                <div className='partner-list-filter-title'>
                                    <h3>Datos del socio</h3>
                                </div>
                                <div className='filter-options'>

                                    <div className='input'>
                                        <label htmlFor='category'>Categoría</label>
                                        <label className='exclude'>
                                            <input type="checkbox" name="excludeCategory" />
                                            Excluir
                                        </label>
                                        <select id="category" name='category'>
                                            <option value=''>Elegir</option>
                                            {partnerCategories.map((category, index) => (
                                            <option key={index} value={category.category}>
                                                {category.category}
                                            </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="input">
                                    <label htmlFor="status">Estado</label>
                                    <label className='exclude'>
                                        <input type="checkbox" name="excludeStatus" />
                                        Excluir
                                    </label>
                                    <select id="status" name='status'>
                                        <option value=''>Elegir</option>
                                        <option value="active">Activo</option>
                                        <option value="inactive">De baja</option>
                                    </select>
                                    </div>

                                    <div className="input birthDate-checkbox">
                                    <label htmlFor="birthDate">Fecha de nacimiento</label>
                                    <label className='exclude'>
                                        <input type="checkbox" name="excludeBirthDate" />
                                        Excluir
                                    </label>
                                    <div>
                                        <label className='exclude'>
                                        <input type="checkbox" name="afterBirth" />
                                        Mayor a:
                                        </label>
                                        <label className='exclude'>
                                        <input type="checkbox" name="beforeBirth" />
                                        Menor a:
                                        </label>
                                    </div>
                                    <input id="birthDate" name="birthDate" type="date"/>
                                    </div>      

                                    <div className="input registration-resignation">
                                    <label>Fecha de ingreso</label>
                                    <label className='exclude'>
                                        <input type="checkbox" name="excludeRegistration" />
                                        Excluir
                                    </label>
                                    <div>
                                        <span>Entre: </span>
                                        <input id="registrationStart" name="registrationStart" type="date"/>
                                        <span>y</span>
                                        <input id="registrationEnd" name="registrationEnd" type="date"/>
                                    </div>
                                    </div>  

                                    <div className="input registration-resignation">
                                    <label>Fecha de renuncia</label>
                                    <label className='exclude'>
                                        <input type="checkbox" name="excludeResignation" />
                                        Excluir
                                    </label>
                                    <div>
                                        <span>Entre: </span>
                                        <input id="resignationStart" name="resignationStart" type="date"/>
                                        <span>y</span>
                                        <input id="resignationEnd" name="resignationEnd" type="date"/>
                                    </div>
                                    </div>     

                                    <div className="input">
                                    <label htmlFor="removeReason">Motivo de baja</label>
                                    <label className='exclude'>
                                        <input type="checkbox" name="excludeRemoveReason" />
                                        Excluir
                                    </label>
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
                                    <label className='exclude'>
                                        <input type="checkbox" name="excludePresentedBy" />
                                        Excluir
                                    </label>
                                    <input id="presentedBy" name="presentedBy" type="text" placeholder="Nombre"/>
                                    </div>   


                                </div>
                            </div>

                            {/* Actividad */}
                            <div className='partner-list-filter-option'>
                                <div className='partner-list-filter-title'>
                                    <h3>Actividad en la biblioteca</h3>
                                </div>
                                <div className='filter-options'>
                                    <div className="input">
                                        <label htmlFor="cduCode">CDU de libros retirados por el socio</label>
                                        <div>
                                            <input id="cduCodeMin" name="cduCodeMin" type="number" />
                                            <input id="cduCodeMax" name="cduCodeMax" type="number" />
                                        </div>
                                    </div>
                                    <div className="input">
                                        <label htmlFor="borrowedBooks">Cantidad de libros retirados</label>
                                        <label className='exclude'>
                                            <input type="checkbox" name="excludeBorrowedBooks" />
                                            Excluir
                                        </label>
                                        <div>
                                            <span>Más de: </span>
                                            <input type="number" id="borrowedBooksMin" name="borrowedBooksMin" />
                                        </div>
                                        <div>
                                            <span>Y menos de: </span>
                                            <input type="number" id="borrowedBooksMax" name="borrowedBooksMax" />
                                        </div>
                                    </div>        
                                </div>
                            </div>

                            {/* Estado de la cuenta */}
                            <div className='partner-list-filter-option'>
                                <div className='partner-list-filter-title'>
                                    <h3>Estado de la cuenta</h3>
                                </div>
                                <div className='filter-options'>
                                    <div className="input">
                                        <label htmlFor="unpaidQuotes">Cuotas impagas</label>
                                        <label  className='exclude'>
                                            <input type="checkbox" name="excludeUnpaidQuotes" />
                                            Excluir
                                        </label>
                                        <div>
                                            <span>Más de: </span>
                                            <input type="number" id="unpaidQuotesMin" name="unpaidQuotesMin" />
                                        </div>
                                        <div>
                                            <span>Y menos de: </span>
                                            <input type="number" id="unpaidQuotesMax" name="unpaidQuotesMax" />
                                        </div>
                                    </div>   
                                </div>
                            </div>    

                            {/* Opciones de listado */}
                            <div className='partner-list-filter-option'>
                                <div className='partner-list-filter-title'>
                                    <h3>Opciones de listado</h3>
                                </div>
                                <div className='filter-options'>
                                    <div className='listTitleInput'>
                                        <div className="input">
                                            <label htmlFor="listTitle">Título del listado</label>
                                            <input id="listTitle" name="listTitle" type="text" placeholder="Ej: Socios activos 2025"/>
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
                                <Btn variant={'primary'} text={'Generar'} type="submit"/>              
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