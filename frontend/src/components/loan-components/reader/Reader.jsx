import './Reader.css';

export default function Reader({ loanType, onDataChange, readerData }) {
  console.log(readerData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Envia SOLO el campo cambiado
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
        </div>

        <div className='input'>
          <label>Apellido, Nombre <span className='required'>*</span></label>
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
