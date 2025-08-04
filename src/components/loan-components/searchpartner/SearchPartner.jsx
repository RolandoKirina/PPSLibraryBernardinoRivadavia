import './SearchPartner.css';
import Btn from '../../btn/Btn';
import { useState, useEffect } from 'react';
import PopUp from '../../popup-table/PopUp2';
import PartnerMemo from '../partnermemo/PartnerMemo';

export default function SearchPartner({ menu, onDataChange, loanType }) {
  const [memoPopup, setMemoPopup] = useState(false);

  const [partnerData, setPartnerData] = useState({
    partnerNumber: '',
    partnerName: '',
    memoSearch: ''
  });

  // Comunicar cambios a LoanForm de forma segura
  useEffect(() => {
    if (onDataChange && loanType === 'retired') {
      onDataChange(partnerData);
    }
  }, [partnerData]);

  function redirect(routeName) {
    window.open(`${window.location.origin}/${routeName}`, '_blank');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartnerData(prev => {
      const updated = { ...prev, [name]: value };
      console.log("Datos del socio:", updated);
      return updated;
    });
  };

  return (
    <>
      <div className='search-partner-container'>
        <h2>Socio</h2>
        <div className='search-partner-inputs'>
          <div>
            <label>Número</label>
            <input
              type='number'
              name='partnerNumber'
              value={partnerData.partnerNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Apellido, Nombre</label>
            <input
              type='text'
              name='partnerName'
              value={partnerData.partnerName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Búsqueda por Memo</label>
            <input
              type='text'
              name='memoSearch'
              value={partnerData.memoSearch}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='search-partner-buttons'>
          <Btn text={'Cuotas Impagas'} onClick={() => menu('unpaidQuotes')} />
          <Btn text={'Libros Pendientes'} onClick={() => redirect('loans/filters/partner')} />
          <Btn text={'Memo del Socio'} onClick={() => setMemoPopup(true)} />
        </div>

        {memoPopup && (
          <PopUp title={'Memo del Socio'} className={'popup-memo-size'} onClick={() => setMemoPopup(false)}>
            <PartnerMemo />
          </PopUp>
        )}
      </div>
    </>
  );
}
