import './LoanAmountSection.css';
import GenericSection from '../../../components/generic/GenericSection/GenericSection';
import PopUpDelete from '../../../components/common/deletebtnComponent/PopUpDelete';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import { useState } from 'react';
import Btn from '../../../components/common/btn/Btn';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import AddMaterialGroup from '../../../components/option-components/addmaterialgroup/AddMaterialGroup';
import { useEntityManager } from '../../../hooks/useEntityManager';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import { useEffect } from 'react';
import ShowMaterials from '../../../components/option-components/ShowMaterials';

export default function LoanAmountSection() {
    const chunkSize = 100;
    const rowsPerPage = 5;
    const [offsetActual, setOffsetActual] = useState(0);
    const [resetPageTrigger, setResetPageTrigger] = useState(0);

    const [filters, setFilters] = useState({});

    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);

    const [selected, setSelected] = useState(false);
    const {
        items: groupItems,
        loading,
        totalItems,
        getItems: getGroupItem,
        // getItem: getGroupItem,
        deleteItem,
        createItem,
        updateItem
    } = useEntityManagerAPI("book-type-groups-list");


    // const {
    //     items: bookTypes,
    //     loading: bookTypesLoading,
    //     totalItems: bookTypesTotalItems,
    //     getItems: getBookTypes,
    //     // getItem: getGroupItem,
    //     deleteItem: deleteBookType,
    //     createItem: createBookType,
    //     updateItem: updateBookType
    // } = useEntityManagerAPI("book-types");

    //const [bookTypes, setBookTypes] = useState([]);

    useEffect(() => {
        const delay = setTimeout(() => {
            setOffsetActual(0);

            setResetPageTrigger(prev => prev + 1);

            getGroupItem({ ...filters, sortBy: 'group', direction: 'asc', limit: chunkSize, offset: 0 });
        }, 500);

        return () => clearTimeout(delay);
    }, [filters]);

    async function handleChangePage(page) {
        const numberPage = Number(page);
        const lastItemIndex = numberPage * rowsPerPage;

        if (groupItems.length < totalItems && lastItemIndex > groupItems.length) {
            const newOffset = groupItems.length;
            await getGroupItem({ ...filters, sortBy: 'group', direction: 'asc', limit: chunkSize, offset: newOffset }, true);
            setOffsetActual(newOffset);
        }
    }

    async function handleAddNewGroup(data) {
        try {
            await createItem(data);

            await getGroupItem({ ...filters, sortBy: 'group', direction: 'asc', limit: chunkSize, offset: 0 });

            setAddPopup(false);
        }
        catch (error) {
            console.error(error);
        }
    }

    async function handleUpdateGroup(data) {
        try {
            await updateItem(selected.bookTypeGroupListId, data);

            await getGroupItem({ ...filters, sortBy: 'group', direction: 'asc', limit: chunkSize, offset: 0 });

            setEditPopup(false);
        }
        catch (error) {
            console.error(error);
        }
    }

    const loanMaterialsPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar Grupo de tipo de material',
            className: 'delete-size-popup',
            content: <PopUpDelete
                title="Grupo de tipo de material"
                onConfirm={() => deleteItem(selected.bookTypeGroupListId)}
                closePopup={() => setDeletePopup(false)}
                refresh={() => getGroupItem()}
            />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        {
            key: 'editPopup',
            title: 'Editar Grupo de tipo de material',
            className: 'loans-background',
            content: <AddMaterialGroup method={'update'} createGroupItem={handleUpdateGroup} getItems={getGroupItem} groupSelected={selected} closePopup={() => setEditPopup(false)} />,
            close: () => setEditPopup(false),
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar Grupo de tipo de material',
            className: 'loans-background',
            content:
                <>
                    <AddMaterialGroup method={'add'} createGroupItem={handleAddNewGroup} getItems={getGroupItem} closePopup={() => setAddPopup(false)} />
                    {/* <AddMaterialGroup method={'add'} createItem={createItem} updateItem={updateItem} getItemGroup={getGroupItem} getMaterialItem={getMaterialItem} items={materialsItems} />  */}
                </>,
            close: () => setAddPopup(false),
            condition: addPopup
        }
    ];

    const columns = [
        { header: 'Grupo', accessor: 'group' },
        { header: 'Cantidad maxima', accessor: 'maxAmount' },
        {
            header: 'Borrar',
            accessor: 'delete',
            render: (_, row) => (
                <button className="button-table" onClick={() => {
                    setDeletePopup(true);
                    setSelected(row);
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
                    setEditPopup(true);
                    setSelected(row);
                }}>
                    <img src={EditIcon} alt="Editar" />
                </button>
            )
        },
    ];

    return (
        <>
            <GenericSection title={'Configurar grupos para cantidad maxima de prestamos'} columns={columns} data={groupItems} popups={loanMaterialsPopups} totalItems={totalItems} handleChangePage={handleChangePage} loading={loading} resetPageTrigger={resetPageTrigger} actions={
                <div className='loan-amount-group-buttons'>
                    <Btn variant='primary' className='new-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg' />} />
                </div>
            } />
        </>
    )
}