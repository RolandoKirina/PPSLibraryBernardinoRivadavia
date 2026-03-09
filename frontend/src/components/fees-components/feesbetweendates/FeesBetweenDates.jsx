import './FeesBetweenDates.css';
import Btn from '../../common/btn/Btn';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { feesBetweenDatesListOptions, columnsByType } from '../../../data/generatedlist/generatedList';
import { useState } from 'react';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import { generateUniversalPDF } from '../../../utils/pdfGenerator';

export default function FeesBetweenDates() {
    const [formValues, setFormValues] = useState({
        listType: 'TypeOneFees'
    });

    const chunkSize = 10000;
    const rowsPerPage = 35;
    const [offsetActual, setOffsetActual] = useState(0);
    const [resetPageTrigger, setResetPageTrigger] = useState(0);

    const { items, getItems, others, totalItems } = useEntityManagerAPI("fees");

    const [loading, setLoading] = useState(false);

    const handlePrint = () => {
        if (items.length === 0) return;

        const currentType = formValues.listType || 'TypeOneFees';
        const config = columnsByType[currentType];
        const title = `Listado de Cuotas - ${currentType === 'TypeOneFees' ? 'Pagas por fecha' : 'Por letra y categoria'}`;

        // Preparamos el subtítulo
        const { afterDate, beforeDate } = formValues;
        let subtitle = "";

        const formatDate = (dateStr) => {
            if (!dateStr) return "";
            const [year, month, day] = dateStr.split("-");
            return `${day}/${month}/${year}`;
        };

        if (afterDate && beforeDate) {
            subtitle = `Período: del ${formatDate(afterDate)} al ${formatDate(beforeDate)}`;
        } else if (afterDate) {
            subtitle = `Desde el día: ${formatDate(afterDate)}`;
        } else if (beforeDate) {
            subtitle = `Hasta el día: ${formatDate(beforeDate)}`;
        }

        const headers = config.map(col => col.label || col.text || col.header || "Columna");
        const data = items.map(item => config.map(col => {
            const key = col.key || col.dataKey || col.field || col.accessor;
            return item[key] ?? '';
        }));

        // Enviamos el subtítulo como 5to argumento
        generateUniversalPDF(title, headers, data, `reporte_cuotas`, subtitle);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            if (value !== '') data[key] = value;
        });

        if (!data.listType) {
            data.listType = 'TypeOneFees';
        }

        setFormValues(data);
        setOffsetActual(0);
        setResetPageTrigger(prev => prev + 1);

        try {
            setLoading(true);
            await getItems({
                beforeDate: data.beforeDate,
                afterDate: data.afterDate,
                listType: data.listType,
                limit: chunkSize,
                offset: 0
            });
        } catch (err) {
            console.error("Error al traer cuotas filtradas:", err);
        } finally {
            setLoading(false);
        }
    };

    async function handleChangePage(page) {
        const numberPage = Number(page);
        const lastItemIndex = numberPage * rowsPerPage;

        if (items.length < totalItems && lastItemIndex > items.length) {
            const newOffset = items.length;

            await getItems({
                ...formValues,
                limit: chunkSize,
                offset: newOffset
            }, true);

            setOffsetActual(newOffset);
        }
    }

    return (
        <>
            <div className='fees-between-dates-container'>
                <div className='fees-between-dates-content'>
                    <div className='fees-between-dates-filters'>
                        <form onSubmit={handleSubmit}>
                            <div className='fees-between-dates-filter-option'>
                                <div className='fees-between-dates-filter-title'>
                                    <h3>Rango de Fechas</h3>
                                </div>
                                <div className='filter-options'>
                                    <div className='input'>
                                        {/* Usamos afterDate primero porque es el "Desde" (>=) */}
                                        <label htmlFor='afterDate'>Desde el día: </label>
                                        <input
                                            name="afterDate"
                                            type="date"
                                            id="afterDate"
                                        />
                                    </div>
                                    <div className='input'>
                                        {/* Usamos beforeDate segundo porque es el "Hasta" (<=) */}
                                        <label htmlFor='beforeDate'>Hasta el día: </label>
                                        <input
                                            name="beforeDate"
                                            type="date"
                                            id="beforeDate"
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
                    <GenerateListPopup
                        dataByType={items}
                        totalItems={totalItems}
                        columnsByType={columnsByType[formValues.listType || 'TypeOneFees']}
                        typeList={formValues.listType || 'TypeOneFees'}
                        title={formValues.listTitle || "Listado de Cuotas"}
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
        </>
    );
}