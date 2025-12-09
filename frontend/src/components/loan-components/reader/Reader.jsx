import './Reader.css';
import { useEntityLookup } from '../../../hooks/useEntityLookup';

export default function Reader({ loanType, onDataChange, readerData }) {
  const { data: foundReader, error: readerError, loading: readerLoading } = useEntityLookup(
    readerData.readerDNI,
    `http://localhost:4000/api/v1/readers?dni=`  
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (onDataChange && loanType === 'in_room') {
      onDataChange({ [name]: value });
    }
  };

  return (
    <div className='search-partner-container'>
      <h2>Lector</h2>

      <div className='search-partner-inputs'>
        
        <div className='input'>
          <label>DNI <span className='required'>*</span></label>

          <input
            type='number'
            name='readerDNI'
            value={readerData.readerDNI ?? ''}
            onChange={handleChange}
          />

          {readerError && <p className="error-text">{readerError}</p>}
          {readerLoading && <p className="status-text loading-text">Buscando lector...</p>}
          {foundReader && !readerError && (
            <p className="status-text success-text">
              Lector encontrado: {foundReader.name} {foundReader.surname}
            </p>
          )}
        </div>

        <div className='input'>
          <label>Nombre completo<span className='required'>*</span></label>

          <input
            type='text'
            name='readerName'
            value={readerData.readerName ?? ''}
            onChange={handleChange}
          />
        </div>

      </div>
    </div>
  );
}
