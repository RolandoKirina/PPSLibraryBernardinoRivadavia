import './FeesBetweenDates.css';
import { feesBetweenDatesListOptions, columnsByType } from '../../../data/generatedlist/generatedList';
import { useState, useEffect } from 'react';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import { generateUniversalPDF } from '../../../utils/pdfGenerator';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';

export default function FeesBetweenDates() {

    const [formValues, setFormValues] = useState({
        listType: 'TypeOneFees',
        afterDate: '',
        beforeDate: ''
    });

    const chunkSize = 10000;
    const rowsPerPage = 35;
    const [resetPageTrigger, setResetPageTrigger] = useState(0);
    const [loading, setLoading] = useState(false);

    const { items, getItems, others, totalItems } = useEntityManagerAPI("fees");

    useEffect(() => {
        const timer = setTimeout(() => {
            setResetPageTrigger(prev => prev + 1);
            fetchFees(formValues, 0, false);
        }, 500);

        return () => clearTimeout(timer);
    }, [formValues.afterDate, formValues.beforeDate, formValues.listType]);

    const fetchFees = async (values, offset, append = false) => {
        try {
            setLoading(true);
            await getItems({
                beforeDate: values.beforeDate,
                afterDate: values.afterDate,
                listType: values.listType || 'TypeOneFees',
                limit: chunkSize,
                offset: offset
            }, append);
        } catch (err) {
            console.error("Error al traer cuotas:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePrint = () => {
        if (items.length === 0) return;

        const currentType = formValues.listType || 'TypeOneFees';
        const config = columnsByType[currentType];
        const title = `Listado de Cuotas - ${currentType === 'TypeOneFees' ? 'Pagas por fecha' : 'Por letra y categoria'}`;

        const formatDate = (dateStr) => {
            if (!dateStr) return "";
            const [year, month, day] = dateStr.split("-");
            return `${day}/${month}/${year}`;
        };

        let subtitle = "";
        if (formValues.afterDate && formValues.beforeDate) {
            subtitle = `Período: del ${formatDate(formValues.afterDate)} al ${formatDate(formValues.beforeDate)}`;
        } else if (formValues.afterDate) {
            subtitle = `Desde el día: ${formatDate(formValues.afterDate)}`;
        } else if (formValues.beforeDate) {
            subtitle = `Hasta el día: ${formatDate(formValues.beforeDate)}`;
        }

        const headers = config.map(col => col.label || col.text || col.header || "Columna");
        const data = items.map(item => config.map(col => {
            const key = col.key || col.dataKey || col.field || col.accessor;
            return item[key] ?? '';
        }));

        generateUniversalPDF(title, headers, data, `reporte_cuotas`, subtitle);
    };

    async function handleChangePage(page) {
        const numberPage = Number(page);
        const lastItemIndex = numberPage * rowsPerPage;

        if (items.length < totalItems && lastItemIndex > items.length) {
            await fetchFees(formValues, items.length, true);
        }
    }

    return (
        <div className='fees-between-dates-container'>
            <div className='fees-between-dates-content'>
                <div className='fees-between-dates-filters'>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className='fees-between-dates-filter-option'>
                            <div className='fees-between-dates-filter-title'>
                                <h3>Rango de Fechas</h3>
                            </div>
                            <div className='filter-options'>
                                <div className='input'>
                                    <label htmlFor='afterDate'>Desde el día: </label>
                                    <input
                                        name="afterDate"
                                        type="date"
                                        id="afterDate"
                                        value={formValues.afterDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='input'>
                                    <label htmlFor='beforeDate'>Hasta el día: </label>
                                    <input
                                        name="beforeDate"
                                        type="date"
                                        id="beforeDate"
                                        value={formValues.beforeDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='fees-between-dates-filter-option'>
                            <div className='fees-between-dates-filter-title'>
                                <h3>Opciones de listado</h3>
                            </div>
                            <div className='filter-options'>
                                <div className="input">
                                    <label htmlFor="listType">Tipo de listado</label>
                                    <select 
                                        id="listType" 
                                        name='listType' 
                                        value={formValues.listType} 
                                        onChange={handleInputChange}
                                    >
                                        {feesBetweenDatesListOptions.map((listOption, index) => (
                                            <option key={index} value={listOption.value}>
                                                {listOption.label}
                                            </option>
                                        ))}
                                    </select>
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
                    columnsByType={columnsByType[formValues.listType || 'TypeOneFees']}
                    typeList={formValues.listType || 'TypeOneFees'}
                    title={"Listado de Cuotas"}
                    feeDates={{
                        beforeDate: formValues.beforeDate,
                        afterDate: formValues.afterDate
                    }}
                    handleChangePage={handleChangePage}
                    loading={loading}
                    resetPageTrigger={resetPageTrigger}
                    rowsPerPage={rowsPerPage}
                    others={others}
                    onPrint={handlePrint}
                />
            </div>
        </div>
    );
}