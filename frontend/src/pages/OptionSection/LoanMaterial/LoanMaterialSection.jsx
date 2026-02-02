import GenericSection from '../../../components/generic/GenericSection/GenericSection';
import PopUpDelete from '../../../components/common/deletebtnComponent/PopUpDelete';
import GenericForm from '../../../components/generic/GenericForm/GenericForm';
import { loanMaterialsFields } from '../../../data/forms/LoanMaterialsForms';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import { useState } from 'react';
import Btn from '../../../components/common/btn/Btn';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import { useEffect } from 'react';

export default function LoanMaterialSection() {
    const chunkSize = 100;
    const rowsPerPage = 5;
    const [offsetActual, setOffsetActual] = useState(0);
    const [resetPageTrigger, setResetPageTrigger] = useState(0);

    const [filters, setFilters] = useState({});

    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [selected, setSelected] = useState(false);
    // const { items, getItem, createItem, updateItem, deleteItem } = useEntityManager(mockLoanMaterials, 'loamMaterials');
    const [errorMessage, setErrorMessage] = useState(false);

    const {
        items,
        loading,
        totalItems,
        getItems,
        // getItem: getGroupItem,
        deleteItem,
        createItem,
        updateItem
    } = useEntityManagerAPI("book-types");

    async function handleAddItem(data) {
        try {
            await createItem(data);

            await getItems();

            setAddPopup(false);

            setErrorMessage(null);
        }
        catch (error) {
            setErrorMessage(error.message);
            console.error("Error al crear un material de prestamo:", error);
        }
    }

    async function handleEditItem(data) {
        try {
            await updateItem(selected.bookTypeId, data);

            await getItems();

            setEditPopup(false);

            setErrorMessage(null);
        }
        catch (error) {
            setErrorMessage(error.message);
            console.error("Error al actualizar un material de prestamo:", error);
        }
    }
    useEffect(() => {
        const delay = setTimeout(() => {
            setOffsetActual(0);

            setResetPageTrigger(prev => prev + 1);

            getItems({ ...filters,  sortBy: 'typeName', direction: 'asc', limit: chunkSize, offset: 0 });
        }, 500);

        return () => clearTimeout(delay);
    }, [filters]);


    async function handleChangePage(page) {
        const numberPage = Number(page);
        const lastItemIndex = numberPage * rowsPerPage;

        if (items.length < totalItems && lastItemIndex > items.length) {
            const newOffset = items.length;
            await getItems({ ...filters, sortBy: 'typeName', direction: 'asc', limit: chunkSize, offset: newOffset }, true);
            setOffsetActual(newOffset);
        }
    }

    const loanMaterialsPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar material de préstamo',
            className: 'delete-size-popup',
            content: <PopUpDelete
                title="Autor"
                onConfirm={() => deleteItem(selected.bookTypeId)}
                closePopup={() => setDeletePopup(false)}
                refresh={() => getItems()}
            />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        {
            key: 'editPopup',
            title: 'Editar material de préstamo',
            className: '',
            content: <GenericForm fields={loanMaterialsFields} onSubmit={(data) => handleEditItem(data)} error={errorMessage} />,
            close: () => {
                setEditPopup(false)
                setErrorMessage(null)
            },
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar material de préstamo',
            className: '',
            content: <GenericForm fields={loanMaterialsFields} onSubmit={(data) => handleAddItem(data)} error={errorMessage} />,
            close: () => {
                setAddPopup(false)
                setErrorMessage(null)
            },
            condition: addPopup
        }
    ];

    const columns = [
        { header: 'Descripción', accessor: 'typeName' },
        { header: 'Días préstamo', accessor: 'loanDays' },
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

    return (
        <>
            <GenericSection title={'Listado de material en préstamo'} columns={columns} data={items} popups={loanMaterialsPopups}  totalItems={totalItems} handleChangePage={handleChangePage} loading={loading} resetPageTrigger={resetPageTrigger} actions={
                <Btn variant={'primary'} className='new-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg' />} />
            } />
        </>
    )
}