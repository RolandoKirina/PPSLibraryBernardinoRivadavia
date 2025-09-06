import background from "../../assets/img/background_page.png";
import "./HomePage.css";
export const HomePage = () => {


     return (

        <section className="hero-container">
            <div className="background-library">
                <img src={background} alt="Library Bernardino Rivadavia" />
            </div>
              <div className="hero-text">
                <h2>Bienvenidos a NUESTRA BIBLIOTECA</h2>
                <p>Un espacio para descubrir, aprender y compartir</p>
              </div>

      
        </section>
      );
}


export default HomePage;