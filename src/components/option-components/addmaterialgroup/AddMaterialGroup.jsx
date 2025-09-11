import { Table } from '../../common/table/Table';
import './AddMaterialGroup.css';
import { useState } from 'react';
import ChooseIcon from '../../../assets/img/choose-icon.svg';
import Btn from '../../common/btn/Btn';
import SaveIcon from '../../../assets/img/save-icon.svg';
import PopUp from '../../common/popup-table/PopUp';
import ConfirmMessage from '../../common/confirmMessage/ConfirmMessage';
import { useEffect } from 'react';

export default function AddMaterialGroup({method, createItem, updateItem, getItemGroup, getMaterialItem, items, itemIdSelected }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmSaveChanges, setConfirmSaveChangesPopup] = useState(false);
  const [group, setGroup] = useState('');
  const [amount, setAmount] = useState('');
  
   useEffect(() => {
     if(method === 'update') {
       let materialsData = getItemGroup(itemIdSelected);

       if(materialsData && materialsData.materials) {
        let materialsId = materialsData.materials.map((material) => material.id);

        setSelectedIds(materialsId);
       }
     }
     else {
       setSelectedIds([]);
     }
   }, [method, itemIdSelected]);

  function handleAddItem() {

    const materials = selectedIds
      .map(id => getMaterialItem(id))
      .filter(item => item); // filtra nulos por si algún ID no existe


    createItem({
      groupDescription: group,
      loanDays: amount,
      materials: materials
    });
  }

  function handleUpdateItem() {
    const materials = selectedIds
      .map(id => getMaterialItem(id))
      .filter(item => item); // filtra nulos por si algún ID no existe

    let data = {
      groupDescription: group,
      loanDays: amount,
      materials: materials
    }

    updateItem(itemIdSelected, data);   
  }


  const materialColumns = [
    { header: 'Material', accessor: 'description' },
    {
      header: 'Elegir',
      accessor: 'choose',
      render: (_, row) => (
        <button
          key={`select-${row.id}-${selectedIds.includes(row.id)}`} // fuerza re-render si cambia
          type="button"
          className={`button-table ${selectedIds.includes(row.id) ? 'choosed' : ''}`}
          onClick={() => {
            setSelectedIds(prev => {
              const updated = prev.includes(row.id)
                ? prev.filter(id => id !== row.id)
                : [...prev, row.id];
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
                <input type='text' value={group} onChange={(e) => setGroup(e.target.value)}/>
              </div>
              <div className='add-loan-retire-date input'>
                <label>Cantidad <span className='required'>*</span></label>
                <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)}/>
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
                    }} icon={<img src={SaveIcon} alt='saveIconButton'/> }/>
            </div>
          </div>
          {confirmSaveChanges && (
            <PopUp title='Grupo de material' onClick={() => setConfirmSaveChangesPopup(false)}>
              <ConfirmMessage text={'¿Está seguro de guardar el nuevo grupo?'} closePopup={() => setConfirmSaveChangesPopup(false)} onConfirm={() => {
                if(method === 'add') {
                  handleAddItem();
                }
                else if(method === 'update') {
                  handleUpdateItem();
                }

                setConfirmSaveChangesPopup(false);
                }
                }/>
            </PopUp>
          )}
        </div>

    </>
  );
}
