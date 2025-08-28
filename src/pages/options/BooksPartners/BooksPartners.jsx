import './BooksPartners.css';
import GenericSection from '../../../components/generic/GenericSection/GenericSection';
import calendarIcon from '../../../assets/img/calendar-icon.svg';
import Btn from '../../../components/btn/Btn';
import { useState } from 'react';
import bookIcon from '../../../assets/img/book-icon-2.svg';
import personIcon from '../../../assets/img/person-icon.svg';


export default function BooksPartners() {
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
            <GenericSection title={'Generar ranking de libros'}>
                <div className='ranking-list-container'>
                    <div className='ranking-list-content'>
                        <div className='ranking-list-title'>
                            <h2>Configuración de filtros para ranking de libros</h2>
                        </div>
                        <div className='ranking-list-filters'>
                            <form onSubmit={handleSubmit}>
                                <div className='ranking-list-filter-option'>
                                    <div className='ranking-list-filter-title'>
                                    <h3>Fecha de retiro</h3>
                                    </div>
                                    <div className='filter-options'>
                                    <div className='input'>
                                        <div className='calendar-icon'>
                                        <img src={calendarIcon} alt='calendar-icon' />
                                        </div>
                                        <label htmlFor='dateFrom'>Fecha mayor a:</label>
                                        <input type="date" name="dateFrom" id="dateFrom" />
                                    </div>
                                    </div>
                                    <div className='filter-options'>
                                    <div className='input'>
                                        <div className='calendar-icon'>
                                        <img src={calendarIcon} alt='calendar-icon' />
                                        </div>
                                        <label htmlFor='dateTo'>Fecha menor a:</label>
                                        <input type="date" name="dateTo" id="dateTo" />
                                    </div>
                                    </div>
                                </div>
                            <div className='ranking-list-filter-option'>
                                <div className='ranking-list-filter-title'>
                                    <h3>Resultado</h3>
                                </div>
                                <div className='books-partners-result'>
                                    <div className='result'>
                                        <div className='result-title'>
                                            <img src={bookIcon} alt='book-icon'/>
                                            <h4>Libros</h4>
                                        </div>
                                        <div className='result-value'>
                                            <span>5</span>
                                        </div>                                        
                                    </div>
                                    <div className='result'>
                                        <div className='result-title'>
                                            <img src={personIcon} alt='person-icon'/>
                                            <h4>Socios</h4>
                                        </div>
                                        <div className='result-value'>
                                            <span>3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                                <div className='partner-list-btn'>
                                    <Btn variant={'primary'} text={'Buscar'} type="submit" onClick={() => console.log('cambia el result')} />
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </GenericSection>
        </>
    )
}