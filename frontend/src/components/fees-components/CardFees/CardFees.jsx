//import { paidFees } from '../../../data/mocks/fees.js';
//import { unpaidFees } from '../../../data/mocks/fees.js';
//import { newFees } from '../../../data/mocks/fees.js';
import Btn from '../../common/btn/Btn.jsx';
import './CardFees.css';
import { useState } from 'react';
import PaginatedList from './PaginatedList.jsx';

export default function CardFees() {
    const itemsPerPage = 3;

    const [currentPagePaid, setCurrentPagePaid] = useState(1);
    const [currentPageUnpaid, setCurrentPageUnpaid] = useState(1);
    const [currentPageNew, setCurrentPageNew] = useState(1);

    const [unpaidFeeList, unsetPaidFeeList] = useState([...unpaidFees]);
    const [paidFeeList, setPaidFeeList] = useState([...paidFees]);
    const [newFeeList, setNewFeeList] = useState([...newFees]);

    const [selectedUnpaidId, setSelectedUnpaidId] = useState(null);
    const [selectedNewId, setSelectedNewId] = useState(null);


    // lo añado para saber en que bloque de paginacion estoy ej: 1-4 ,5-9,etc
    const [paginationBlock, setPaginationBlock] = useState(0);

    function payfee(id, listType) {
        if (!id) return;

        const list = listType === "new" ? newFeeList : unpaidFeeList;
        const setList = listType === "new" ? setNewFeeList : unsetPaidFeeList;

        const index = list.findIndex(obj => obj.id === id);

        if (index !== -1) {
            const removedObject = list[index];

            setList(prev => prev.filter(fee => fee.id !== id));
            setPaidFeeList(prev => [...prev, removedObject]);

            if (listType === "new") {
                setSelectedNewId(null);
            } else {
                setSelectedUnpaidId(null);
            }
        }
    }

    return (
        <div className='cardfees-container'>

            {/* Cuotas Pagadas */}
            <div className='cardfee cardpaid'>
                <div className='title-fee'>
                    <h2>Cuotas pagadas</h2>
                </div>

                <div>
                    <div className='form-fee'>
                        <label htmlFor="partner">Buscar por nombre de socio</label>
                        <input type="text" name="partner" />
                    </div>
                    <div className='form-fee'>
                        <label htmlFor="date">Buscar por fecha de cuota</label>
                        <input type="date" id="datefilter" name="datefilter" />
                    </div>
                </div>

                <PaginatedList
                    items={paidFeeList}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPagePaid}
                    setCurrentPage={setCurrentPagePaid}
                    emptyMessage="No hay cuotas pagadas"
                    renderItem={(fee, index) => (
                        <li key={index} className='feepaid'>
                            <p><strong>Socio:</strong> {fee.id}</p>
                            <p><strong>Monto:</strong> {fee.amount}</p>
                            <p><strong>Fecha:</strong> {fee.date_of_paid}</p>
                        </li>
                    )}
                />
            </div>

            {/* Cuotas Impagas */}
            <div className='cardfee'>
                <div className='title-fee'>
                    <h2>Cuotas impagas</h2>
                </div>

                <PaginatedList
                    items={unpaidFeeList}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPageUnpaid}
                    setCurrentPage={setCurrentPageUnpaid}
                    emptyMessage="No hay más cuotas impagas"
                    renderItem={(fee, index) => (
                        <li
                            key={index}
                            className={`fee ${selectedUnpaidId === fee.id ? "selected" : ""}`}
                            onClick={() => setSelectedUnpaidId(fee.id)}
                        >
                            <p><strong>Socio:</strong> {fee.id}</p>
                            <p><strong>Monto:</strong> {fee.amount}</p>
                            <p><strong>Fecha:</strong> {fee.date_of_paid}</p>
                        </li>
                    )}
                />

                <div className='btncentercard'>
                    <Btn
                        text="Pagar cuota"
                        variant="primary"
                        onClick={() => payfee(selectedUnpaidId, "unpaid")}
                        disabled={!selectedUnpaidId || unpaidFeeList.length === 0}
                    />
                </div>
            </div>

            {/* Cuotas Nuevas */}
            <div className='cardfee'>
                <div className='title-fee'>
                    <h2>Cuotas nuevas</h2>
                </div>

                <PaginatedList
                    items={newFeeList}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPageNew}
                    setCurrentPage={setCurrentPageNew}
                    emptyMessage="No hay más cuotas nuevas para pagar"
                    renderItem={(fee, index) => (
                        <li
                            key={index}
                            className={`fee ${selectedNewId === fee.id ? "selected" : ""}`}
                            onClick={() => setSelectedNewId(fee.id)}
                        >
                            <p><strong>Socio:</strong> {fee.id}</p>
                            <p><strong>Monto:</strong> {fee.amount}</p>
                            <p><strong>Fecha:</strong> {fee.date_of_paid}</p>
                        </li>
                    )}
                />

                <div className='btncentercard'>
                    <Btn
                        text="Pagar cuota"
                        variant="primary"
                        className="btnpay"
                        disabled={!selectedNewId || newFeeList.length === 0}
                        onClick={() => payfee(selectedNewId, "new")}
                    />
                </div>
            </div>
        </div>
    );
}
