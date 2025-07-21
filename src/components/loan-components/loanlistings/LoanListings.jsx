import './LoanListings.css';
import Btn from '../../btn/Btn';


export default function LoanListings() {

    function redirectToListingOpened(routeName) {
        window.open(`${window.location.origin}/${routeName}`, '_blank')
    }

    return (
        <>

                <div className='listings-content'>
                    <div className='listings-btns'>
                        <Btn text={'Con fecha de devolución'} className={'listings-btn'} onClick={() => redirectToListingOpened('loans/listening/return-date')}/>
                        <Btn text={'Con teléfono'} className={'listings-btn'} onClick={() => redirectToListingOpened('loans/listening/phone')}/>
                        <Btn text={'Préstamos por socio'} className={'listings-btn'} onClick={() => redirectToListingOpened('loans/listening/loans-per-partner')}/>
                    </div>
                    
               
            </div>
        </>
    )
}