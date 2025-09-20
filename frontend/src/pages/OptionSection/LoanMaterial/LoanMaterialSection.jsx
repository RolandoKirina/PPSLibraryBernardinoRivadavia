import './LoanMaterialSection.css';
import GenericSection from '../../../components/generic/GenericSection/GenericSection';
import PopUpDelete from '../../../components/common/deletebtnComponent/PopUpDelete';
import GenericForm from '../../../components/generic/GenericForm/GenericForm';
import { loanMaterialsFields } from '../../../data/forms/LoanMaterialsForms';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import { useState } from 'react';
import Btn from '../../../components/common/btn/Btn';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import { useEntityManager } from '../../../hooks/useEntityManager';
import { mockLoanMaterials } from '../../../data/mocks/loanMaterials';

export default function LoanMaterialSection() {
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [selected, setSelected] = useState(false);
    const { items, getItem, createItem, updateItem, deleteItem } = useEntityManager(mockLoanMaterials, 'loamMaterials');

    function handleAddItem(data) {
        createItem(data);
        setAddPopup(false);
    }

    function handleEditItem(data) {
        updateItem(selected.id, data);
        setEditPopup(false);
    }

    const loanMaterialsPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar material de préstamo',
            className: 'delete-size-popup',
            content: <PopUpDelete title={"Material de préstamo"} closePopup={() => setDeletePopup(false)} onConfirm={
                () => {
                    deleteItem(selected.id)
                    setDeletePopup(false)
                }
            }
            />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        {
            key: 'editPopup',
            title: 'Editar material de préstamo',
            className: '',
            content: <GenericForm fields={loanMaterialsFields} onSubmit={(data) => handleEditItem(data)} />,
            close: () => setEditPopup(false),
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar material de préstamo',
            className: '',
            content: <GenericForm fields={loanMaterialsFields} onSubmit={(data) => handleAddItem(data)} />,
            close: () => setAddPopup(false),
            condition: addPopup
        }
    ];

    const columns = [
        { header: 'Descripción', accessor: 'description' },
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
            <GenericSection title={'Listado de material en préstamo'} columns={columns} data={items} popups={loanMaterialsPopups} actions={
                <Btn variant={'primary'} className='new-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg' />} />
            } />
        </>
    )
}