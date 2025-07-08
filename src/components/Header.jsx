import logo from '../assets/img/logo_biblioteca.svg';


export default function Header(){
    return (
        <>
        <header className="header">
            <img src={logo} alt="Logo Biblioteca rivadavia"></img>
            <h1>Biblioteca Popular Bernardino Rivadavia</h1>
        </header>
        </>
    )
}