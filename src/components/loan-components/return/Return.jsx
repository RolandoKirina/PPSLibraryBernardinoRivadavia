import './Return.css';
import SearchPartner from '../searchpartner/SearchPartner';
import LendBooks from '../lendbooks/LendBooks';
import BackviewBtn from '../../backviewbtn/BackviewBtn';
import UnpaidQuotes from '../unpaidquotes/UnpaidQuotes';
import ShowDetails from '../../generic/ShowDetails/ShowDetails';
import { lendBooksReturnDetails } from '../../../data/loan/LoanDetails';
import { useState } from 'react';
import GenericForm from '../../generic/GenericForm/GenericForm';
import { editPendingQuoteFields } from '../../../data/loan/LoanForms';

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
                        <UnpaidQuotes changeView={setPopupView}/>
                    </>
                )}
                {popupView === 'editUnpaidQuote' && (
                    <>
                        <BackviewBtn menu={'unpaidQuotes'} changeView={setPopupView} />
                        <GenericForm title={'Editar cuota pendiente'} fields={editPendingQuoteFields} onSubmit={(data) => console.log('Formulario enviado:', data)} />
                    </>
                )}
                    
                </div> 
        </>
    )
}