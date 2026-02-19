import { Link } from "react-router-dom";
import './Btn.css';

export default function Btn({ type = 'button', text, icon, onClick, variant, disabled, href }) {

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    cancel: "cancel-btn",
    delete: "delete-btn",
    login: "login-btn",
    register: "register-btn",
    logout: "btn-logout",
    save: "btn-save",
    default: "my-button",
  };

  const variantClass = variantClasses[variant] || variantClasses.default;

  // Si es un enlace (Link)
  if (href) {
    return (
      <Link 
        to={disabled ? "#" : href} 
        className={`btn ${variantClass} ${disabled ? "disabled" : ""}`}
        style={disabled ? { pointerEvents: 'none', opacity: 0.6 } : {}}
      >
        <span className="btn-text">{text}</span>
      </Link>
    );
  }

  // Si es un botón normal
  return (
    <button
      type={type}
      className={`my-button ${variantClass} ${disabled ? "disabled" : ""}`}
      disabled={disabled}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        if (onClick) onClick(e);
      }}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{text}</span>
    </button>
  );
}