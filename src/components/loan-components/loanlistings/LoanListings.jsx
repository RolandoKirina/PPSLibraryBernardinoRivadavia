import './LoanListings.css';
import ClosePopupImg from '../../../assets/img/close-popup-btn.svg';
import Btn from '../../btn/Btn';


export default function LoanListings({closePopup}) {

    function redirectToListingOpened(routeName) {
        window.open(`${window.location.origin}/${routeName}`, '_blank')
    }

    return (
        <>
            <div className='loan-listings-container'>
                <div className='listings-title'>
                    <h2>Imprimir Listados</h2>
                    <button className='listings-popup-close-btn' onClick={() => closePopup(false)}><img src={ClosePopupImg}/></button>
                </div>
                <div className='listings-content'>
                    <div className='listings-btns'>
                        <Btn text={'Con fecha de devolución'} className={'listings-btn'} onClick={() => redirectToListingOpened('loans/listening/return-date')}/>
                        <Btn text={'Con teléfono'} className={'listings-btn'} onClick={() => redirectToListingOpened('loans/listening/phone')}/>
                        <Btn text={'Préstamos por socio'} className={'listings-btn'} onClick={() => redirectToListingOpened('loans/listening/loans-per-partner')}/>
                    </div>
                    
                </div>
            </div>
        </>
    )
}