export default function Btn({ text, className, icon, onClick, type }) {

  return (
    
    <button type={type ? type : 'button'} className={`my-button ${className}`} onClick={onClick}>
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{text}</span>
    </button>
  );


  
}