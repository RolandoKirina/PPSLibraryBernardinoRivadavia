import './Sidebar.css';
import loan from '../../assets/img/loan-icon.svg';
import book from '../../assets/img/book-icon.svg';
import fee from '../../assets/img/fee-icon.svg';
import author from '../../assets/img/author-icon.svg'
import options from '../../assets/img/options-icon.svg';
import partner from '../../assets/img/options-icon.svg';

import { useEffect } from 'react';

export default function Sidebar({ isOpen }) {

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
            <h3><strong>Javier Ondicol</strong></h3>
            <h3>Administrador</h3>
                    <ul className="listsidebar">
                        <li><div className='iconssidebar'><img src={loan} alt="Prestamos" /></div> <a href="/loans">Prestamos</a></li>
                        <li><div className='iconssidebar'><img src={book} alt="Libros" /></div> <a href="/books">Libros</a></li>
                        <li><div className='iconssidebar' ><img src={author} alt="Autor" /></div> <a href="/authors">Autor</a></li>
                        <li><div className='iconssidebar'><img src={partner} alt="Socio" /></div> <a href="">Socios </a></li>
                        <li><div className='iconssidebar'><img src={fee} alt="Socio" /></div> <a href="">Cuotas</a></li>
                        <li><div className='iconssidebar'><img src={options} alt="Opciones" /></div> <a href="">Opciones</a></li>
                    </ul>
                </nav> 
        </>
    )
        
    
}