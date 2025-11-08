

import './PopUpDelete.css';
import Btn from '../btn/Btn';
import { useState } from 'react';
export default function PopUpDelete({ title, closePopup, onConfirm,refresh  }) {

    const [error, setError] = useState(null);
const [success, setSuccess] = useState(null);

  const handleConfirm = async () => {
    try {
    await onConfirm(); 
    setSuccess("✅ Libro eliminado correctamente."); 
    refresh(); 
    setError(null); 
        
    setTimeout(() => {
        setSuccess(null);
        closePopup(); // ✅ Cierra el popup
    }, 3000);

    } catch (err) {
     console.error("Error al eliminar:", err);
        setError("❌ No se pudo eliminar el recurso. Intentalo nuevamente.");
        setSuccess(null);    
    }
  };


    return (
        <>
            <div className={`delete-container`}>
                <div className='delete-content'>
                    <div className="titledelete">
                        <h2>¿Estás seguro de que quieres eliminar el {title}?</h2>
                        {error && <div className="deleteitem-error">{error}</div>}
                         {success && <div className="deleteitem-success">{success}</div>}
                    </div>
                
                    <div className='delete-btns'>
                        <Btn text='Cancelar' onClick={closePopup} variant='cancel' />
                        <Btn text='Eliminar' onClick={handleConfirm} variant='delete' />
                    </div>
                    
                </div>
            </div>

        </>
    )
}