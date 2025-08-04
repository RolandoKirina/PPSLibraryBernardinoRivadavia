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
import { useEmployeeManager } from '../../../hooks/useEmployeeManager';
import { useEntityManager } from '../../../hooks/useEntityManager';
import { mockEmployees } from '../../../data/mocks/employee';

export default function EmployeeSection() {
    const [deletePopup, setDeletePopup] = useState(false);
    const [detailsPopup, setDetailsPopup] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(false);
    const { items, getItem, createItem, updateItem, deleteItem } = useEntityManager(mockEmployees, 'employees');
    
    

    // const employees = [
    // { id: 1, employeeName: 'juan carlos', code: '10'},
    // { id: 1, employeeName: 'juan carlos', code: '10'},
    // { id: 1, employeeName: 'juan carlos', code: '10'},
    // { id: 1, employeeName: 'juan carlos', code: '10'},
    // { id: 1, employeeName: 'juan carlos', code: '10'},
    // ];

    function redirect(action){
         switch(action){
            case 'add':{
                let title ="Empleados";
                window.open(`${window.location.origin}/employee/register`, '_blank',title);
                break;
            }
            case 'edit':{
                let title ="Editar Empleado";
                window.open(`${window.location.origin}/employee/edit-employee`, '_blank',title);
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
                    deleteItem(selectedEmployee.id)
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
                    content: <ShowDetails detailsData={employeeDetails} isPopup={true} />,
                    close: () => setDetailsPopup(false),
                    condition: detailsPopup
                },


                
    ];

    const columns = [
        { header: 'Nombre', accessor: 'fullname' },
        { header: 'Codigo', accessor: 'employeeCode' },
        {
            header: 'Borrar',
            accessor: 'delete',
            render: (_, row) => (
            <button className="button-table" onClick={() => {
                setDeletePopup(true)
                setSelectedEmployee(row)
                }}>
                <img src={DeleteIcon} alt="Borrar" />
            </button>
            )
        },
        {
            header: 'Editar',
            accessor: 'edit',
            render: (_, row) => (
            <button className="button-table"  onClick={() => redirect('edit')}>
                <img src={EditIcon} alt="Editar" />
            </button>
            )
        },
        {
            header: 'Ver detalle',
            accessor: 'details',
            render: (_, row) => (
            <button className="button-table" onClick={() => setDetailsPopup(true)}>
                <img src={DetailsIcon} alt="Detalles" />
            </button>
            )
        }

    ];

    return (
        <>
            <GenericSection title={'Listado de empleados'} columns={columns} data={items} popups={employeePopups} actions={
                <Btn className='new-btn' onClick={() => redirect('add')} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg'/>}/>
            }/>
        </>
    )
}