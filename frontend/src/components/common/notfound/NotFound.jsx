import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <h1>404</h1>
      <p>La pagina que estas buscando no existe.</p>
      <Link to="/home" className="back-home">
        Go back Home
      </Link>
    </div>
  );
}
