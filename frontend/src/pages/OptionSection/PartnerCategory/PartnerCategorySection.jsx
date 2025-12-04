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
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import { useEffect } from 'react';

export default function PartnerCategorySection() {
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [selected, setSelected] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false);

    const {
        items,
        getItems,
        // getItem: getGroupItem,
        deleteItem,
        createItem,
        updateItem
    } = useEntityManagerAPI("partner-categories");

    async function handleAddItem(data) {
        try {
            await createItem(data);

            await getItems();

            setAddPopup(false);

            setErrorMessage(null);
        }
        catch(error) {
            setErrorMessage(error.message);
            console.error("Error al crear una categoria de socio:", error);
        }
    }

    async function handleEditItem(data) {
        try {
            await updateItem(selected.idCategory, data);

            await getItems();

            setEditPopup(false);

            setErrorMessage(null);
        }
        catch(error) {
            setErrorMessage(error.message);
            console.error("Error al actualizar una categoria de socio:", error);
        }
    }

    useEffect(() => {
        getItems();
    }, []);

    const authorsPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar categoria de socio',
            className: 'delete-size-popup',
            content: <PopUpDelete
                title="Categoria de socio"
                onConfirm={() => deleteItem(selected.idCategory)}
                closePopup={() => setDeletePopup(false)}
                refresh={() => getItems()}
            />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        {
            key: 'editPopup',
            title: 'Editar categoria de socio',
            className: '',
            content: <GenericForm fields={partnerCategoryFields} onSubmit={(data) => handleEditItem(data)} error={errorMessage} />,
            close: () => {
                setEditPopup(false)
                setErrorMessage(null)
            },
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar categoria de socio',
            className: '',
            content: <GenericForm fields={partnerCategoryFields} onSubmit={(data) => handleAddItem(data)} error={errorMessage} />,
            close: () => {
                setAddPopup(false)
                setErrorMessage(null)
            },
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