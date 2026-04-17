import { useState, useEffect, useCallback, useMemo } from 'react';
import './PrintPartnerPopup.css';

import { listOptions, sortOptions, columnsByType } from '../../../data/generatedlist/generatedList';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { useAuth } from '../../../auth/AuthContext';
import { generateUniversalPDF } from '../../../utils/pdfGenerator';

export default function PrintPartnerPopup({ categoriespartner = [], statespartner = [] }) {
    const { auth } = useAuth();
    const [removePartnerReasons, setRemovePartnerReason] = useState([]);
    const [resultprint, setresultprint] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
       const chunkSize = 10000;
    const rowsPerPage =35;
    const unknown = "Desconocido";

    /*const listTypesConfig = {
    'TypeOne': ["partnerNumber", "surname", "name", "homeAddress", "homePhone", "unpaidFees", "pendingBooks", "registrationDate"],
    'TypeTwo': ["partnerNumber", "surname", "name", "homeAddress", "homePhone", "isActive", "registrationDate"],
    'TypeThree': ["partnerNumber", "surname", "name", "homeAddress", "homePhone", "withdrawalDate", "idReason"],
    'TypeFour': ["partnerNumber", "surname", "name", "homeAddress", "homePhone", "presentedBy", "registrationDate"]
    };*/


    const listTypes = [
        {
            value: "basic",
            label: "Número - Nombre - Apellido - Dirección - Teléfono - Estado - Fecha inscripción",
            columns: ["partnerNumber", "name", "surname", "homeAddress", "homePhone", "isActive", "registrationDate"]
        },
        {
            value: "withWithdrawal",
            label: "Número - Nombre - Apellido - Dirección - Teléfono - Estado - Fecha baja - Motivo",
            columns: ["partnerNumber", "name", "surname", "homeAddress", "homePhone", "isActive", "withdrawalDate", "idReason"]
        },
        {
            value: "presentedBy",
            label: "Número - Nombre - Apellido - Dirección - Teléfono - Estado - Presentado por - Fecha inscripción",
            columns: ["partnerNumber", "name", "surname", "homeAddress", "homePhone", "isActive", "presentedBy", "registrationDate"]
        },
        {
            value: "stats",
            label: "Número - Nombre - Apellido - Dirección - Teléfono - Estado - Cuotas impagas - Libros pendientes",
            columns: ["partnerNumber", "name", "surname", "homeAddress", "homePhone", "isActive", "unpaidFees", "pendingBooks"]
        }
    ];

    const [filters, setFilters] = useState({
        category: '',
        idState: '',
        birthDateFrom: '',
        birthDateTo: '',
        registrationStart: '',
        registrationEnd: '',
        resignationStart: '',
        resignationEnd: '',
        idReason: '',
        presentedBy: '',
        cduCodeMin: '',
        cduCodeMax: '',
        borrowedBooksMin: '',
        borrowedBooksMax: '',
        unpaidQuotesMin: '',
        unpaidQuotesMax: '',
        listTitle: '',
        sortBy: '',
        direction: 'asc',
        listType: 'basic',
        limit: chunkSize,
        offset: 0
    });

const getColumnKey =(col) =>
  col.key ||
  col.dataKey ||
  col.field ||
  (typeof col.accessor === "string" ? col.accessor : undefined);


    const dynamicColumns = useMemo(() => {
        const allColumns = columnsByType?.["partner"] || [];

        const selectedType = listTypes.find(t => t.value === filters.listType);

        if (!selectedType) return allColumns;

        return allColumns.filter(col =>
            selectedType.columns.includes(col.accessor)
        );
    }, [filters.listType]);


    const printList = useCallback(async (currentFilters) => {
        try {
            setLoading(true);
            // Limpiamos filtros vacíos
            const cleanFilters = Object.fromEntries(
                Object.entries(currentFilters).filter(([_, v]) => v !== '' && v !== null)
            );
            
            const queryParams = new URLSearchParams(cleanFilters).toString();

            const res = await fetch(
                `http://localhost:4000/api/v1/partners/printlist?${queryParams}`,
                { headers: { Authorization: `Bearer ${auth.token}` } }
            );

            if (!res.ok) throw new Error("Error en la respuesta del servidor");

            const reslist = await res.json();
            console.log(reslist);
            setresultprint(reslist.rows || []);
            setTotalItems(reslist.count || 0);
        } catch (e) {
            console.error("Error fetching list:", e);
        } finally {
            setLoading(false);
        }
    }, [auth.token]);

    const handlePrint = () => {
        if (!resultprint.length || !dynamicColumns.length) return;

        const title = filters.listTitle || 'Listado de socios';
        const headers = dynamicColumns.map(col => col.header || "Columna");
        
        const data = resultprint.map(item => 
         dynamicColumns.map(col => item[col.accessor] ?? '')
        );

        generateUniversalPDF(title, headers, data, `report_partners`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            printList(filters);
        }, 500);
        return () => clearTimeout(timeout);
    }, [filters, printList]);

    useEffect(() => {
        async function loadReasons() {
            try {
                const res = await fetch("http://localhost:4000/api/v1/reason-for-withdrawal", {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                const data = await res.json();
                setRemovePartnerReason(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error("Error loading reasons:", e);
            }
        }
        if (auth.token) loadReasons();
    }, [auth.token]);

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

                                        <select id="idState" name="idState" value={filters.idState} onChange={handleInputChange}>
                                            <option value="">Estado</option>
                                            {statespartner
                                                ?.filter(state => state.status !== unknown)
                                                .map((state, index) => (
                                                    <option key={index} value={state.idState}>
                                                        {state.status}
                                                    </option>
                                                ))}
                                        </select >
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
                                        <label htmlFor="idReason">Motivo de baja</label>
                                        <select
                                            id="idReason"
                                            name='idReason'
                                            value={filters.idReason}
                                            onChange={handleInputChange}
                                        >
                                            <option value=''>Elegir</option>

                                            {removePartnerReasons
                                                ?.filter(r => r.reason !== "Desconocido")
                                                .map((r) => (
                                                    <option key={r.idReason} value={r.idReason}>
                                                        {r.reason}
                                                    </option>
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
                                    <div className="input">
                                        <label htmlFor="codeCDU">CDU de libro que ha sido retirado por los socios</label>
                                        <div>

                                            <input
                                                id="codeCDU"
                                                name="codeCDU"
                                                type="text"
                                                value={filters.codeCDU || ''}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="input">
                                        <div>
                                            <label htmlFor="borrowedBooksMin">Mas de:</label>
                                            <input
                                                type="number"
                                                id="borrowedBooksMin"
                                                name="borrowedBooksMin"
                                                onChange={handleInputChange}
                                                min={0}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="borrowedBooksMax">Menos de:</label>
                                            <input
                                                type="number"
                                                id="borrowedBooksMax"
                                                name="borrowedBooksMax"
                                                onChange={handleInputChange}
                                                min={0}
                                            />
                                        </div>

                                    </div>
                                    <div className="input">
                                        <label htmlFor="sortBy">Ordenado por: </label>
                                        <select
                                            id="sortBy"
                                            name="sortBy"
                                            value={filters.sortBy}
                                            onChange={handleInputChange}
                                        >
                                            <option value=''>Elegir</option>
                                            {sortOptions.map((sortOption, index) => (
                                                <option key={index} value={sortOption.value}>
                                                    {sortOption.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {filters.sortBy && (
                                        <div className="input">
                                            <label htmlFor="direction">Dirección</label>
                                            <select
                                                id="direction"
                                                name="direction"
                                                value={filters.direction}
                                                onChange={handleInputChange}
                                            >
                                                <option value='asc'>Ascendente</option>
                                                <option value='desc'>Descendente</option>
                                            </select>
                                        </div>)}

                                        <div className="input">
                                        <label>Tipo de listado</label>
                                        <select name="listType" value={filters.listType} onChange={handleInputChange}>
                                            {listTypes.map(type => (
                                                <option key={type.value} value={type.value}>{type.label}</option>
                                            ))}
                                        </select>
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
                    columnsByType={dynamicColumns}
                    typeList={filters.listType}
                    title={filters.listTitle}
                    loading={loading}
                    rowsPerPage={rowsPerPage}
                    onPrint={handlePrint}
                />
            </div>
        </div>
    );
}