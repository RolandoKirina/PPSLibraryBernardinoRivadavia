
export default function Btn({ type = 'button', text, icon, onClick, variant, disabled,href }) {

  //puse 4 diferentes tipos
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    cancel:"cancel-btn",
    delete:"delete-btn",
    register:"register-btn",
    login:"login-btn",
    register:"register-btn",
    default: "my-button"
    

  };


  //hace un mapeo para ver q clase se aplica
  const variantClass = variantClasses[variant] || variantClasses.default;



  if (href) {
    return (
      <button className={`btn ${variantClass}`}>

          <a href={href} >
        <span className="btn-text">{text}</span>
      </a>
      </button>
    
    );
  }
  return (
    <button
      type={type}
      className={`my-button ${variantClass}`}
      onClick={onClick}
       disabled={disabled}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{text}</span>
    </button>
  );


  
}