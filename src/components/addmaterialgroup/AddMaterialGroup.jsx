import { Table } from '../table/Table';
import './AddMaterialGroup.css';
import { useState } from 'react';
import ChooseIcon from '../../assets/img/choose-icon.svg';
import { mockLoanMaterials } from '../../data/mocks/loanMaterials';
import Btn from '../btn/Btn';
import SaveIcon from '../../assets/img/save-icon.svg';
import { useEntityManager } from '../../hooks/useEntityManager';
import PopUp from '../popup-table/PopUp2';
import ConfirmMessage from '../confirmMessage/ConfirmMessage';
import { useEffect } from 'react';

export default function AddMaterialGroup({method, createItem, updateItem, getItemGroup, getMaterialItem, items, itemIdSelected }) {
  const [popupView, setPopupView] = useState('default');
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmSaveChanges, setConfirmSaveChangesPopup] = useState(false);
  const [group, setGroup] = useState('');
  const [amount, setAmount] = useState('');
  
   useEffect(() => {
     if(method === 'update') {

       let materialsData = getItemGroup(itemIdSelected);

       console.log(materialsData);

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
          type="button"
          className={`button-table ${selectedIds.includes(row.id) ? 'choosed' : ''}`}
          onClick={() => {
            setSelectedIds((prev) =>
              prev.includes(row.id)
                ? prev.filter((id) => id !== row.id) // desmarca si ya estaba
                : [...prev, row.id] // marca si no estaba
            );
            console.log('Elegidos:', [...selectedIds, row.id]);
          }}
        >
          <img src={ChooseIcon} alt="Elegir" />
        </button>
      )
    }
  ];

  return (
    <>
      {popupView === 'default' && (
        <div className='author-books-container add-material-container'>
          <div className='main-author-books'>
            <div className='add-loan-form-inputs'>
              <div className='add-loan-retire-date'>
                <label>Grupo</label>
                <input type='text' value={group} onChange={(e) => setGroup(e.target.value)}/>
              </div>
              <div className='add-loan-retire-date'>
                <label>Cantidad</label>
                <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)}/>
              </div>
            </div>
            <div className='author-books-title'>
              <h3>Tipo de material disponible</h3>
            </div>
            <div className='materials-group'>
                <div className='group-table'>   
                    <Table columns={materialColumns} data={items} />
                </div>
            </div>
            <div className='save-changes-lend-books'>
                  <Btn text={'Guardar'} onClick={() => {
                    setConfirmSaveChangesPopup(true)
                    }} icon={<img src={SaveIcon} alt='saveIconButton'/> }/>
            </div>
          </div>
          {confirmSaveChanges && (
            <PopUp>
              <ConfirmMessage text={'¿Está seguro de guardar el nuevo prestamo?'} closePopup={() => setConfirmSaveChangesPopup(false)} onConfirm={() => {
                

                if(method === 'add') {
                  handleAddItem();
                }
                else if(method === 'update') {
                  handleUpdateItem();
                }

                setConfirmSaveChangesPopup(false);
                }}/>
            </PopUp>
          )}
        </div>
      )}
    </>
  );
}
