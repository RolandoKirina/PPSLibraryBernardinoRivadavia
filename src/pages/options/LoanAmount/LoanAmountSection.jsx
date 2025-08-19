import './LoanAmountSection.css';
import GenericSection from '../../../components/generic/GenericSection/GenericSection';
import PopUpDelete from '../../../components/deletebtnComponent/PopUpDelete';
import GenericForm from '../../../components/generic/GenericForm/GenericForm';
import { loanMaterialsFields } from '../../../data/options/loan-materials/LoanMaterialsForms';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import { useState } from 'react';
import Btn from '../../../components/btn/Btn';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import { loanMaterialsGroupFields } from '../../../data/options/loan-materials/LoanMaterialsForms';
import { Table } from '../../../components/table/Table';
import AddMaterialGroup from '../../../components/addmaterialgroup/AddMaterialGroup';
import { mockLoanAmountGroup } from '../../../data/mocks/loanAmount';
import { useEntityManager } from '../../../hooks/useEntityManager';
import { mockLoanMaterials } from '../../../data/mocks/loanMaterials';

export default function LoanAmountSection() {
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [selected, setSelected] = useState(false);
    const { items: groupItems, getItem: getGroupItem, createItem, updateItem, deleteItem } = useEntityManager(mockLoanAmountGroup, 'loanAmountGroups');
    const { items: materialsItems, getItem: getMaterialItem, deleteItem: deleteMaterialItem } = useEntityManager(mockLoanMaterials, 'loanMaterials');

     const loanMaterialsPopups = [
                {
                    key: 'deletePopup',
                    title: 'Borrar Grupo de tipo de material',
                    className: 'delete-size-popup',
                    content: <PopUpDelete title={"Grupo de tipo de material"} closePopup={() => setDeletePopup(false)} onConfirm={
                () => {
                    deleteItem(selected.id)
                    setDeletePopup(false)
                }
            } />,
                    close: () => setDeletePopup(false),
                    condition: deletePopup,
                    variant: 'delete'
                },
                {
                    key: 'editPopup',
                    title: 'Editar Grupo de tipo de material',
                    className: 'add-material-group-background',
                    content: <AddMaterialGroup method={'update'} createItem={ createItem } updateItem={updateItem} getItemGroup={getGroupItem} getMaterialItem={getMaterialItem} items={materialsItems} itemIdSelected={selected.id}/>,
                    close: () => setEditPopup(false),
                    condition: editPopup
                },
                {
                    key: 'addPopup',
                    title: 'Agregar Grupo de tipo de material',
                    className: 'add-material-group-background',
                    content: 
                    <>
                        <AddMaterialGroup method={'add'} createItem={ createItem } updateItem={updateItem} getItemGroup={getGroupItem} getMaterialItem={getMaterialItem} items={materialsItems} />
                    </>,
                    close: () => setAddPopup(false),
                    condition: addPopup
                }
    ];

    const columns = [
        { header: 'Descripción grupo', accessor: 'groupDescription' }, 
        { header: 'Días préstamo', accessor: 'loanDays' },
        {
            header: 'Borrar',
            accessor: 'delete',
            render: (_, row) => (
            <button className="button-table" onClick={() => {
                setDeletePopup(true);
                setSelected(row);
                console.log(row);
                }}>
                <img src={DeleteIcon} alt="Borrar" />
            </button>
            )
        },
        {
            header: 'Editar',
            accessor: 'edit',
            render: (_, row) => (
            <button className="button-table"  onClick={() => {
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
                <Btn variant='primary' className='new-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg'/>}/>
            }/>
        </>
    )
}