import './Sidebar.css';
import loan from '../../../assets/img/loan-icon.svg';
import book from '../../../assets/img/book-icon.svg';
import fee from '../../../assets/img/fee-icon.svg';
import author from '../../../assets/img/author-icon.svg';
import options from '../../../assets/img/options-icon.svg';
import partner from '../../../assets/img/options-icon.svg';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import roles from '../../../auth/roles.js';
export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

    const { auth, logout } = useAuth();

  // Bloquea el scroll cuando el sidebar está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    return () => document.body.classList.remove('sidebar-open');
  }, [isOpen]);

  // Cierra el sidebar cuando cambia la ruta
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  return (
    <>
      {/* Overlay para cerrar haciendo click afuera */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <nav className={`sidebar ${isOpen ? 'sidebar-active' : ''}`}>
        <div className="sidebar-user-name">
          <h3>
            <strong>Javier Ondicol</strong>
          </h3>
              {auth.role === roles.admin
                  ? <h3>Administrador</h3>
                  : auth.role === roles.user
                    ? <h3>Usuario</h3>
                : <h3>Lector</h3>}
    
            </div>

 
        <ul className="listsidebar">
           {(auth.role === roles.admin || auth.role === roles.user) &&  (
          <li>
            <div className="iconssidebar">
              <img src={loan} alt="Prestamos" />
            </div>
            <NavLink
              to="/loans"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Prestamos
            </NavLink>
          </li>)}
          <li>
            <div className="iconssidebar">
              <img src={book} alt="Libros" />
            </div>
            <NavLink
              to="/books"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Libros
            </NavLink>
          </li>
          <li>
            <div className="iconssidebar">
              <img src={author} alt="Autor" />
            </div>
            <NavLink
              to="/authors"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Autor
            </NavLink>
          </li>

          {auth.role === roles.admin && (
            <li>
              <div className="iconssidebar">
                <img src={partner} alt="Socio" />
              </div>
              <NavLink
                to="/partners"
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                Socios
              </NavLink>
            </li>
          )}

      {(auth.role === roles.admin || auth.role === roles.user) &&  (
          <li>
            <div className="iconssidebar">
              <img src={fee} alt="Cuotas" />
            </div>
            <NavLink
              to="/fees"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Cuotas
            </NavLink>
          </li>)}


  {(auth.role === roles.admin || auth.role === roles.user) &&  (
          <li>
            <div className="iconssidebar">
              <img src={options} alt="Opciones" />
            </div>
            <NavLink
              to="/options"
              className={({ isActive }) => (isActive ? 'active-link' : '')}
            >
              Opciones
            </NavLink>
          </li>)}
        </ul>
      </nav>
    </>
  );
}
