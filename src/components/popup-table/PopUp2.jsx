import "./popup.css";
/*en el classname hay que definir la altura y ancho del formulario en cada lugar que lo vaya a usar.
*/

export default function PopUp({ title, className, onClick,children}) {
  return (
    <>
    <div className="popup" onClick={onClick}>
    <div className={`bordepopup ${className}`}>
        <div className='titlepopup2'>
          <h1>{title}</h1>
        </div>
         <div>
          {children}
         </div>
      </div>
    </div>
    </>
    
  );
}

