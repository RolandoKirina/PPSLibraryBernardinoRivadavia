import './Reader.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Reader({ loanType, onDataChange }) {
  const [readerData, setReaderData] = useState({
    readerDNI: '',
    readerName: ''
  });

  useEffect(() => {
    if(onDataChange && loanType === 'in_room') {
        onDataChange(readerData)
    }
  }, [readerData])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setReaderData(prev => {
      const updated = { ...prev, [name]: value };
      console.log("Datos del lector:", updated);
      return updated;
    });
  };

  return (
    <div className='search-partner-container'>
      <h2>Lector</h2>
      <div className='search-partner-inputs'>
        <div>
          <label>DNI</label>
          <input
            type='number'
            name='readerDNI'
            value={readerData.readerDNI}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Apellido, Nombre</label>
          <input
            type='text'
            name='readerName'
            value={readerData.readerName}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
