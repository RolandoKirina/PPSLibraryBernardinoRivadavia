export default function Btn({ text, className, icon, onClick }) {


  return (
    
    <button className={`my-button ${className}`} onClick={onClick}>
      {icon && <span className="button-icon">{icon}</span>}
      <span>{text}</span>
    </button>
  );


  
}