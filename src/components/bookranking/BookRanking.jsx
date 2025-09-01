import './BookRanking.css';
import calendarIcon from '../../assets/img/calendar-icon.svg';
import Btn from '../btn/Btn';
import { useState } from 'react';
import GenerateListPopup from '../generatelistpopup/GenerateListPopup';
import { dataByType, columnsByType } from '../../data/generatedlist/generatedList';


export default function BookRanking() {
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

        setFormValues(data);
        console.log("Formulario:", data);
    };

    return (
        <>
            <div className='book-ranking-container'>
                    <div className='ranking-list-content'>
                        <div className='ranking-list-filters'>
                            <form onSubmit={handleSubmit}>
                                <div className='ranking-list-filter-option'>
                                    <div className='ranking-list-filter-title'>
                                    <h3>Fecha de retiro</h3>
                                    </div>
                                    <div className='filter-options'>
                                    <div className='input column-input'>
                                        {/* <div className='calendar-icon'>
                                        <img src={calendarIcon} alt='calendar-icon' />
                                        </div> */}
                                        <label htmlFor='dateFrom'>Fecha mayor a:</label>
                                        <input type="date" name="dateFrom" id="dateFrom" />
                                    </div>
                                    </div>
                                    <div className='filter-options'>
                                    <div className='input column-input'>
                                        {/* <div className='calendar-icon'>
                                        <img src={calendarIcon} alt='calendar-icon' />
                                        </div> */}
                                        <label htmlFor='dateTo'>Fecha menor a:</label>
                                        <input type="date" name="dateTo" id="dateTo" />
                                    </div>
                                    </div>
                                    <div className='ranking-list-filter-title'>
                                    <h3>Datos del libro</h3>
                                    </div>
                                    <div className='filter-options'>
                                    <div className='input column-input'>
                                        <label htmlFor='codeCDU1'>CDU de libros retirados por el socio</label>
                                        <div>
                                        <input type="text" name="codeCDU1" id="codeCDU1" className='codeCDU' />
                                        <input type="text" name="codeCDU2" id="codeCDU2" className='codeCDU2' />
                                        </div>
                                    </div>
                                    </div>
                                    <div className='filter-options'>
                                    <div className='input column-input'>
                                        <label htmlFor='bookCode'>Codigo de libros retirados</label>
                                        <div>
                                        <input type="text" name="bookCode" id="bookCode" />
                                        </div>
                                    </div>
                                    </div>
                                    <div className='ranking-list-filter-title'>
                                    <h3>Ordenamiento</h3>
                                    </div>
                                    <div className='filter-options'>
                                    <div className='input column-input'>
                                        <label htmlFor='orderBy'>Ordenar por:</label>
                                        <select className='order-by-select' id="orderBy" name='orderBy'>
                                        <option value=''>Elegir</option>
                                        <option value="active">Activo</option>
                                        <option value="inactive">De baja</option>
                                        </select>
                                    </div>
                                    </div>
                                    <div className='filter-options'>
                                    <div className='radio-inputs'>
                                        <label>
                                        <input type="radio" name="orderDirection" value="asc" />
                                        Ascendente
                                        </label>

                                        <label>
                                        <input type="radio" name="orderDirection" value="desc" />
                                        Descendente
                                        </label>
                                    </div>
                                    </div>
                                </div>
                                <div className='partner-list-btn'>
                                    <Btn variant={'primary'} text={'Generar'} type="submit" onClick={console.log("generated")} />
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className='preview-list-container'>
                            <GenerateListPopup dataByType={dataByType} columnsByType={columnsByType} typeList={'BookRanking'} title={formValues.listTitle}/>
                    </div>               
            </div>
        </>
    )
}