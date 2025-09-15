import './LoanListings.css';
import Btn from '../../common/btn/Btn';
import { useState } from 'react';
import Listing from '../listing/Listing';
import BackviewBtn from '../../common/backviewbtn/BackviewBtn';


export default function LoanListings() {
    const [popupView, setPopupView] = useState('default');
    const [type, setType] = useState();

    function redirectToListingOpened(routeName) {
        window.open(`${window.location.origin}/${routeName}`, '_blank', "listado")
    }

    return (
        <>
            {popupView === 'default' && (
                <div className='listings-content'>
                    <div className='listings-btns'>
                        <Btn variant={'primary'} text={'Con fecha de devolución'} className={'listings-btn'} onClick={() => {
                            setType('LoanListingReturnDate')
                            setPopupView('listing');
                            }} />
                        <Btn variant={'primary'} text={'Con teléfono'} className={'listings-btn'} onClick={() => {
                            setType('LoanListingPhone')
                            setPopupView('listing');
                            }} />
                        <Btn variant={'primary'} text={'Préstamos por socio'} className={'listings-btn'} onClick={() => {
                            setType('LoanListingPerPartner')
                            setPopupView('listing');
                            }} />
                    </div>
                </div>
            )}

            {popupView === 'listing' && (
                <>
                <BackviewBtn menu={'default'} changeView={setPopupView}/>
                <div className='loan-listing-size'>
                    <Listing type={type}/>
                </div>
                </>
            )}

        </>
    )
}