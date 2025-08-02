import './PartnerCategorySection.css';
import GenericSection from '../../../components/generic/GenericSection/GenericSection';
import PopUpDelete from '../../../components/deletebtnComponent/PopUpDelete';
import GenericForm from '../../../components/generic/GenericForm/GenericForm';
import { partnerCategoryFields } from '../../../data/options/partner-category/PartnerCategoryForms';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import { useState } from 'react';
import Btn from '../../../components/btn/Btn';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';



export default function PartnerCategorySection() {
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [selectedPartnerCategory, setSelectedPartnerCategory] = useState(null);
    const { partnerCategories, getPartnerCategory, createPartnerCategory, updatePartnerCategory, deletePartnerCategory } = usePartnerCategoryManager(mockPartnerCategories);

    // const partnerCategories = [
    // { id: 1, category: 'Honorario', import: '$3500' },
    // { id: 1, category: 'Honorario', import: '$3500' },
    // { id: 1, category: 'Honorario', import: '$3500' },
    // { id: 1, category: 'Honorario', import: '$3500' },
    // { id: 1, category: 'Honorario', import: '$3500' },
    // ];

     const authorsPopups = [
                {
                    key: 'deletePopup',
                    title: 'Borrar categoria de socio',
                    className: 'delete-size-popup',
                    content: <PopUpDelete title={"Categoria de socio"} closePopup={() => setDeletePopup(false)} onConfirm={
                () => {
                    deletePartnerCategory(selectedPartnerCategory.partnerCategoryId)
                    setDeletePopup(false)
                }
            } />,
                    close: () => setDeletePopup(false),
                    condition: deletePopup,
                    variant: 'delete'
                },
                {
                    key: 'editPopup',
                    title: 'Editar categoria de socio',
                    className: '',
                    content: <GenericForm fields={partnerCategoryFields} onSubmit={(data) => console.log('Formulario enviado:', data)}/>,
                    close: () => setEditPopup(false),
                    condition: editPopup
                },
                {
                    key: 'addPopup',
                    title: 'Agregar categoria de socio',
                    className: '',
                    content: <GenericForm fields={partnerCategoryFields} onSubmit={(data) => console.log('Formulario enviado:', data)}/>,
                    close: () => setAddPopup(false),
                    condition: addPopup
                }
    ];

    const columns = [
        { header: 'Categoria', accessor: 'partnerCategory' },
        { header: 'Importe', accessor: 'amount' },
        {
            header: 'Borrar',
            accessor: 'delete',
            render: (_, row) => (
            <button className="button-table" onClick={() => {
                setDeletePopup(true)
                setSelectedPartnerCategory(row)
                }}>
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
            <GenericSection title={'Listado de categorias de socios'} columns={columns} data={partnerCategories} popups={authorsPopups} actions={
                <Btn className='new-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg'/>}/>
            }/>
        </>
    )
}