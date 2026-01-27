import './PartnersBooks.css';
import { useState } from 'react';
import bookIcon from '../../../assets/img/book-icon.svg';
import personIcon from '../../../assets/img/person-icon.svg';
import Btn from '../../common/btn/Btn';

export default function PartnersBooks() {
    
    const [formValues, setFormValues] = useState({});
    const [error, setError] = useState(null);
    const [data, setData] = useState({ totalBooks: 0, totalPartners: 0 });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const values = {};

        formData.forEach((value, key) => {
            values[key] = value;
        });

        setFormValues(values);

        getQuantityPartnersBooks(values);
    };

    async function getQuantityPartnersBooks(values) {
        try {
            const params = new URLSearchParams();

            if (values.dateFrom) params.append("dateFrom", values.dateFrom);
            if (values.dateTo) params.append("dateTo", values.dateTo);

            const url = `http://localhost:4000/api/v1/books/partners-books?${params.toString()}`;

            const res = await fetch(url);

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ msg: "Error inesperado del servidor" }));
                setError(errorData.msg || "Error desconocido");
                return;
            }

            const result = await res.json();

            setData({
                totalBooks: result.totalBooks || 0,
                totalPartners: result.totalPartners || 0,
            });

        } catch (err) {
            console.error(err);
            setError("No se pudo conectar con el servidor");
        }
    }

    return (
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
                                    <span>{data.totalBooks}</span>
                                </div>
                            </div>

                            <div className='result'>
                                <div className='result-title'>
                                    <img src={personIcon} alt='person-icon' />
                                    <h4>Socios</h4>
                                </div>
                                <div className='result-value'>
                                    <span>{data.totalPartners}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='partners-books-btn'>
                        <Btn variant={'primary'} text={'Buscar'} type="submit" />
                    </div>

                </form>
            </div>
        </div>
    );
}
