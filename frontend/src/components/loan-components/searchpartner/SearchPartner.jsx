import './SearchPartner.css';
import Btn from '../../common/btn/Btn';
import { useState, useEffect } from 'react';
import { useEntityLookup } from '../../../hooks/useEntityLookup';

export default function SearchPartner({ onFilterChange, method, menu, onDataChange, partnerData }) {
  const [partnerMessageError, setPartnerMessageError] = useState(false);
  const [errorTarget, setErrorTarget] = useState(null);

  const { data: foundPartner, error: partnerError, loading: partnerLoading } = useEntityLookup(
    partnerData.partnerNumber,
    'http://localhost:4000/api/v1/partners/partner-number/'
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...partnerData, [name]: value };

    if (onDataChange) {
      onDataChange(updated);
    }

    if (name === "partnerNumber" && onFilterChange) {
      onFilterChange(prev => ({
        ...prev,
        partnerNumber: value
      }));
    }
  };

  useEffect(() => {
    if (partnerData?.partnerNumber) {
      setPartnerMessageError(false);
    }
  }, [partnerData?.partnerNumber]);

  const handleMenu = (option) => {
    const pNumber = foundPartner ? foundPartner.partnerNumber : partnerData.partnerNumber;

    if (!pNumber) {
      setPartnerMessageError(true);
      setErrorTarget(option);
      return;
    }

    setPartnerMessageError(false);
    setErrorTarget(null);

    // Lógica para abrir en NUEVA PESTAÑA (_blank)
    if (option === 'unpaidFees') {
      window.open(`/fees?partnerNumber=${pNumber}&status=unpaid`, '_blank');
    } else if (option === 'pendingBooks') {
      window.open(`/books?partnerNumber=${pNumber}&status=pending`, '_blank');
    } else {
      // Memo del socio se queda como PopUp (comportamiento original)
      menu(option);
    }
  };

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
              {partnerError && <p className="error-text">{partnerError}</p>}
              {foundPartner && !partnerError && (
                <p className="status-text success-text">
                  Socio encontrado: {foundPartner.name} {foundPartner.surname}
                </p>
              )}
              {partnerLoading && <p className="status-text loading-text">Buscando socio...</p>}
            </div>

            <div className="input">
              <label>Nombre completo <span className="required">*</span></label>
              <p>
                {foundPartner
                  ? `${foundPartner.name} ${foundPartner.surname}`
                  : partnerData.partnerName ?? '—'}
              </p>
            </div>
          </>
        )}
      </div>

      <div className='search-partner-buttons'>
        <div className='partnerOptionBtn'>
          <Btn text={'Cuotas Impagas'} onClick={() => handleMenu('unpaidFees')} />
          {partnerMessageError && errorTarget === 'unpaidFees' && (
            <p className="partner-error">Debes ingresar un número de socio</p>
          )}
        </div>

        <div className='partnerOptionBtn'>
          <Btn text={'Libros Pendientes'} onClick={() => handleMenu('pendingBooks')} />
          {partnerMessageError && errorTarget === 'pendingBooks' && (
            <p className="partner-error">Debes ingresar un número de socio</p>
          )}
        </div>

        <div className='partnerOptionBtn'>
          <Btn text={'Memo del Socio'} onClick={() => handleMenu('partnerMemo')} />
          {partnerMessageError && errorTarget === 'partnerMemo' && (
            <p className="partner-error">Debes ingresar un número de socio</p>
          )}
        </div>
      </div>
    </div>
  );
}