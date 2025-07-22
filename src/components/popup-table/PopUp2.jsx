import "./popup.css";
/*en el classname hay que definir la altura y ancho del formulario en cada lugar que lo vaya a usar.
*/
import ClosePopupImg from '../../assets/img/close-popup-btn.svg';

export default function PopUp({ title, className, onClick,children,variant}) {

  const variantClass = variant === "delete" ? "titlepopup-delete" : "";
  return (
    <>
    <div className="popup">
    <div className={`bordepopup ${className}`}>
        <div className={`titlepopup2 ${variantClass}`}>
          <h1 className="titlepopuph1">{title}</h1>
           <button className='edit-form-close-btn' onClick={onClick}><img src={ClosePopupImg}/></button>
        </div>
         <div>
          {children}
         </div>
      </div>
    </div>
    </>
    
  );
}

