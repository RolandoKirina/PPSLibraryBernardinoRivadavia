import { Table } from '../../common/table/Table';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import PopUp from '../../common/popup-table/PopUp.jsx';
import ReturnIcon from '../../../assets/img/return-icon.svg';
import RenewIcon from '../../../assets/img/renewe-icon.svg';
import Btn from '../../common/btn/Btn.jsx';

export default function GlobalPendingBooks() {
    const chunkSize = 100;
    const rowsPerPage = 5;
    const { auth } = useAuth();

    const [books, setBooks] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resetPageTrigger, setResetPageTrigger] = useState(0);
    const [popUpReturn, setPopUpReturn] = useState(false);
    const [popUpRenew, setPopUpRenew] = useState(false);

    // Filtros globales (agregamos socio)
    const [filters, setFilters] = useState({
        partnerNumber: '',
        title: '',
        code: '',
        status: 'pending' // por defecto mostramos lo que falta devolver
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFilters(prev => ({ ...prev, [name]: value }));
    };
    
    const fetchGlobalBooks = async ({ limit, offset }, currentFilters = filters, append = false) => {
        setLoading(true);
        setError(null);

        try {
            let url = `http://localhost:4000/api/v1/books/loans/global?limit=${limit}&offset=${offset}`;

            if (currentFilters.partnerNumber) {
                url += `&partnerNumber=${currentFilters.partnerNumber}`;
            }
            if (currentFilters.title) {
                url += `&title=${encodeURIComponent(currentFilters.title)}`;
            }
            if (currentFilters.code) {
                url += `&code=${encodeURIComponent(currentFilters.code)}`;
            }
            if (currentFilters.status) {
                url += `&status=${currentFilters.status}`;
            }

            const res = await fetch(url, {
                headers: { "Authorization": `Bearer ${auth.token}` }
            });

            if (!res.ok) throw new Error('Error al obtener préstamos globales');

            const { rows, count } = await res.json();
            setTotalItems(count);
            setBooks(prev => (append ? [...prev, ...rows] : rows));
        } catch (err) {
            setError(err.message);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setBooks([]);
        setTotalItems(0);
        setResetPageTrigger(prev => prev + 1);

        const delayDebounceFn = setTimeout(() => {
            fetchGlobalBooks({ limit: chunkSize, offset: 0 }, filters);
        }, 600);

        return () => clearTimeout(delayDebounceFn);
    }, [filters.partnerNumber, filters.title, filters.code, filters.status]);

    const handleActionSuccess = () => {
        setPopUpReturn(false);
        setPopUpRenew(false);
        fetchGlobalBooks({ limit: chunkSize, offset: 0 }, filters);
    };

    const handleReturn = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/v1/loan-books/${selectedItem.loanBookId}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${auth.token}` },
                body: JSON.stringify({ returnedDate: new Date().toISOString(), returned: true })
            });
            if (res.ok) handleActionSuccess();
        } catch (err) { alert("Error al devolver"); }
    };

    const handleRenew = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/v1/loan-books/${selectedItem.loanBookId}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${auth.token}` },
                body: JSON.stringify({ reneweAmount: (selectedItem.renewalCount || 0) + 1 })
            });
            if (res.ok) handleActionSuccess();
        } catch (err) { alert("Error al renovar"); }
    };

    const columns = [
        {
            header: 'Socio',
            accessor: 'partner',
            render: (_, row) => `${row.partnerName || 'N/A'} (${row.partnerNumber})`
        },
        { header: 'Cód. Libro', accessor: 'bookCode' },
        { header: 'Título', accessor: 'title' },
        { header: 'F. Retiro', accessor: 'retiredDate' },
        { header: 'F. Prevista', accessor: 'dueDate' },
        { header: 'F. Devolución', accessor: 'returnedDate', render: (v) => v || '-' },
        { header: 'Renovación', accessor: 'renewalCount', render: (v) => `Cant: ${v || 0}` },
        {
            header: 'Estado',
            accessor: 'isReturned',
            render: (ret) => ret ? <span className="status-paid">Devuelto</span> : <span className="status-unpaid">Pendiente</span>
        },
        {
            header: 'Acciones',
            accessor: 'actions',
            render: (_, row) => (
                <div style={{ display: 'flex', gap: '5px' }}>
                    {!row.isReturned && (
                        <>
                            <button className="button-table" onClick={() => { setSelectedItem(row); setPopUpReturn(true); }}>
                                <img src={ReturnIcon} alt="Devolver" />
                            </button>
                            <button className="button-table" onClick={() => { setSelectedItem(row); setPopUpRenew(true); }}>
                                <img src={RenewIcon} alt="Renovar" />
                            </button>
                        </>
                    )}
                </div>
            )
        },
    ];

    return (
        <div className="unpaid-quotes-container">
            <div className='unpaid-fees-info-inputs'>
                <h2>Gestión Global de Préstamos de Libros</h2>

                <div className="unpaid-fees-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
                    <div className='unpaid-fee-input'>
                        <label>N° Socio</label>
                        <input name="partnerNumber" type='text' placeholder="Ej: 1044" value={filters.partnerNumber} onChange={handleInputChange} />
                    </div>
                    <div className='unpaid-fee-input'>
                        <label>Título del Libro</label>
                        <input name="title" type='text' placeholder="Ej: El Quijote" value={filters.title} onChange={handleInputChange} />
                    </div>
                    <div className='unpaid-fee-input'>
                        <label>Código Inv.</label>
                        <input name="code" type='text' placeholder="Ej: INV-001" value={filters.code} onChange={handleInputChange} />
                    </div>
                    <div className='unpaid-fee-input'>
                        <label>Estado</label>
                        <select name="status" value={filters.status} onChange={handleInputChange} className="unpaid-fee-select">
                            <option value="all">Todos</option>
                            <option value="pending">Solo Pendientes</option>
                            <option value="returned">Solo Devueltos</option>
                        </select>
                    </div>
                </div>
            </div>

            <Table
                columns={columns}
                data={books}
                totalItems={totalItems}
                handleChangePage={async (page) => {
                    const lastItemIndex = Number(page) * rowsPerPage;
                    if (lastItemIndex > books.length && books.length < totalItems) {
                        await fetchGlobalBooks({ limit: chunkSize, offset: books.length }, filters, true);
                    }
                }}
                loading={loading}
                resetPageTrigger={resetPageTrigger}
                showCount={true}
                rowsPerPage={rowsPerPage}
            />

            {/* Popups de Confirmación */}
            {popUpReturn && (
                <PopUp title={'Confirmar Devolución'} onClick={() => setPopUpReturn(false)}>
                    <div className="p-4 popup-action-content">
                        <p>Socio: <strong>{selectedItem?.partnerNumber}</strong></p>
                        <p>¿Confirma la devolución del libro: <strong>{selectedItem?.title}</strong>?</p>
                        <div className="buttons-actions">
                            <Btn variant={'primary'} onClick={handleReturn} text={'Confirmar Devolución'} />
                            <Btn variant={'primary'} onClick={() => setPopUpReturn(false)} text={'Cancelar'} />
                        </div>
                    </div>
                </PopUp>
            )}

            {popUpRenew && (
                <PopUp title={'Renovar Préstamo'} onClick={() => setPopUpRenew(false)}>
                    <div className="p-4 popup-action-content">
                        <p>Socio: <strong>{selectedItem?.partnerNumber}</strong></p>
                        <p>¿Desea renovar el préstamo de: <strong>{selectedItem?.title}</strong>?</p>
                        <p>La cantidad de renovaciones actual es: {selectedItem?.renewalCount || 0}</p>
                        <div className="buttons-actions">
                            <Btn variant={'primary'} onClick={handleRenew} text={'Confirmar Renovación'} />
                            <Btn variant={'primary'} onClick={() => setPopUpRenew(false)} text={'Cancelar'} />
                        </div>
                    </div>
                </PopUp>
            )}
        </div>
    );
}