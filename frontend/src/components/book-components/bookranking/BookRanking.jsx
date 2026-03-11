import './BookRanking.css';
import { useEffect, useState, useCallback } from 'react';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { columnsByType } from '../../../data/generatedlist/generatedList';
import { useAuth } from '../../../auth/AuthContext';
import { generateUniversalPDF } from '../../../utils/pdfGenerator';

export default function BookRanking() {
    const BASE_URL = "http://localhost:4000/api/v1";
    const { auth } = useAuth();
    const chunkSize = 10000;
    const rowsPerPage = 35;
    const type = "BookRanking";


    const [formValues, setFormValues] = useState({
        orderDirection: 'desc',
        orderBy: 'Cantidad'
    });
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [resetPageTrigger, setResetPageTrigger] = useState(0);


    const getBookRanking = useCallback(async (values, { limit, offset }, append = false) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();

            if (values.dateFrom) params.append("dateFrom", values.dateFrom);
            if (values.dateTo) params.append("dateTo", values.dateTo);
            if (values.codeCDU) params.append("codeCDU", values.codeCDU);
            if (values.bookCode) params.append("bookCode", values.bookCode);
            if (values.orderBy) params.append("orderBy", values.orderBy);
            if (values.orderDirection) params.append("orderDirection", values.orderDirection);

            params.append("limit", limit);
            params.append("offset", offset);

            const url = `${BASE_URL}/books/ranking?${params.toString()}`;

            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                }
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ msg: "Error del servidor" }));
                setError(errorData.msg || "Error desconocido");
                return;
            }

            const data = await res.json();
            setItems(prev => append ? [...prev, ...data.rows] : data.rows);
            setTotalItems(data.count);
            setError(null);
        } catch (err) {
            setError("No se pudo conectar con el servidor");
        } finally {
            setLoading(false);
        }
    }, [auth.token]);


    useEffect(() => {
        const timer = setTimeout(() => {
            setResetPageTrigger(prev => prev + 1);
            getBookRanking(formValues, { limit: chunkSize, offset: 0 }, false);
        }, 500); // 500ms de espera

        return () => clearTimeout(timer);
    }, [formValues, getBookRanking]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePrint = () => {
        if (items.length === 0) return;
        const title = "Ranking de libros más retirados";
        const config = columnsByType[type];
        const headers = config.map(col => col.label || col.text || col.header || "Columna");
        const data = items.map(item => config.map(col => {
            const key = col.key || col.dataKey || col.field || col.accessor;
            return item[key] ?? '';
        }));
        generateUniversalPDF(title, headers, data, `ranking_libros`);
    };

    async function handleChangePage(page) {
        const numberPage = Number(page);
        const lastItemIndex = numberPage * rowsPerPage;

        if (items.length < totalItems && lastItemIndex > items.length) {
            const newOffset = items.length;
            await getBookRanking(formValues, { limit: chunkSize, offset: newOffset }, true);
        }
    }

    return (
        <div className='book-ranking-container'>
            <div className='ranking-list-content'>
                <div className='ranking-list-filters'>
                    <form onSubmit={(e) => e.preventDefault()}> 
                        <div className='ranking-list-filter-option'>
                            <div className='ranking-list-filter-title'>
                                <h3>Fecha de retiro</h3>
                            </div>
                            <div className='filter-options'>
                                <div className='input column-input'>
                                    <label htmlFor='dateFrom'>Fecha mayor a:</label>
                                    <input type="date" name="dateFrom" id="dateFrom" onChange={handleInputChange} />
                                </div>
                                <div className='input column-input'>
                                    <label htmlFor='dateTo'>Fecha menor a:</label>
                                    <input type="date" name="dateTo" id="dateTo" onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className='ranking-list-filter-title'>
                                <h3>Datos del libro</h3>
                            </div>
                            <div className='filter-options'>
                                <div className='input column-input'>
                                    <label htmlFor='codeCDU'>CDU de libros retirados</label>
                                    <input type="text" name="codeCDU" id="codeCDU" className='codeCDU' onChange={handleInputChange} />
                                </div>
                                <div className='input column-input'>
                                    <label htmlFor='bookCode'>Código de libros</label>
                                    <input type="text" name="bookCode" id="bookCode" onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className='ranking-list-filter-title'>
                                <h3>Ordenamiento</h3>
                            </div>
                            <div className='filter-options'>
                                <div className='input column-input'>
                                    <label htmlFor='orderBy'>Ordenar por:</label>
                                    <select className='order-by-select' id="orderBy" name='orderBy' value={formValues.orderBy} onChange={handleInputChange}>
                                        <option value="codeCDU">CDU</option>
                                        <option value="codeInventory">Código</option>
                                        <option value="title">Título</option>
                                        <option value="Cantidad">Cantidad de retiros</option>
                                    </select>
                                </div>
                                <div className='radio-inputs'>
                                    <label>
                                        <input type="radio" name="orderDirection" value="asc" checked={formValues.orderDirection === 'asc'} onChange={handleInputChange} /> Ascendente
                                    </label>
                                    <label>
                                        <input type="radio" name="orderDirection" value="desc" checked={formValues.orderDirection === 'desc'} onChange={handleInputChange} /> Descendente
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className='preview-list-container'>
                <GenerateListPopup
                    dataByType={items}
                    totalItems={totalItems}
                    columnsByType={columnsByType[type]}
                    typeList={type}
                    title={'Ranking de libros más retirados'}
                    handleChangePage={handleChangePage}
                    loading={loading}
                    resetPageTrigger={resetPageTrigger}
                    rowsPerPage={rowsPerPage}
                    onPrint={handlePrint}
                />
                {error && <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </div>
        </div>
    );
}