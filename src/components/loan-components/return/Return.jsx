import './Return.css';
import SearchPartner from '../searchpartner/SearchPartner';
import LendBooks from '../lendbooks/LendBooks';
import BackviewBtn from '../../backviewbtn/BackviewBtn';
import UnpaidQuotes from '../unpaidquotes/UnpaidQuotes';
import PendientBooks from '../pendientbooks/PendientBooks';
import ShowDetails from '../../generic/ShowDetails/ShowDetails';
import { lendBooksReturnDetails } from '../../../data/loan/LoanDetails';
import { useState } from 'react';

export default function Return() {
    const [popupView, setPopupView] = useState("default");

    return (
        <>
            <div className='return-form-content'>
                {popupView === 'default' && (
                    <form>
                            <SearchPartner menu={setPopupView}/>
                            <LendBooks menu={setPopupView} method={'return'}/>
                    </form>
                )}
                {popupView === 'details' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <ShowDetails insidePopup={true} titleText={'Detalles de libro préstado'} isPopup={false} detailsData={lendBooksReturnDetails} />
                    </>
                )}
                {popupView === 'unpaidQuotes' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <UnpaidQuotes />
                    </>
                )}
                {popupView === 'pendientBooks' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <PendientBooks />
                    </>
                )}

                    
                </div> 
        </>
    )
}