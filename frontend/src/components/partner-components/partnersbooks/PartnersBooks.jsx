import './PartnersBooks.css';
import { useState } from 'react';
import bookIcon from '../../../assets/img/book-icon.svg';
import personIcon from '../../../assets/img/person-icon.svg';
import Btn from '../../common/btn/Btn';

export default function PartnersBooks() {
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
            <div className='partners-books-container'>
                <div className='partners-books-filters'>
                    <form onSubmit={handleSubmit}>
                        <div className='partners-books-filter-option'>
                            <div className='partners-books-filter-title'>
                                <h3>Fecha de retiro</h3>
                            </div>
                            <div className='filter-options'>
                                <div className='input'>
                                    <label htmlFor='dateFrom'>Fecha mayor a:</label>
                                    <input type="date" name="dateFrom" id="dateFrom" />
                                </div>
                                <div className='input'>
                                    <label htmlFor='dateTo'>Fecha menor a:</label>
                                    <input type="date" name="dateTo" id="dateTo" />
                                </div>
                            </div>

                        </div>

                        <div className='partners-books-filter-result'>
                            <div className='partners-books-filter-title'>
                                <h3>Resultado</h3>
                            </div>
                            <div className='books-partners-result'>
                                <div className='result'>
                                    <div className='result-title'>
                                        <img src={bookIcon} alt='book-icon' />
                                        <h4>Libros</h4>
                                    </div>
                                    <div className='result-value'>
                                        <span>5</span>
                                    </div>
                                </div>
                                <div className='result'>
                                    <div className='result-title'>
                                        <img src={personIcon} alt='person-icon' />
                                        <h4>Socios</h4>
                                    </div>
                                    <div className='result-value'>
                                        <span>3</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='partners-books-btn'>
                            <Btn variant={'primary'} text={'Buscar'} type="submit" onClick={() => console.log('cambia el result')} />
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}