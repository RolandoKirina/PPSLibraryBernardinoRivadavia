import './LoanListings.css';
import Btn from '../../common/btn/Btn';


export default function LoanListings() {

    function redirectToListingOpened(routeName) {
        window.open(`${window.location.origin}/${routeName}`, '_blank', "listado")
    }

    return (
        <>

                <div className='listings-content'>
                    <div className='listings-btns'>
                        <Btn variant={'primary'} text={'Con fecha de devolución'} className={'listings-btn'} onClick={() => redirectToListingOpened('loans/listening/LoanListingReturnDate')}/>
                        <Btn variant={'primary'}  text={'Con teléfono'} className={'listings-btn'} onClick={() => redirectToListingOpened('loans/listening/LoanListingPhone')}/>
                        <Btn variant={'primary'}  text={'Préstamos por socio'} className={'listings-btn'} onClick={() => redirectToListingOpened('loans/listening/LoanListingPerPartner')}/>
                    </div>
                    
               
            </div>
        </>
    )
}