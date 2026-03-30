import './PrintPartnerPopup.css';
import { useState, useEffect, useCallback } from 'react';
import { listOptions, sortOptions, columnsByType } from '../../../data/generatedlist/generatedList';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { useAuth } from '../../../auth/AuthContext';
import { generateUniversalPDF } from '../../../utils/pdfGenerator';

export default function PrintPartnerPopup({ categoriespartner, statespartner }) {
    const { auth } = useAuth();
    const [removePartnerReasons, setRemovePartnerReason] = useState([]);
    const [resultprint, setresultprint] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        category: '',
        idState: '',
        birthDateFrom: '',
        birthDateTo: '',
        registrationStart: '',
        registrationEnd: '',
        resignationStart: '',
        resignationEnd: '',
        removeReason: '',
        presentedBy: '',
        cduCodeMin: '',
        cduCodeMax: '',
        borrowedBooksMin: '',
        borrowedBooksMax: '',
        unpaidQuotesMin: '',
        unpaidQuotesMax: '',
        listTitle: '',
        sortBy: '',
        listType: ''
    });

    const handlePrint = () => {
        if (!resultprint || resultprint.length === 0) return;
       

                if (!resultprint || resultprint.length === 0) return;

                const title = formValues.listTitle || 'Listado de socios';
                const config = columnsByType["partner"];
                const headers = config.map(col => col.label || col.text || col.header || "Column");

                const data = resultprint.map(item => {
                    return config.map(col => {
                        const key = col.key || col.dataKey || col.field || col.accessor;
                        return item[key] ?? '';
                    });
                });

                generateUniversalPDF(title, headers, data, `report_partners`);
    };
//hacer on change


    const handleFilterChange = (e) => {
    const {name, value} = e.target;

    const newValues = {
        ...formValues,
        [name]: value
    };

    setFormValues(newValues);
    printList(newValues);
};


    useEffect(() => {
        async function loadApis(){
            try {
                const [reasonwithdrawal] = await Promise.all([
                    fetch("http://localhost:4000/api/v1/reason-for-withdrawal", {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    }), fetch("http://localhost:4000/api/v1/employees", {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    })
                ]);
                const resWithdrawal = await reasonwithdrawal.json();
                setRemovePartnerReason(resWithdrawal);
            }
            catch(e){
                console.log(e);
            }
        }
      loadApis();
    }, []);

    async function printList(data){
            try {
                setLoading(true);

                const queryParams = new URLSearchParams(data).toString();

                const res = await fetch(
                    `http://localhost:4000/api/v1/partner/printlist?${queryParams}`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    }
                );

                const reslist = await res.json();

                setresultprint(reslist.rows);
                setTotalItems(reslist.count);

            } catch(e){
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
    console.log("SUBMIT FUNCIONANDO");
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

        generateUniversalPDF(title, headers, data, `report_partners`);
    };


    useEffect(() => {
        async function loadApis() {
            try {
                const res = await fetch("http://localhost:4000/api/v1/reason-for-withdrawal", {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                const data = await res.json();
                setRemovePartnerReason(data);
            } catch (e) {
                console.error("Error loading reasons:", e);
            }
        }
        loadApis();
    }, [auth.token]);


    const printList = useCallback(async (currentFilters) => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams(
                Object.fromEntries(Object.entries(currentFilters).filter(([_, v]) => v !== ''))
            ).toString();

            const res = await fetch(
                `http://localhost:4000/api/v1/partner/printlist?${queryParams}`,
                { headers: { Authorization: `Bearer ${auth.token}` } }
            );

            const reslist = await res.json();
            setresultprint(reslist.rows || []);
            setTotalItems(reslist.count || 0);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [auth.token]);

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            printList(filters);
        }, 500); // 500ms de retraso

        return () => clearTimeout(delayDebounceFn);
    }, [filters, printList]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className='print-partners-container'>
            <div className='partner-list-container'>
                <div className='partner-list-content'>
                    <div className='partner-list-filters'>
                        <form> 
                            <div className='partner-list-filter-option'>
                                <div className='partner-list-filter-title'>
                                    <h3>Datos del socio</h3>
                                </div>
                                <div className='filter-options'>
                                    <div className='input'>
                                        <label htmlFor='category'>Categoría</label>
                                        <select id="category" name='category' value={filters.category} onChange={handleInputChange}>
                                            <option value=''>Elegir</option>
                                            {categoriespartner?.map((category, index) => (
                                                <option key={index} value={category.idCategory}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="input">
                                        <label htmlFor="idState">Estado</label>
                                        <select id="idState" name='idState' value={filters.idState} onChange={handleInputChange}>
                                            <option value=''>Estado</option>
                                            {statespartner?.map((state, index) => (
                                                <option key={index} value={state.idState}>{state.status}</option>
                                            ))}
                                        </select>
                                    </div>

                                        <div className="input">
                                            <label htmlFor="idState">Estado</label>

                                      <select id="idState" name="idState">
                                            <option value="">Estado</option>
                                            {statespartner
                                                ?.filter(state => state.status !== "Desconocido")
                                                .map((state, index) => (
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
                                                <input id="birthDateFrom" name="birthDateFrom" type="date" onChange={handleInputChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="birthDateTo">Hasta</label>
                                                <input id="birthDateTo" name="birthDateTo" type="date" onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input">
                                        <label htmlFor="presentedBy">Presentado por:</label>
                                        <input id="presentedBy" name="presentedBy" type="text" placeholder="Nombre" onChange={handleInputChange} />
                                    </div>
                                    
                                    <div className="input">
                                        <label htmlFor="removeReason">Motivo de baja</label>
                                        <select id="removeReason" name='removeReason' value={filters.removeReason} onChange={handleInputChange}>
                                            <option value=''>Elegir</option>
                                            {removePartnerReasons?.map((r) => (
                                                <option key={r.idReason} value={r.idReason}>{r.reason}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='partner-list-filter-option'>
                                <div className='partner-list-filter-title'>
                                    <h3>Opciones de listado</h3>
                                </div>
                                <div className='filter-options'>
                                    <div className="input">
                                        <label htmlFor="listTitle">Título del listado</label>
                                        <input id="listTitle" name="listTitle" type="text" placeholder="Ej: Socios activos" onChange={handleInputChange} />
                                    </div>
                                    <div className='filter-options'>
                                        <div className="input">
                                            <label htmlFor="codeCDU">CDU de libro retirados por los socio</label>
                                            <div>
                                               
                                                <input id="codeCDU" name="codeCDU" type="text" />
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
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>

            <div className='preview-list-container'>
                <GenerateListPopup 
                    dataByType={resultprint}
                    totalItems={totalItems}
                    columnsByType={columnsByType["partner"]}
                    typeList={filters.listType}
                    title={filters.listTitle}
                    loading={loading} // Ahora pasamos el estado de loading real
                    rowsPerPage={30}
                    onPrint={handlePrint}
                />
            </div>
        </div>
    );
}