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

export default function AddMaterialGroup({ method, createGroupItem, updateGroupItem, items, closePopup }) {

  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmSaveChanges, setConfirmSaveChangesPopup] = useState(false);
  const [group, setGroup] = useState('');
  const [amount, setAmount] = useState('');

  const BASE_URL = "http://localhost:4000/api/v1";

  const {
    items: bookTypeGroups,
    getItems: getBookTypeGroups,
    deleteItem: deleteBookTypeGroup,
    createItem: createBookTypeGroup,
    updateItem: updateBookTypeGroup
  } = useEntityManagerAPI("book-type-groups");

  async function handleAddItem() {
  try {
    const newGroup = await createGroupItem({
      group,
      maxAmount: amount
    });

    const newGroupId = newGroup.bookTypeGroupListId;

    await Promise.all(
      selectedIds.map(bookTypeId =>
        createBookTypeGroup({
          BookTypeGroupListId: newGroupId,
          bookTypeId
        })
      )
    );

    closePopup();

  } catch (error) {
    console.error("Error al crear grupo o materiales:", error);
  }
}


  function handleUpdateItem() {
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
