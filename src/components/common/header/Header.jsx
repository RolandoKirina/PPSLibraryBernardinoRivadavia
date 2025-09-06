import logo from '../../../assets/img/logo_biblioteca_rivadavia.svg';
import btnopen from '../../../assets/img/menu_arrow_open.svg';
import './Header.css';
import { useState } from 'react';
import Sidebar from '../sidebar/Sidebar.jsx';
import Btn from '../btn/Btn.jsx';
import { authMock } from '../../../data/mocks/authMock.js';
export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <header className="header">
          <div className="header-container">
            
            <div className="header-left">
              <button onClick={toggleMenu} className="menu-button">
                <div className="btnmenuimg">
                  <img src={btnopen} alt="Menú" className={open ? 'rotate' : ''} />
                </div>
              </button>
            </div>

            <div className="header-center">
              <a href="/" className="logo">
                <img src={logo} alt="Logo Biblioteca Rivadavia" />
              </a>
              <h1 className="title-text">Biblioteca Popular Bernardino Rivadavia</h1>
            </div>

            <div className="header-right">
              {!authMock.isAuthenticated ? (
                <div className="auth-buttons">
                  <Btn text="Ingresar" variant="login" href="/login" />
                  <Btn text="Registrarse" variant="register" href="/register" />
                </div>
              ) : (
                <h3 className="header-msg">
                  Bienvenido <span className="header-name">{authMock.name}</span>
                </h3>
              )}
            </div>

          </div>
          <Sidebar isOpen={open} />
        </header>
    </>
  );
}
