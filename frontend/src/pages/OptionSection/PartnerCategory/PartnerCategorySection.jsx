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
import { useEntityManager } from '../../../hooks/useEntityManager';
import { mockPartnersCategory } from '../../../data/mocks/partnersCategory';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import { useEffect } from 'react';

export default function PartnerCategorySection() {
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [selected, setSelected] = useState(null);

    const {
           items,
           getItems,
           // getItem: getGroupItem,
           deleteItem,
           createItem,
           updateItem
    } = useEntityManagerAPI("partner-categories");

    function handleAddItem(data) {
        createItem(data);
        setAddPopup(false);
    }

    function handleEditItem(data) {
        updateItem(selected.idCategory, data);
        setEditPopup(false);
    }

    useEffect(() => {
        getItems(); 
    }, [items]);

    const authorsPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar categoria de socio',
            className: 'delete-size-popup',
            content: <PopUpDelete title={"Categoria de socio"} closePopup={() => setDeletePopup(false)} onConfirm={
                () => {
                    deleteItem(selected.idCategory)
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
            content: <GenericForm fields={partnerCategoryFields} onSubmit={(data) => handleEditItem(data)} />,
            close: () => setEditPopup(false),
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar categoria de socio',
            className: '',
            content: <GenericForm fields={partnerCategoryFields} onSubmit={(data) => handleAddItem(data)} />,
            close: () => setAddPopup(false),
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
                    console.log(row);
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
            <GenericSection title={'Listado de categorias de socios'} columns={columns} data={items} popups={authorsPopups} actions={
                <Btn variant={'primary'} className='new-btn' onClick={() => setAddPopup(true)} text={'Nuevo'} icon={<img src={PlusIcon} alt='plusIconImg' />} />
            } />
        </>
    )
}