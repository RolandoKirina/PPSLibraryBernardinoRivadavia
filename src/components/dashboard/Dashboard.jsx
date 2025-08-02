import GenericSection from "../generic/GenericSection/GenericSection.jsx";
import loan from '../../assets/img/dark-icon/loan-dark-icon.svg';
import book from '../../assets/img/dark-icon/book-dark-icon.svg';
import fee from '../../assets/img/dark-icon/fee-dark-icon.svg';
import author from '../../assets/img/dark-icon/author-dark-icon.svg'
import options from '../../assets/img/dark-icon/options-dark-icon.svg';
import partner from '../../assets/img/dark-icon/partner-dark-icon.svg';
import './Dashboard.css';
export default function Dashboard(){


    return (
        <>
        
            <GenericSection title="Panel de Administración">
                <div className="container-all">
    <div className="container-dashboard-cards">
                    <div className="card-container">


                            <a href="/loans">
                            <div className="card">
                                <div className="card-title">
                                  <h2>Prestámos</h2>
                                </div>
                                <div className="card-icons">
                                    <img src={loan} alt="Prestámo" />
                                </div>
                            </div>
                            </a>

                            <a href="/books">
                            <div className="card">
                                <div className="card-title">
                                    <h2>Libros</h2>
                                </div>
                                <div className="card-icons">
                                    <img src={book} alt="Libros" />
                                </div>
                            </div>
                            </a>

                            <a href="/authors">
                            <div className="card">
                                
                                <div className="card-title">
                                   <h2>Autores</h2>
                                </div>
                                 <div className="card-icons">
                                    <img src={author} alt="Autores" />
                                </div>
                              
                            </div>
                            </a>
                    </div>

                    <div className="card-container">

                          <a href="/fees">
                            <div className="card">
                                <div className="card-title">
                                  <h2>Cuotas</h2>
                                </div>
                                 <div className="card-icons">
                                    <img src={fee} alt="Cuotas" />
                                </div>
                            </div>
                            </a>


                            <a href="/partners"> 
                            <div className="card">
                                <div className="card-title">
                                   <h2>Socios</h2>
                                </div>
                                <div className="card-icons">
                                    <img src={partner} alt="Socios" />
                                </div>
                            </div>
                            </a>


                            <a href="/options">
                            <div className="card">
                                <div className="card-title">
                                    <h2>Opciones</h2>
                                </div>
                                    <div className="card-icons">
                                    <img src={options} alt="Opciones" />
                                </div>
                            </div>
                            </a>
                    </div>
                </div>
                </div>
              
                </GenericSection>                        
           
        </>
    )
}