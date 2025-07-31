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

export default function LoanAmountSection() {
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);

    const loanMaterialsTable = [
    { id: 1, description: 'Descripción 1', loanDays: '10' },
    { id: 1, description: 'Descripción 1', loanDays: '10' },
    { id: 1, description: 'Descripción 1', loanDays: '10' },
    { id: 1, description: 'Descripción 1', loanDays: '10' },
    { id: 1, description: 'Descripción 1', loanDays: '10' },
    ];

     const loanMaterialsPopups = [
                {
                    key: 'deletePopup',
                    title: 'Borrar Grupo de tipo de material',
                    className: 'delete-size-popup',
                    content: <PopUpDelete title={"Grupo de tipo de material"} closePopup={() => setDeletePopup(false)} />,
                    close: () => setDeletePopup(false),
                    condition: deletePopup,
                    variant: 'delete'
                },
                {
                    key: 'editPopup',
                    title: 'Editar Grupo de tipo de material',
                    className: 'add-material-group-background',
                    content: <AddMaterialGroup />,
                    close: () => setEditPopup(false),
                    condition: editPopup
                },
                {
                    key: 'addPopup',
                    title: 'Agregar Grupo de tipo de material',
                    className: 'add-material-group-background',
                    content: 
                    <>
                        <AddMaterialGroup />
                    </>,
                    close: () => setAddPopup(false),
                    condition: addPopup
                }
    ];

    const columnsMaterials = [
        { header: 'Descripción grupo', accessor: 'description' },

    ]

    const columns = [
        { header: 'Descripción grupo', accessor: 'description' },
        { header: 'Días préstamo', accessor: 'loanDays' },
        {
            header: 'Borrar',
            accessor: 'delete',
            render: (_, row) => (
            <button className="button-table" onClick={() => setDeletePopup(true)}>
                <img src={DeleteIcon} alt="Borrar" />
            </button>
            )
        },
        {
            header: 'Editar',
            accessor: 'edit',
            render: (_, row) => (
            <button className="button-table"  onClick={() => setEditPopup(true)}>
                <img src={EditIcon} alt="Editar" />
            </button>
            )
        }
    ];

    return (
        <>
            <GenericSection title={'Configurar grupos para cantidad maxima de prestamos'} columns={columns} data={loanMaterialsTable} popups={loanMaterialsPopups} actions={
                <Btn className='new-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg'/>}/>
            }/>
        </>
    )
}