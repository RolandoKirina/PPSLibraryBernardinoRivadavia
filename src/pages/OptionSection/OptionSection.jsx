import { Link } from "react-router-dom";
import GenericSection from "../../components/generic/GenericSection/GenericSection";
import employee from '../../assets/img/dark-icon/options/employee.svg';
import dismiss from '../../assets/img/dark-icon/options/dismiss.svg';
import materials from '../../assets/img/dark-icon/options/materials.svg';
import booksPartners from '../../assets/img/dark-icon/options/books-partners.svg';
import groupMaterials from '../../assets/img/dark-icon/options/group-materials.svg';
import listLostBooks from '../../assets/img/dark-icon/options/list-lost-books.svg';
import loanEmployees from '../../assets/img/dark-icon/options/loan-employees.svg';
import partnerCategory from '../../assets/img/dark-icon/options/partner-category.svg';
import partnerList from '../../assets/img/dark-icon/options/partner-list.svg';
import quoteDates from '../../assets/img/dark-icon/options/quote-dates.svg';
import ranking from '../../assets/img/dark-icon/options/ranking.svg';
import { authMock } from '../../data/mocks/authMock'


export default function OptionSection(){

    return (
        <>
            <GenericSection title="Otras secciones">
                <div className="container-all">
                    <div className="container-dashboard-cards">
                        {authMock.role === 'admin' ? (
                            <>
                                <div className="card-container">
                                    <Link to="/employees">
                                        <div className="card">
                                            <div className="card-title">
                                                <h2>Empleados</h2>
                                            </div>
                                            <div className="card-icons">
                                                <img src={employee} alt="Empleado" />
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/options/partner-categories">
                                        <div className="card">
                                            <div className="card-title">
                                                <h2>Categorias de socio</h2>
                                            </div>
                                            <div className="card-icons">
                                                <img src={partnerCategory} alt="Categoria de socio" />
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/options/loan-materials">
                                        <div className="card">
                                            <div className="card-title">
                                                <h2>Materiales de prestamo</h2>
                                            </div>
                                            <div className="card-icons">
                                                <img src={materials} alt="Material de prestamo" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="card-container">

                                    <Link to="/options/remove-partner-reasons">
                                        <div className="card">
                                            <div className="card-title">
                                                <h2>Motivos para dar de baja</h2>
                                            </div>
                                            <div className="card-icons">
                                                <img src={dismiss} alt="Motivo de baja de socio" />
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/options/loan-amount-group">
                                        <div className="card">
                                            <div className="card-title">
                                                <h2>Grupos de tipo de material</h2>
                                            </div>
                                            <div className="card-icons">
                                                <img src={groupMaterials} alt="Grupo de tipo material" />
                                            </div>
                                        </div>
                                    </Link>
                                </div> 
                            </>
                        ) : (
                            <>
                                <div className="card-container">
                                    <Link to="/options">
                                        <div className="card">
                                            <div className="card-title">
                                                <h2>Ranking de libros</h2>
                                            </div>
                                            <div className="card-icons">
                                                <img src={ranking} alt="Ranking de libros" />
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/options/loan-amount-group">
                                        <div className="card">
                                            <div className="card-title">
                                                <h2>Grupos de tipo de material</h2>
                                            </div>
                                            <div className="card-icons">
                                                <img src={groupMaterials} alt="Grupo de tipo material" />
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to="/options/loan-materials">
                                        <div className="card">
                                            <div className="card-title">
                                                <h2>Materiales de prestamo</h2>
                                            </div>
                                            <div className="card-icons">
                                                <img src={materials} alt="Material de prestamo" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </GenericSection>                        
        </>
    )
}
