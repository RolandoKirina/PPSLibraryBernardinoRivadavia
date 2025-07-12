import './Sidebar.css';
import loan from '../../assets/img/loan-icon.svg';
import book from '../../assets/img/book-icon.svg';
import fee from '../../assets/img/fee-icon.svg';
import author from '../../assets/img/author-icon.svg'
import options from '../../assets/img/options-icon.svg';
import partner from '../../assets/img/options-icon.svg';
export default function Sidebar({ isOpen }) {

    return   (

        
<>
          <nav className={`sidebar ${isOpen ? 'sidebar-active' : ''}`}>
            <h3><strong>Javier Ondicol</strong></h3>
            <h3>Administrador</h3>
                    <ul className="listsidebar">
                        <li><div className='iconssidebar'><img src={book} alt="Libros" /></div> <a href="/books">Libros</a></li>
                        <li><div className='iconssidebar' ><img src={author} alt="Autor" /></div> <a href="">Autor</a></li>
                        <li><div className='iconssidebar'><img src={partner} alt="Socio" /></div> <a href="">Socios </a></li>
                        <li><div className='iconssidebar'><img src={fee} alt="Socio" /></div> <a href="">Cuotas</a></li>
                        <li><div className='iconssidebar'><img src={options} alt="Opciones" /></div> <a href="">Opciones</a></li>
                    </ul>
                </nav> 
        </>
    )
        
    
}