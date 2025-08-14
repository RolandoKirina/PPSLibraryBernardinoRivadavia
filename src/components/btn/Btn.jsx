
export default function Btn({ text, icon, onClick, variant }) {

  //puse 4 diferentes tipos
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    cancel:"cancel-btn",
    delete:"delete-btn",
    default: "my-button"
    

  };


  //hace un mapeo para ver q clase se aplica
  const variantClass = variantClasses[variant] || variantClasses.default;
  return (
    <button

      className={`my-button ${variantClass}`}
      onClick={onClick}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{text}</span>
    </button>
  );


  
}