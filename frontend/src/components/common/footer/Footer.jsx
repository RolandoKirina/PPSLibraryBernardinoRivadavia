import './Footer.css';
import instagram from '../../../assets/img/instagram-icon.svg';
import facebook from '../../../assets/img/facebook-icon.svg';
import whatsapp from '../../../assets/img/whatsapp-icon.svg';
import logo from '../../../assets/img/logo_biblioteca_rivadavia.svg';
export default function Footer() {
  return (
    <>
      <footer className='footer'>
        <div className='maintitlefooter'>
          <h3>Te esperamos!</h3>
          <h3>San martin 516</h3>
        </div>

        <div className="footer-social">
          <a href="https://www.instagram.com/bibliotecarivadavia1908/" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className='imgicons'>
              <img src={instagram} alt="Instagram" className="social-icon" />
              Seguinos en Instagram!
            </div>
          </a>

          <a href="https://www.facebook.com/BibliotecaRivadaviaDeTandil" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className='imgicons'>
              <img src={facebook} alt="Facebook" className="social-icon" />
              Seguinos en Facebook!
            </div>
          </a>

          <a href="https://wa.me/5492494535798" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className='imgicons'>
              <img src={whatsapp} alt="WhatsApp" className="social-icon" />
              Escribinos a WhatsApp!
            </div>
          </a>
        </div>


        <div className='libraryfooter'>
          <div><img src={logo} alt="Logo biblioteca Rivadavia" /></div>
          <div><h3 className='libraryrivadavia'>Biblioteca <strong className='strongfooter'>Rivadavia</strong></h3></div>
        </div>
      </footer>
    </>
  );
}