import './Sidebar.css';
import loan from '../../../assets/img/loan-icon.svg';
import book from '../../../assets/img/book-icon.svg';
import fee from '../../../assets/img/fee-icon.svg';
import author from '../../../assets/img/author-icon.svg'
import options from '../../../assets/img/options-icon.svg';
import partner from '../../../assets/img/options-icon.svg';
import { authMock } from '../../../data/mocks/authMock';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Sidebar({ isOpen }) {
    const location = useLocation();


    /*con esto se bloquea el scroll al abrir el sidebar y se desbloquea al cerrarlo, fue la unica forma que encontre 
    de que no se vean los filtros o lo que haya debajo sin modificar el html, el chat me dijo que es un patron muy común en UX, pero si no te gusta la idea quitalo
    */
    useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    // Limpieza por seguridad si se desmonta
    return () => document.body.classList.remove('sidebar-open');
  }, [isOpen]);

    return (  
        <>
          <nav className={`sidebar ${isOpen ? 'sidebar-active' : ''}`}>
            <div className='sidebar-user-name'>    
              <h3><strong>Javier Ondicol</strong></h3>
              {authMock.role === 'admin' ? (
              <h3>Administrador</h3>
              ): (
              <h3>Lector</h3>
              )}

            </div>
    
                    <ul className="listsidebar">
                        <li><div className='iconssidebar'><img src={loan} alt="Prestamos" /></div> <NavLink to="/loans" className={({ isActive }) => isActive ? 'active-link' : ''}> Prestamos
                        </NavLink></li>
                        <li><div className='iconssidebar'><img src={book} alt="Libros" /></div> <NavLink to="/books" className={({ isActive }) => isActive ? 'active-link' : ''}> Libros </NavLink>
                        </li>
                         <li>
                          <div className='iconssidebar'><img src={author} alt="Autor" /></div>
                          <NavLink to="/authors" className={({ isActive }) => isActive ? 'active-link' : ''}>Autor</NavLink>
                        </li>

                        {authMock.role === 'admin' && (
                          <li>
                            <div className='iconssidebar'><img src={partner} alt="Socio" /></div>
                            <NavLink to="/partners" className={({ isActive }) => isActive ? 'active-link' : ''}>Socios</NavLink>
                          </li>
                        )}

                        <li>
                          <div className='iconssidebar'><img src={fee} alt="Cuotas" /></div>
                          <NavLink to="/fees" className={({ isActive }) => isActive ? 'active-link' : ''}>Cuotas</NavLink>
                        </li>

                        <li>
                          <div className='iconssidebar'><img src={options} alt="Opciones" /></div>
                          <NavLink to="/options" className={({ isActive }) => isActive ? 'active-link' : ''}>Opciones</NavLink>
                        </li>
                    </ul>
                </nav> 
        </>
    )
        
    
}