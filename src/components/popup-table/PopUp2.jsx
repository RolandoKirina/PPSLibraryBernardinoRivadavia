import "./popup.css";
/*en el classname hay que definir la altura y ancho del formulario en cada lugar que lo vaya a usar.
*/

import { useEffect, useState } from 'react';

import ClosePopupImg from '../../assets/img/close-popup-btn.svg';

export default function PopUp({ title, className, onClick,children,variant}) {


  const [visible, setVisible] = useState(false);
    const [exiting, setExiting] = useState(false);

   useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10); // delay pequeño para permitir el trigger de la animación
    return () => clearTimeout(timer);
  }, []); 

    const handleClose = () => {
        setExiting(true);
        setTimeout(() => {
          onClick(); // Este es tu setPopUpX(false)
        }, 300); // Tiempo que coincida con tu animación CSS
      };

  const variantClass = variant === "delete" ? "titlepopup-delete" : "";
  return (
    <>
    <div className={`popup`}>
   <div className={`bordepopup ${className} ${visible ? 'popup-visible' : ''} ${exiting ? 'popup-exit' : ''}`}>
        <div className={`titlepopup2 ${variantClass}`}>
          <h1 className="titlepopuph1">{title}</h1>
           <button className='edit-form-close-btn'  onClick={handleClose}><img src={ClosePopupImg}/></button>
        </div>
         <div>
          {children}
         </div>
      </div>
    </div>
    </>
    
  );
}

