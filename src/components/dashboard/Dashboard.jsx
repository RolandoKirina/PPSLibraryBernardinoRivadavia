import GenericSection from "../generic/GenericSection/GenericSection.jsx";
import loan from '../../assets/img/loan-icon.svg';
import book from '../../assets/img/book-icon.svg';
import fee from '../../assets/img/fee-icon.svg';
import author from '../../assets/img/author-icon.svg'
import options from '../../assets/img/options-icon.svg';
import partner from '../../assets/img/partners-icon.svg';
import './Dashboard.css';
export default function Dashboard(){


    return (
        <>
        
            <GenericSection title="Panel de Administración">
                <div className="container-dashboard-cards">
                    <div>
                            <div className="card" onClick={()=>console.log("tumama")}>
                                <div className="card-title">
                                    <h2>Prestámos</h2>
                                </div>
                                <div className="card-icons">
                                    <img src={loan} alt="Prestámo" />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-title">
                                    <h2>Libros</h2>
                                </div>
                                <div className="card-icons">
                                    <img src={book} alt="Libros" />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-title">
                                    <h2>Autores</h2>
                                </div>
                                 <div className="card-icons">
                                    <img src={author} alt="Autores" />
                                </div>
                            </div>
                    </div>
                    <div>
                            <div className="card">
                                <div className="card-title">
                                    <h2>Cuotas</h2>
                                </div>
                                 <div className="card-icons">
                                    <img src={fee} alt="Cuotas" />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-title">
                                    <h2>Socios</h2>
                                </div>
                                <div className="card-icons">
                                    <img src={partner} alt="Socios" />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-title">
                                    <h2>Opciones</h2>
                                </div>
                                    <div className="card-icons">
                                    <img src={options} alt="Opciones" />
                                </div>
                            </div>
                    </div>
                </div>
                </GenericSection>                        
           
        </>
    )
}