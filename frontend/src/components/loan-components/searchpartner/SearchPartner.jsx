import './SearchPartner.css';
import Btn from '../../common/btn/Btn';
import { useState } from 'react';
import PopUp from '../../common/popup-table/PopUp';
import PartnerMemo from '../partnermemo/PartnerMemo';
import { useEffect } from 'react';

export default function SearchPartner({ method, menu, onDataChange, loanType, partnerData }) {
  const [memoPopup, setMemoPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...partnerData, [name]: value };
    console.log("Datos del socio:", updated);

    if (onDataChange) {
      onDataChange(updated);
    }
  };

  useEffect(() => {
    console.log(partnerData);
  }, [])

  function redirect(routeName) {
    window.open(`${window.location.origin}/${routeName}`, '_blank');
  }

  return (
    <div className='search-partner-container'>
      <h2>Socio</h2>
      <div className='search-partner-inputs'>
  {method === 'update' ? (
    <>
      <div className='input'>
        <label>Número <span className='required'>*</span></label>
        <p>{partnerData.partnerNumber ?? '—'}</p>
      </div>
      <div className='input'>
        <label>Nombre completo <span className='required'>*</span></label>
        <p>{partnerData.partnerName ?? '—'}</p>
      </div>
      <div className='input'>
        <label>Búsqueda por Memo</label>
        <p>{partnerData.memoSearch ?? '—'}</p>
      </div>
    </>
  ) : (
    <>
      <div className='input'>
        <label>Número <span className='required'>*</span></label>
        <input
          type='number'
          name='partnerNumber'
          value={partnerData.partnerNumber ?? ''}
          onChange={handleChange}
        />
      </div>
      <div className='input'>
        <label>Nombre completo <span className='required'>*</span></label>
        <input
          type='text'
          name='partnerName'
          value={partnerData.partnerName ?? ''}
          onChange={handleChange}
        />
      </div>
      <div className='input'>
        <label>Búsqueda por Memo</label>
        <input
          type='text'
          name='memoSearch'
          value={partnerData.memoSearch ?? ''}
          onChange={handleChange}
        />
      </div>
    </>
  )}
</div>


      <div className='search-partner-buttons'>
        <Btn text={'Cuotas Impagas'} onClick={() => menu('unpaidFees')} />
        <Btn text={'Libros Pendientes'} onClick={() => menu('pendingBooks')} />
        <Btn text={'Memo del Socio'} onClick={() => setMemoPopup(true)} />
      </div>

      {memoPopup && (
        <PopUp title={'Memo del Socio'} className={'popup-memo-size'} onClick={() => setMemoPopup(false)}>
          <PartnerMemo />
        </PopUp>
      )}
    </div>
  );
}
