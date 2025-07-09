import logo from '../../assets/img/logo_biblioteca_rivadavia.svg';
import menuleft from '../../assets/img/menu-arrow-left.png';
import './Header.css';

export default function Header(){
    return (
        <>
    <header className="header">
            <div className="header-container">
                <div className="menu">
                    <img src={menuleft} alt="Menú" />
                </div>
                <div className="title">
                    <div>
                        <img src={logo} alt="Logo Biblioteca Rivadavia" />
                        <h1>Biblioteca Popular Bernardino Rivadavia</h1>
                    </div>
                </div>
            </div>
    </header>
        </>
    )
}