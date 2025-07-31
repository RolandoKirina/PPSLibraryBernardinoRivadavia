import { Table } from '../table/Table';
import './AddMaterialGroup.css';
import { useState } from 'react';
import ChooseIcon from '../../assets/img/choose-icon.svg';

export default function AddMaterialGroup() {
  const [popupView, setPopupView] = useState('default');
  const [selectedIds, setSelectedIds] = useState([]);

  const materials = [
    { id: 1, material: 'CD' },
    { id: 2, material: 'DVD' },
    { id: 3, material: 'Libro' },
    { id: 4, material: 'Revista' },
    { id: 5, material: 'Manual' },
  ];

  const materialColumns = [
    { header: 'Material', accessor: 'material' },
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
                <input type='text' />
              </div>
              <div className='add-loan-retire-date'>
                <label>Cantidad</label>
                <input type='number' />
              </div>
            </div>
            <div className='author-books-title'>
              <h3>Tipo de material disponible</h3>
            </div>
            <div className='materials-group'>
                <div className='group-table'>   
                    <Table columns={materialColumns} data={materials} />
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
