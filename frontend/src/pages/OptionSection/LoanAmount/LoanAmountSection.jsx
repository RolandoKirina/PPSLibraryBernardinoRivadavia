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

export default function LoanAmountSection() {
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [selected, setSelected] = useState(false);
    const {
        items: groupItems,
        getItems: getGroupItem,
        // getItem: getGroupItem,
        deleteItem,
        createItem,
        updateItem
    } = useEntityManagerAPI("book-type-groups-list");


    const {
        items: bookTypes,
        getItems: getBookTypes,
        // getItem: getGroupItem,
        deleteItem: deleteBookType,
        createItem: createBookType,
        updateItem: updateBookType
    } = useEntityManagerAPI("book-types");

    //const [bookTypes, setBookTypes] = useState([]);

    useEffect(() => {
        getGroupItem(); // solo dispara la carga
        getBookTypes();
    }, []);

    // useEffect(() => {
    //     if (groupItems.length > 0) {
    //         const allBookTypes = getAllBookTypes(groupItems);
    //         setBookTypes(allBookTypes);
    //     }
    // }, [groupItems]);


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
            className: 'add-material-group-background',
            content: <AddMaterialGroup method={'update'} createItem={createItem} updateGroupItem={updateItem} getItems={getGroupItem} items={bookTypes} itemSelected={selected} closePopup={() => setEditPopup(false)} />,
            close: () => setEditPopup(false),
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar Grupo de tipo de material',
            className: 'add-material-group-background',
            content:
                <>
                    <AddMaterialGroup method={'add'} createGroupItem={createItem} updateGroupItem={updateItem} getItems={getGroupItem} items={bookTypes} closePopup={() => setAddPopup(false)} />
                    {/* <AddMaterialGroup method={'add'} createItem={createItem} updateItem={updateItem} getItemGroup={getGroupItem} getMaterialItem={getMaterialItem} items={materialsItems} />  */}
                </>,
            close: () => setAddPopup(false),
            condition: addPopup
        }
    ];

    const columns = [
        { header: 'Descripción grupo', accessor: 'group' },
        { header: 'Días préstamo', accessor: 'maxAmount' },
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
        }
    ];

    return (
        <>
            <GenericSection title={'Configurar grupos para cantidad maxima de prestamos'} columns={columns} data={groupItems} popups={loanMaterialsPopups} actions={
                <div className='loan-amount-group-buttons'>
                    <Btn variant='primary' className='new-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg' />} />
                </div>
            } />
        </>
    )
}