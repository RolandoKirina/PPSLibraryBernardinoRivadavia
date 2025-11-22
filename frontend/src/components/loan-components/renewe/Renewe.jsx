import { Table } from '../../common/table/Table';
import './Renewe.css';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import DetailsIcon from '../../../assets/img/details-icon.svg';
import Btn from '../../common/btn/Btn';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import PopUp from '../../common/popup-table/PopUp';
import PopUpDelete from '../../common/deletebtnComponent/PopUpDelete';
import { useState } from 'react';
import BackviewBtn from '../../common/backviewbtn/BackviewBtn.jsx';
import GenericForm from '../../generic/GenericForm/GenericForm.jsx';
import { reneweLoanFields } from '../../../data/forms/LoanForms.js';
import ShowDetails from '../../generic/ShowDetails/ShowDetails.jsx';
import { reneweDetails } from '../../../data/showdetails/LoanDetails.js';
import AddRenewe from '../addrenewe/AddRenewe.jsx';
import { useEntityManager } from '../../../hooks/useEntityManager.js';

import { useAuth } from '../../../auth/AuthContext.jsx';
import roles from '../../../auth/roles.js';

import { useEffect } from 'react';

import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI.js';

export default function Renewe() {
    const { auth } = useAuth();
    const [deletePopup, setDeletePopup] = useState(false);
    const [popupView, setPopupView] = useState("default");
    const [selected, setSelected] = useState(null);
    const [filters, setFilters] = useState({});

    const [books, setBooks] = useState([]);

    const {
        items,
        getItems,
        createItem: createReneweItem,
        updateItem: updateReneweItem,
        deleteItem
    } = useEntityManagerAPI('reservations');

    useEffect(() => {
        const delay = setTimeout(() => {
            getItems(filters);
        }, 500);

        return () => clearTimeout(delay);
    }, [filters]);

    async function refreshItems() {
        console.log("Iniciando refresh...");

        try {
            setPopupView('default'); // Solo se ejecuta tras obtener la respuesta

            const data = await getItems(); // Espera a que se complete la llamada
            console.log("Datos recibidos:", data);
        } catch (error) {
            console.error("Error al refrescar items:", error);
        }
    }


    const renewespopup = [
        {
            key: 'deletePopup',
            title: 'Borrar reserva',
            className: 'delete-size-popup',
            content:
                // <PopUpDelete title={"Reserva"} closePopup={() => setDeletePopup(false)} onConfirm={
                //     () => {
                //         deleteReneweItem(selected.id)
                //         setDeletePopup(false)
                //     }
                // } />,
                <PopUpDelete
                    title="Reserva"
                    onConfirm={() => deleteItem(selected.id)}
                    closePopup={() => setDeletePopup(false)}
                    refresh={() => getItems()}
                />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
    ];

    let columns = [];

    if (auth.role === roles.admin) {
        columns = [
            { header: 'Número socio', accessor: 'partnerNumber' },
            { header: 'Socio', accessor: 'name' },
            { header: 'Titulo libro', accessor: 'title' },
            {
                header: 'Borrar',
                accessor: 'delete',
                render: (_, row) => (
                    <button className="button-table" onClick={() => {
                        setDeletePopup(true)
                        setSelected(row)
                    }}>
                        <img src={DeleteIcon} alt="Borrar" />
                    </button>
                )
            },
            {
                header: 'Editar',
                accessor: 'edit',

                render: (_, row) => (
                    <button className="button-table" onClick={() => {
                        setSelected(row)
                        setPopupView('editForm')
                    }}>
                        <img src={EditIcon} alt="Editar" />
                    </button>
                )
            },
            {
                header: 'Ver detalle',
                accessor: 'details',
                render: (_, row) => (
                    <button className="button-table" onClick={() => {
                        setPopupView('details')
                        setSelected(row);
                    }}>
                        <img src={DetailsIcon} alt="Detalles" />
                    </button>
                )
            }
        ];
    }
    else if (auth.role === roles.user) {
        columns = [
            { header: 'Titulo libro', accessor: 'title' },
            { header: 'Fecha reserva', accessor: 'reneweDate' },
            { header: 'Fecha limite', accessor: 'expectedDate' }
        ];
    }



    return (
        <>
            <div className='renewe-container'>
                {popupView === 'default' && (
                    <div className='renewe-inputs-items'>
                        <div className='renewe-inputs-container'>
                            <div className='renewe-title'>
                                <h2>Filtros</h2>
                            </div>

                            <div className='renewe-input'>
                                <div className='input'>
                                    <label>Código libro</label>
                                    <input
                                        type='text'
                                        value={filters.bookCode || ''}
                                        onChange={(e) =>
                                            setFilters((prev) => ({ ...prev, bookCode: e.target.value }))
                                        }
                                    />
                                </div>

                                <div className='input'>
                                    <label>Título libro</label>
                                    <input
                                        type='text'
                                        value={filters.bookTitle || ''}
                                        onChange={(e) =>
                                            setFilters((prev) => ({ ...prev, bookTitle: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className='renewe-input'>
                                <div className='input'>
                                    <label>Fecha prevista – Mayor a</label>
                                    <input
                                        type='date'
                                        value={filters.expectedStartDate || ''}
                                        onChange={(e) =>
                                            setFilters((prev) => ({ ...prev, expectedStartDate: e.target.value }))
                                        }
                                    />
                                </div>

                                <div className='input'>
                                    <label>Fecha prevista – Menor a</label>
                                    <input
                                        type='date'
                                        value={filters.expectedEndDate || ''}
                                        onChange={(e) =>
                                            setFilters((prev) => ({ ...prev, expectedEndDate: e.target.value }))
                                        }
                                    />
                                </div>

                                <div className='input'>
                                    <label>Fecha reserva – Mayor a</label>
                                    <input
                                        type='date'
                                        value={filters.reservationStartDate || ''}
                                        onChange={(e) =>
                                            setFilters((prev) => ({ ...prev, reservationStartDate: e.target.value }))
                                        }
                                    />
                                </div>

                                <div className='input'>
                                    <label>Fecha reserva – Menor a</label>
                                    <input
                                        type='date'
                                        value={filters.reservationEndDate || ''}
                                        onChange={(e) =>
                                            setFilters((prev) => ({ ...prev, reservationEndDate: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>

                        </div>

                        <div className='renewe-table-size'>
                            <div className='type-loan-title'>
                                <h2>Reservas
                                </h2>
                            </div>
                            <Table columns={columns} data={items}>
                                {auth.role === roles.admin && (
                                    <div className='add-renew-btn'>
                                        <Btn variant={'primary'} text={'Nueva reserva'} onClick={() => setPopupView('addRenewe')} icon={<img src={PlusIcon} alt={PlusIcon} />} />
                                    </div>
                                )}

                            </Table>
                        </div>

                        {renewespopup.map(({ condition, title, className, content, close, variant }, idx) => (
                            condition && (
                                <PopUp key={idx} title={title} className={className || ''} onClick={close} {...(variant === 'delete' && { variant: 'delete' })}>
                                    {content}
                                </PopUp>
                            )
                        ))}


                    </div>
                )}
                {popupView === 'addRenewe' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <AddRenewe refreshItems={() => refreshItems()} method={'add'} createReneweItem={createReneweItem} />
                    </>
                )}
                {popupView === 'editForm' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <GenericForm
                            fields={reneweLoanFields}
                            onSubmit={async (data) => {
                                try {
                                    console.log("Datos a actualizar:", data);
                                    console.log("Elemento seleccionado:", selected);

                                    // Esperar a que termine la actualización
                                    await updateReneweItem(selected.id, data);

                                    // Refrescar la lista de items una vez actualizado
                                    await refreshItems();

                                    // Volver a la vista por defecto
                                    setPopupView('default');
                                } catch (error) {
                                    console.error("Error al actualizar la reserva:", error);
                                    alert("No se pudo actualizar la reserva.");
                                }
                            }}
                            title={'Editar reserva'}
                            className={'renewe-edit-form-size'}
                        />

                    </>
                )}
                {popupView === 'details' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <ShowDetails data={selected} insidePopup={true} titleText={'Detalles de reserva'} isPopup={false} detailsData={reneweDetails} />
                    </>
                )}

            </div>

        </>
    )
}