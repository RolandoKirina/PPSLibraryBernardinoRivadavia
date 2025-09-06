import logo from '../../../assets/img/logo_biblioteca_rivadavia.svg';
import btnopen from '../../../assets/img/menu_arrow_open.svg';
import './Header.css';
import { useState } from 'react';
import Sidebar from '../sidebar/Sidebar.jsx';
import Btn from '../btn/Btn.jsx';
export default function Header() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="menu-wrapper">
            <button onClick={toggleMenu} className="menu-button">
              <div className="btnmenuimg">
                <img src={btnopen} alt="Menú" className={open ? 'rotate' : ''} />
              </div>
            </button>
          </div>

          <div className="title-wrapper">
            <a href="/" className="logo">
              <img src={logo} alt="Logo Biblioteca Rivadavia" />
            </a>
            <h1 className="title-text">Biblioteca Popular Bernardino Rivadavia</h1>
          </div>

            <div className="auth-buttons">
                <Btn text="Ingresar" variant="primary" href="/login" />
                <Btn text="Registrarse" variant="secondary" href="/register" />
            </div>
        </div>
      </header>
      <Sidebar isOpen={open} />
    </>
  );
}
