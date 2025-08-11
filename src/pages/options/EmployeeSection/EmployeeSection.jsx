import './EmployeeSection.css';
import GenericSection from '../../../components/generic/GenericSection/GenericSection';
import PopUpDelete from '../../../components/deletebtnComponent/PopUpDelete';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import { useState } from 'react';
import Btn from '../../../components/btn/Btn';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import { employeeDetails } from '../../../data/options/employee/EmployeeDetails';
import DetailsIcon from '../../../assets/img/details-icon.svg';
import ShowDetails from '../../../components/generic/ShowDetails/ShowDetails';
import { useEntityManager } from '../../../hooks/useEntityManager';
import { mockEmployees } from '../../../data/mocks/employee';
import EmployeeForm from '../../../components/EmployeeForm/EmployeeForm';

export default function EmployeeSection() {
    const [deletePopup, setDeletePopup] = useState(false);
    const [detailsPopup, setDetailsPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [selected, setSelected] = useState(false);
    const [detailsData, setDetailsData] = useState(null);
    const { items, getItem, createItem, updateItem, deleteItem } = useEntityManager(mockEmployees, 'employees');
    
    function getDetailsData(data) {
        let detailsData = getItem(data.id);
        setDetailsData(detailsData);
    }

    function redirect(action){
         switch(action){
            // case 'add':{
            //     let title ="Empleados";
            //     window.open(`${window.location.origin}/employees/register`, '_blank',title);
            //     break;
            // }
            case 'edit':{
                let title ="Editar Empleado";
                window.open(`${window.location.origin}/employees/edit-employee`, '_blank',title);
                break;
            }
        }
    }

     const employeePopups = [
                {
                    key: 'deletePopup',
                    title: 'Borrar empleado',
                    className: 'delete-size-popup',
                    content: <PopUpDelete title={"Empleado"} closePopup={() => setDeletePopup(false)} onConfirm={
                () => {
                    deleteItem(selected.id)
                    setDeletePopup(false)
                }
            }  />,
                    close: () => setDeletePopup(false),
                    condition: deletePopup,
                    variant: 'delete'
                },
                {
                    key: 'detailsPopup',
                    title: 'Detalles del préstamo',
                    className: '',
                    content: <ShowDetails data={detailsData} detailsData={employeeDetails} isPopup={true} />,
                    close: () => setDetailsPopup(false),
                    condition: detailsPopup
                },
                {
                    key: 'addPopup',
                    title: 'Añadir empleado',
                    className: 'employee-form-size',
                    content: <EmployeeForm method={'add'} createItem={createItem}/>,
                    close: () => setAddPopup(false),
                    condition: addPopup
                },
                {
                    key: 'editPopup',
                    title: 'Editar empleado',
                    className: 'employee-form-size',
                    content: <EmployeeForm method={'update'} updateItem={updateItem} selected={selected}/>,
                    close: () => setEditPopup(false),
                    condition: editPopup
                }
    ];

    const columns = [
        { header: 'Nombre', accessor: 'fullname' },
        { header: 'Codigo', accessor: 'id' },
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
                setSelected(row)
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
                setDetailsPopup(true)
                setSelected(row)
                getDetailsData(row)
            }}>
                <img src={DetailsIcon} alt="Detalles" />
            </button>
            )
        }

    ];

    return (
        <>
            <GenericSection title={'Listado de empleados'} columns={columns} data={items} popups={employeePopups} actions={
                <Btn className='new-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg'/>}/>
            }/>
        </>
    )
}