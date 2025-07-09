import logo from '../../assets/img/logo_biblioteca_rivadavia.svg';
import btnopen from '../../assets/img/menu_arrow_open.svg';
import './Header.css';
import { useState } from 'react';
import Sidebar from '../sidebar/Sidebar.jsx';
export default function Header(){
    const [open,setOpen]= useState(false);

    const toggleMenu =()  =>{
        setOpen(!open);
    }

    return (
        <>
    <header className="header">
            <div className="header-container">
             <button onClick={toggleMenu} className="menu-button">
                    <div className="btnmenuimg">
                        <img
                        src={btnopen}
                        alt="Menú"
                        className={open ? 'rotate' : ''}
                        />
                    </div>
              </button>
                <div className="title">
                    <div> 
                        <div className='logo' > 
                        <img src={logo} alt="Logo Biblioteca Rivadavia" />                
                        </div>
                          <h1>Biblioteca Popular Bernardino Rivadavia</h1>
                    </div>
                </div>
            </div>
    </header>

    

               
                <Sidebar isOpen={open} />
            
        </>
    )
}

    