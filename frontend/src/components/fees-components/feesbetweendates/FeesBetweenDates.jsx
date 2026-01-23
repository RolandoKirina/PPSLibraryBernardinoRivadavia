import './FeesBetweenDates.css';
import Btn from '../../common/btn/Btn';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { feesBetweenDatesListOptions, dataByType, columnsByType } from '../../../data/generatedlist/generatedList';
import { useState } from 'react';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';

export default function FeesBetweenDates() {
    const [formValues, setFormValues] = useState({
        listType: 'TypeOneFees'
    });

    const chunkSize = 100;
    const rowsPerPage = 35;
    const [offsetActual, setOffsetActual] = useState(0);
    const [resetPageTrigger, setResetPageTrigger] = useState(0);

    const { items, getItems, others, getItem, createItem, updateItem, deleteItem } = useEntityManagerAPI("fees");
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);

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
            const filteredItems = await getItems({
                beforeDate: data.beforeDate,
                afterDate: data.afterDate,
                listType: data.listType,
                limit: chunkSize,
                offset: 0
            });

            console.log("Items filtrados:", filteredItems);
        } catch (err) {
            console.error("Error al traer cuotas filtradas:", err);
        }
    };

    async function handleChangePage(page) {
        const numberPage = Number(page);
        const lastItemIndex = numberPage * rowsPerPage;

        if (items.length < totalItems && lastItemIndex > items.length) {
            const newOffset = items.length;

            await getItems(
                formValues,
                { limit: chunkSize, offset: newOffset },
                true
            );

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

                {/* original*/}
                <div className='preview-list-container'>
                    <GenerateListPopup
                        dataByType={items}
                        totalItems={totalItems}
                        columnsByType={columnsByType[formValues.listType]}
                        typeList={formValues.listType ? formValues.listType : 'TypeOneFees'}
                        title={formValues.listTitle}
                        feeDates={{
                            beforeDate: formValues.beforeDate,
                            afterDate: formValues.afterDate
                        }}
                        handleChangePage={handleChangePage}
                        loading={loading}
                        resetPageTrigger={resetPageTrigger}
                        rowsPerPage={rowsPerPage}
                        others={others}
                    />
                </div>
                {/* 
                <div className='preview-list-container'>
                    <GenerateListPopup
                        dataByType={items}
                        totalItems={totalItems}
                        columnsByType={columnsByType["LostBooks"]}
                        typeList={'LostBooks'}
                        title={formValues.listTitle}
                        handleChangePage={handleChangePage}
                        loading={loading}
                        resetPageTrigger={resetPageTrigger}
                        rowsPerPage={rowsPerPage}
                    />
                </div> */}
            </div>

        </>
    )
}