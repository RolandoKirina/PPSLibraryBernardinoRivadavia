import './FeesBetweenDates.css';
import Btn from '../../common/btn/Btn';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { feesBetweenDatesListOptions, dataByType, columnsByType } from '../../../data/generatedlist/generatedList';
import { useState } from 'react';

export default function FeesBetweenDates() {
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
            <div className='fees-between-dates-container'>
                <div className='fees-between-dates-content'>
                    <div className='fees-between-dates-filters'>
                        <form onSubmit={handleSubmit}>
                            <div className='fees-between-dates-filter-option'>
                                <div className='fees-between-dates-filter-title'>
                                    <h3>Fechas</h3>
                                </div>
                                <div className='filter-options'>
                                    <div className='input'>
                                        <label htmlFor='beforeDate'>Entre el día: </label>
                                        <input id="" name="beforeDate" type="date" />
                                    </div>
                                    <div className='input'>
                                        <label htmlFor='afterDate'>y el día: </label>
                                        <input id="" name="afterDate" type="date" />
                                    </div>
                                </div>
                            </div>

                            {/* Opciones de listado */}
                            <div className='fees-between-dates-filter-option'>
                                <div className='fees-between-dates-filter-title'>
                                    <h3>Opciones de listado</h3>
                                </div>
                                <div className='filter-options'>
                                    <div className="input">
                                        <label htmlFor="listType">Tipo de listado</label>
                                        <select id="listType" name='listType'>
                                            <option value=''>Elegir</option>
                                            {feesBetweenDatesListOptions.map((listOption, index) => (
                                                <option key={index} value={listOption.value}>{listOption.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='fees-between-dates-btn'>
                                <Btn variant={'primary'} text={'Generar'} type="submit" />
                            </div>
                        </form>
                    </div>
                </div>

                <div className='preview-list-container'>
                    {/* añadir entre y - fechas por encima de la tabla */}
                    <GenerateListPopup
                        dataByType={dataByType}
                        columnsByType={columnsByType}
                        typeList={formValues.listType ? formValues.listType : 'TypeOneFees'}
                        title={formValues.listTitle}
                        feeDates={{
                            beforeDate: formValues.beforeDate,
                            afterDate: formValues.afterDate
                        }}
                    />
                </div>
            </div>

        </>
    )
}