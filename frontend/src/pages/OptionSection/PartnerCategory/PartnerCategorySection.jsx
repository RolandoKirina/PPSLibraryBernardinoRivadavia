import './PartnerCategorySection.css';
import GenericSection from '../../../components/generic/GenericSection/GenericSection';
import PopUpDelete from '../../../components/common/deletebtnComponent/PopUpDelete';
import GenericForm from '../../../components/generic/GenericForm/GenericForm';
import { partnerCategoryFields } from '../../../data/forms/PartnerCategoryForms';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import { useState } from 'react';
import Btn from '../../../components/common/btn/Btn';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import { useEffect } from 'react';

export default function PartnerCategorySection() {
    const chunkSize = 100;
    const rowsPerPage = 5;
    const [offsetActual, setOffsetActual] = useState(0);
    const [resetPageTrigger, setResetPageTrigger] = useState(0);

    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [selected, setSelected] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);

    const [filters, setFilters] = useState({});


    const {
        items,
        loading,
        totalItems,
        getItems,

        // getItem: getGroupItem,
        deleteItem,
        createItem,
        updateItem
    } = useEntityManagerAPI("partner-categories");

    async function handleAddItem(data) {
        try {
            await createItem(data);

            await getItems({ ...filters, sortBy: 'name', direction: 'asc', limit: chunkSize, offset: 0 });

            setAddPopup(false);

            setErrorMessage(null);
        }
        catch (error) {
            setErrorMessage(error.message);
            console.error("Error al crear una categoria de socio:", error);
        }
    }

    async function handleEditItem(data) {
        try {
            await updateItem(selected.idCategory, data);

            await getItems({ ...filters, sortBy: 'name', direction: 'asc', limit: chunkSize, offset: 0 });

            setEditPopup(false);

            setErrorMessage(null);
        }
        catch (error) {
            setErrorMessage(error.message);
            console.error("Error al actualizar una categoria de socio:", error);
        }
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            setOffsetActual(0);

            setResetPageTrigger(prev => prev + 1);

            getItems({ ...filters, sortBy: 'name', direction: 'asc', limit: chunkSize, offset: 0 });
        }, 500);

        return () => clearTimeout(delay);
    }, [filters]);

    async function handleChangePage(page) {
        const numberPage = Number(page);
        const lastItemIndex = numberPage * rowsPerPage;

        if (items.length < totalItems && lastItemIndex > items.length) {
            const newOffset = items.length;
            await getItems({ ...filters, sortBy: 'name', direction: 'asc', limit: chunkSize, offset: newOffset }, true);
            setOffsetActual(newOffset);
        }
    }


    const authorsPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar categoria de socio',
            className: 'delete-size-popup',
            content: <PopUpDelete
                title="Categoria de socio"
                onConfirm={() => deleteItem(selected.idCategory)}
                closePopup={() => setDeletePopup(false)}
                refresh={() => getItems()}
            />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        {
            key: 'editPopup',
            title: 'Editar categoria de socio',
            className: '',
            content: <GenericForm fields={partnerCategoryFields} onSubmit={(data) => handleEditItem(data)} error={errorMessage} />,
            close: () => {
                setEditPopup(false)
                setErrorMessage(null)
            },
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar categoria de socio',
            className: '',
            content: <GenericForm fields={partnerCategoryFields} onSubmit={(data) => handleAddItem(data)} error={errorMessage} />,
            close: () => {
                setAddPopup(false)
                setErrorMessage(null)
            },
            condition: addPopup
        }
    ];

    const columns = [
        { header: 'Categoria', accessor: 'name' },
        { header: 'Importe', accessor: 'amount' },
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
                    setSelected(row)
                }}>
                    <img src={EditIcon} alt="Editar" />
                </button>
            )
        }
    ];

    return (
        <>
            <GenericSection title={'Listado de categorias de socios'} columns={columns} data={items} popups={authorsPopups} totalItems={totalItems} handleChangePage={handleChangePage} loading={loading} resetPageTrigger={resetPageTrigger} actions={
                <Btn variant={'primary'} className='new-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg' />} />
            } />
        </>
    )
}