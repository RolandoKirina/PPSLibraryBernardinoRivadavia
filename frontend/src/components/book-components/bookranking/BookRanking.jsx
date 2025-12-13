import './BookRanking.css';
import Btn from '../../common/btn/Btn';
import { useState } from 'react';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { dataByType, columnsByType } from '../../../data/generatedlist/generatedList';


export default function BookRanking() {
    const [formValues, setFormValues] = useState({});
    const [error, setError] = useState(null);
    const [rankingData, setrankingData] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const values = {};

        formData.forEach((value, key) => {
        values[key] = value;
        });

        setFormValues(values);
        getBookRanking(values);
        console.log("Formulario:", values);
    };

    async function getBookRanking(values) {
        try {
            const params = new URLSearchParams();

            if (values.dateFrom) params.append("dateFrom", values.dateFrom);
            if (values.dateTo) params.append("dateTo", values.dateTo);
            if (values.codeCDU) params.append("codeCDU", values.codeCDU);
            if (values.bookCode) params.append("bookCode", values.bookCode);
            if (values.orderBy) params.append("orderBy", values.orderBy);
            if (values.orderDirection) params.append("orderDirection", values.orderDirection);

            const url = `http://localhost:4000/api/v1/books/ranking?${params.toString()}`;
        
            console.log("URL generada:", url);

            const res = await fetch(url);

            console.log(res)
            if (!res.ok) {
            const errorData = await res.json().catch(() => ({ msg: "Error inesperado del servidor" }));
            setError(errorData.msg || "Error desconocido");
            return;
            }

            const rankingData = await res.json();
            setrankingData(rankingData);

        } catch (err) {
            setError("No se pudo conectar con el servidor");
        }
    }

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
                                       
                                        <label htmlFor='dateFrom'>Fecha mayor a:</label>
                                        <input type="date" name="dateFrom" id="dateFrom" />
                                    </div>
                                </div>
                                <div className='filter-options'>
                                    <div className='input column-input'>
                                   
                                        <label htmlFor='dateTo'>Fecha menor a:</label>
                                        <input type="date" name="dateTo" id="dateTo" />
                                    </div>
                                </div>
                                <div className='ranking-list-filter-title'>
                                    <h3>Datos del libro</h3>
                                </div>
                                <div className='filter-options'>
                                    <div className='input column-input'>
                                        <label htmlFor='codeCDU'>CDU de libros retirados por el socio</label>
                                        <div>
                                            <input type="text" name="codeCDU" id="codeCDU" className='codeCDU' />
                    
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
                                            <option value="codeCDU">CDU</option>
                                            <option value="codeInventory">Codigo</option>
                                            <option value="title">Titulo</option>                                          
                                            <option value="Cantidad">Cantidad</option>


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
                                <Btn variant={'primary'} text={'Generar'} type="submit"  />
                            </div>
                        </form>

                    </div>
                </div>
                <div className='preview-list-container'>
                    <GenerateListPopup 
                        dataByType={rankingData}
                        columnsByType={columnsByType["BookRanking"]}
                        typeList={'BookRanking'} 
                        title={formValues.listTitle} 
                        />
                </div>
            </div>
        </>
    )
}