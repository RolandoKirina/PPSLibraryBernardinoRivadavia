import { Table } from '../../common/table/Table';
import './AddMaterialGroup.css';
import { useState } from 'react';
import ChooseIcon from '../../../assets/img/choose-icon.svg';
import Btn from '../../common/btn/Btn';
import SaveIcon from '../../../assets/img/save-icon.svg';
import PopUp from '../../common/popup-table/PopUp';
import ConfirmMessage from '../../common/confirmMessage/ConfirmMessage';
import { useEffect } from 'react';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';

export default function AddMaterialGroup({ method, createGroupItem, updateGroupItem, getItems, items, itemSelected, closePopup }) {

  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmSaveChanges, setConfirmSaveChangesPopup] = useState(false);
  const [group, setGroup] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  const BASE_URL = "http://localhost:4000/api/v1";

  useEffect(() => {
    if (method === 'update') {
      const ids = itemSelected.BookTypeGroups.map(btGroup => btGroup.bookTypeId);
      setSelectedIds(ids);
      setGroup(itemSelected.group || '');
      setAmount(itemSelected.maxAmount || '');
    }
  }, [method]);

  const {
    items: bookTypeGroups,
    getItems: getBookTypeGroups,
    deleteItem: deleteBookTypeGroup,
    createItem: createBookTypeGroup,
    updateItem: updateBookTypeGroup
  } = useEntityManagerAPI("book-type-groups");

  async function handleAddItem() {
    try {
      if (selectedIds.length === 0) {
      setErrorMessage("Debes elegir al menos un material de préstamo");
      return;
      }

      setErrorMessage(null); 

      const newGroup = await createGroupItem({
        group,
        maxAmount: amount,
        bookTypes: selectedIds
      });

      await getItems();

      closePopup();

    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error al crear grupo o materiales:", error);
    }
  }

  async function updateBookTypesSelected(selectedIds) {
    try {
      const res = await fetch(`${BASE_URL}/book-type-groups/groupId/${itemSelected.bookTypeGroupListId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedIds)
      });
      if (!res.ok) throw new Error("Error al actualizar");
      
      const updated = await res.json();
      }
    catch (error) {
      console.error("Error al crear grupo o materiales:", error);
    }
  }


  async function handleUpdateItem() {
    try {
      if (selectedIds.length === 0) {
      setErrorMessage("Debes elegir al menos un material de préstamo");
      return;
      }    

      setErrorMessage(null); 

      const res = await updateGroupItem(itemSelected.bookTypeGroupListId, {
        group: group,
        maxAmount: amount,
        bookTypes: selectedIds
      })

      await getItems();

  //    console.log(selectedIds);

//      await updateBookTypesSelected(selectedIds);
      
      closePopup();

    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error al crear grupo o materiales:", error);
    }

  }


  const materialColumns = [
    { header: 'Material', accessor: 'typeName' },
    {
      header: 'Elegir',
      accessor: 'choose',
      render: (_, row) => (
        <button
          key={`select-${row.bookTypeId}-${selectedIds.includes(row.bookTypeId)}`} // fuerza re-render si cambia
          type="button"
          className={`button-table ${selectedIds.includes(row.bookTypeId) ? 'choosed' : ''}`}
          onClick={() => {
            setSelectedIds(prev => {
              const updated = prev.includes(row.bookTypeId)
                ? prev.filter(bookTypeId => bookTypeId !== row.bookTypeId)
                : [...prev, row.bookTypeId];
              return updated;
            });
          }}
        >
          <img src={ChooseIcon} alt="Elegir" />
        </button>
      )
    }
  ];

  return (
    <>
      <div className='add-material-container'>
        <div className='main-author-books'>
          <div className='add-loan-form-inputs add-material-inputs'>
            <div className='add-loan-retire-date input'>
              <label>Grupo <span className='required'>*</span></label>
              <input type='text' value={group} onChange={(e) => setGroup(e.target.value)} />
            </div>
            <div className='add-loan-retire-date input'>
              <label>Cantidad <span className='required'>*</span></label>
              <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
          </div>
            {errorMessage && (
                <p className="error-message">{errorMessage}</p>
            )}
          <div className='author-books-title'>
            <h3>Tipo de material disponible <span className='required'>*</span></h3>
          </div>
          <div className='materials-group'>
            <div className='group-table'>
              <Table columns={materialColumns} data={items} />
            </div>
          </div>
          <div className='save-changes-lend-books'>
            <Btn variant={'primary'} text={'Guardar'} onClick={() => {
              setConfirmSaveChangesPopup(true)
            }} icon={<img src={SaveIcon} alt='saveIconButton' />} />
          </div>
        </div>
        {confirmSaveChanges && (
          <PopUp title='Grupo de material' onClick={() => setConfirmSaveChangesPopup(false)}>
            <ConfirmMessage text={'¿Está seguro de guardar el nuevo grupo?'} closePopup={() => setConfirmSaveChangesPopup(false)} onConfirm={() => {
              if (method === 'add') {
                handleAddItem();
              }
              else if (method === 'update') {
                handleUpdateItem();
              }

              setConfirmSaveChangesPopup(false);
            }
            } />
          </PopUp>
        )}
      </div>

    </>
  );
}
