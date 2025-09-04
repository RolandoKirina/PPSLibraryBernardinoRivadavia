import './RemovePartnerReasonSection.css';
import GenericSection from '../../../components/generic/GenericSection/GenericSection';
import PopUpDelete from '../../../components/deletebtnComponent/PopUpDelete';
import GenericForm from '../../../components/generic/GenericForm/GenericForm';
import { removePartnerReasonForms } from '../../../data/forms/RemovePartnerReasonForms';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import { useState } from 'react';
import Btn from '../../../components/btn/Btn';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import ChooseIcon from '../../../assets/img/choose-icon.svg';
import PopUp from '../../../components/popup-table/PopUp';
import { Table } from '../../../components/table/Table';
import ConfirmMessage from '../../../components/confirmMessage/ConfirmMessage';
import { mockRemovePartnerReason } from '../../../data/mocks/removePartnerReason';
import { useEntityManager } from '../../../hooks/useEntityManager';

export default function RemovePartnerReasonSection({chooseMode}) {
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [choosePopup, setChoosePopup] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [selected, setSelected] = useState(false);
    const { items, getItem, createItem, updateItem, deleteItem } = useEntityManager(mockRemovePartnerReason, 'removePartnerReason');
 
    function handleAddItem(data) {
        createItem(data);
        setAddPopup(false);
    }

    function handleEditItem(data) {
        console.log(selected);
        updateItem(selected.id, data);
        setEditPopup(false);
    }

    
     const removePartnerReasonsPopups = [
                {
                    key: 'deletePopup',
                    title: 'Borrar motivo para dar de baja',
                    className: 'delete-size-popup',
                    content: <PopUpDelete title={"Motivo para dar de baja"} closePopup={() => setDeletePopup(false)} onConfirm={
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
                    title: 'Editar motivo para dar de baja',
                    className: '',
                    content: <GenericForm fields={removePartnerReasonForms} onSubmit={(data) => handleEditItem(data)}/>,
                    close: () => setEditPopup(false),
                    condition: editPopup
                },
                {
                    key: 'addPopup',
                    title: 'Agregar motivo para dar de baja',
                    className: 'remove-parner-form-size',
                    content: <GenericForm fields={removePartnerReasonForms} onSubmit={(data) => handleAddItem(data)}/>, 
                    close: () => setAddPopup(false),
                    condition: addPopup
                }
    ];

    /*
                    {confirmPopup && (
                        <PopUp title={'Guardar motivo'} onClick={() => setConfirmPopup(false)}>   
                            <ConfirmMessage text={'¿Esta seguro de guardar este motivo?'} closePopup={() => setConfirmPopup(false)}/>
                        </PopUp>
                    )}
                        */

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
             <button className="button-table"  onClick={() => {
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
            <button className="button-table"  onClick={() => setConfirmPopup(true)}>
                <img src={ChooseIcon} alt="Elegir" />
            </button>
            )
        }
    ];

    return (
        <>
        {!chooseMode ? (
             <GenericSection title={'Listado de motivos para dar de baja socio'} columns={columns} data={items} popups={removePartnerReasonsPopups} actions={
                <>
                <div className='listbtns'>
                    <Btn variant={'primary'} className='primary-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg'/>}/>
                </div>
                </>
            }/>
        ): (
            <PopUp title={'Seleccionar motivo para dar de baja socio'}  className='remove-partner-reason-background'  onClick={() => setChoosePopup(false)}>
                <Table columns={columnsChooseMode} data={items}>
                    <div className='remove-partner-reasons-options'>
                        <Btn className='new-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg'/>}/>
                    </div>
                    {confirmPopup && (
                        <PopUp title={'Confirmar motivo'} onClick={() => setConfirmPopup(false)}>   
                            <ConfirmMessage text={'¿Esta seguro de elegir este motivo?'} closePopup={() => setConfirmPopup(false)}/>
                        </PopUp>
                    )}
                </Table>
            </PopUp>
        )}
        </>
    )
}