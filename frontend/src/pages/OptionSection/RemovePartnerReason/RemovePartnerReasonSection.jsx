import './RemovePartnerReasonSection.css';
import GenericSection from '../../../components/generic/GenericSection/GenericSection';
import PopUpDelete from '../../../components/common/deletebtnComponent/PopUpDelete';
import GenericForm from '../../../components/generic/GenericForm/GenericForm';
import { removePartnerReasonForms } from '../../../data/forms/RemovePartnerReasonForms';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import { useState } from 'react';
import Btn from '../../../components/common/btn/Btn';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import ChooseIcon from '../../../assets/img/choose-icon.svg';
import PopUp from '../../../components/common/popup-table/PopUp';
import { Table } from '../../../components/common/table/Table';
import ConfirmMessage from '../../../components/common/confirmMessage/ConfirmMessage';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import { useEffect } from 'react';

export default function RemovePartnerReasonSection({ chooseMode }) {
    const chunkSize = 100;
    const rowsPerPage = 5;
    const [offsetActual, setOffsetActual] = useState(0);
    const [resetPageTrigger, setResetPageTrigger] = useState(0);

    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [choosePopup, setChoosePopup] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [selected, setSelected] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const [filters, setFilters] = useState({});

    const {
        items,
        loading,
        totalItems,
        getItems,
        deleteItem,
        createItem,
        updateItem
    } = useEntityManagerAPI("remove-reasons");

    useEffect(() => {
        const delay = setTimeout(() => {
            setOffsetActual(0);

            setResetPageTrigger(prev => prev + 1);

            getItems({ ...filters, sortBy: 'reason', direction: 'asc', limit: chunkSize, offset: 0 });
        }, 500);

        return () => clearTimeout(delay);
    }, [filters]);

    async function handleChangePage(page) {
        const numberPage = Number(page);
        const lastItemIndex = numberPage * rowsPerPage;

        if (items.length < totalItems && lastItemIndex > items.length) {
            const newOffset = items.length;
            await getItems({ ...filters, sortBy: 'reason', direction: 'asc', limit: chunkSize, offset: newOffset }, true);
            setOffsetActual(newOffset);
        }
    }

    async function handleAddItem(data) {
        try {
            await createItem(data);

            await getItems();

            setAddPopup(false);

            setErrorMessage(null);
        }
        catch (error) {
            setErrorMessage(error.message);
            console.error("Error al crear un motivo de baja:", error);
        }
    }

    async function handleEditItem(data) {
        try {
            await updateItem(selected.id, data);

            await getItems();

            setEditPopup(false);

            setErrorMessage(null);
        }
        catch (error) {
            setErrorMessage(error.message);
            console.error("Error al editar un motivo de baja:", error);
        }
    }


    const removePartnerReasonsPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar motivo para dar de baja',
            className: 'delete-size-popup',
            content:
                <PopUpDelete
                    title="Motivo para dar de baja"
                    onConfirm={() => deleteItem(selected.id)}
                    closePopup={() => setDeletePopup(false)}
                    refresh={() => getItems()}
                />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },

        {
            key: 'editPopup',
            title: 'Editar motivo para dar de baja',
            className: '',
            content: <GenericForm fields={removePartnerReasonForms} onSubmit={(data) => handleEditItem(data)} error={errorMessage} />,
            close: () => {
                setEditPopup(false)
                setErrorMessage(null)
            },
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar motivo para dar de baja',
            className: 'remove-parner-form-size',
            content: <GenericForm fields={removePartnerReasonForms} onSubmit={(data) => {
                handleAddItem(data)

            }} error={errorMessage} />,
            close: () => {
                setAddPopup(false)
                setErrorMessage(null)
            },
            condition: addPopup
        }
    ];

    const columns = [
        { header: 'Motivo', accessor: 'reason' },
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
                    setEditPopup(true)
                    setSelected(row);
                }}>
                    <img src={EditIcon} alt="Editar" />
                </button>
            )
        }
    ];

    const columnsChooseMode = [
        { header: 'Motivo', accessor: 'reason' },
        {
            header: 'Elegir',
            accessor: 'choose',
            render: (_, row) => (
                <button className="button-table" onClick={() => setConfirmPopup(true)}>
                    <img src={ChooseIcon} alt="Elegir" />
                </button>
            )
        }
    ];

    return (
        <>
            {!chooseMode ? (
                <GenericSection title={'Listado de motivos para dar de baja socio'} columns={columns} data={items} popups={removePartnerReasonsPopups} totalItems={totalItems} handleChangePage={handleChangePage} loading={loading} resetPageTrigger={resetPageTrigger} actions={
                    <>
                        <div className='listbtns'>
                            <Btn variant={'primary'} className='primary-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg' />} />
                        </div>
                    </>
                } />
            ) : (
                <PopUp title={'Seleccionar motivo para dar de baja socio'} className='remove-partner-reason-background' onClick={() => setChoosePopup(false)}>
                    <Table columns={columnsChooseMode} data={items}  totalItems={totalItems} handleChangePage={handleChangePage} loading={loading} resetPageTrigger={resetPageTrigger}>
                        <div className='remove-partner-reasons-options'>
                            <Btn className='new-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg' />} />
                        </div>
                        {confirmPopup && (
                            <PopUp title={'Confirmar motivo'} onClick={() => setConfirmPopup(false)}>
                                <ConfirmMessage text={'¿Esta seguro de elegir este motivo?'} closePopup={() => setConfirmPopup(false)} />
                            </PopUp>
                        )}
                    </Table>
                </PopUp>
            )}
        </>
    )
}