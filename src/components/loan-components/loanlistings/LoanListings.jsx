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
                        <Btn variant={'primary'} text={'Con fecha de devolución'} className={'listings-btn'} onClick={() => redirectToListingOpened('loans/listening/return-date')}/>
                        <Btn variant={'primary'}  text={'Con teléfono'} className={'listings-btn'} onClick={() => redirectToListingOpened('loans/listening/phone')}/>
                        <Btn variant={'primary'}  text={'Préstamos por socio'} className={'listings-btn'} onClick={() => redirectToListingOpened('loans/listening/loans-per-partner')}/>
                    </div>
                    
               
            </div>
        </>
    )
}