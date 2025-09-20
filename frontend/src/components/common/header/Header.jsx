import logo from '../../../assets/img/logo_biblioteca_rivadavia.svg';
import btnopen from '../../../assets/img/menu_arrow_open.svg';
import './Header.css';
import { useState } from 'react';
import Sidebar from '../sidebar/Sidebar.jsx';
import Btn from '../btn/Btn.jsx';
import { authMock } from '../../../data/mocks/authMock.js';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);

  const { auth, logout } = useAuth();

  
  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <button onClick={toggleMenu} className="menu-button">
              <div className="btnmenuimg">
                <img
                  src={btnopen}
                  alt="Menú"
                  className={open ? 'rotate' : ''}
                />
              </div>
            </button>
          </div>

          <div className="header-center">
            <Link to='/' className="logo">
              <img src={logo} alt="Logo Biblioteca Rivadavia" />
            </Link>
            <h1 className="title-text">
              Biblioteca Popular Bernardino Rivadavia
            </h1>
          </div>

          <div className="header-right">
            {!auth.isAuthenticated ? (
              <div className="auth-links">
                <Link to={'/login'}>
                  Ingresar
                </Link>
                <Link to={'/register'}>
                  Registrarse
                </Link>
              </div>
            ) : (
              <div>
              <h3 className="header-msg">
                Bienvenido{' '}
                <span className="header-name">{auth.name}</span>
              </h3>
               <Btn variant="primary" text="Cerrar sesión" onClick={logout} />
               </div>
            )}
          </div>
        </div>
        <Sidebar isOpen={open} onClose={closeMenu} />
      </header>
    </>
  );
}
