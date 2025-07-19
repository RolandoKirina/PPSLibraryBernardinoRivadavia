import './LoanButtons.css';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import PrintIcon from '../../../assets/img/print-icon.svg';
import ReserveIcon from '../../../assets/img/reserve-icon.svg';
import ReturnIcon from '../../../assets/img/return-icon.svg';

export default function LoanButtons({displayLoanform, displayReturnForm, displayListingsPopup}) {
    function handleOpenLoanForm() {
      displayLoanform(true);
    }

    function handleOpenReturnForm() {
        displayReturnForm(true);
    }

    function handleOpenListingsPopup() {
        displayListingsPopup(true);
    }
    
    return (
        <>
            <div className='loan-buttons'>
                <div className='loan-options'>
                    <button type='button' className='' onClick={handleOpenLoanForm}><img src={PlusIcon}/>Nuevo</button>
                    <button type='button' className='' onClick={handleOpenReturnForm}><img src={ReturnIcon}/>Devoluciones</button>
                    <button type='button' className='' onClick={handleOpenListingsPopup}><img src={PrintIcon}/>Listados</button>
                    <button type='button' className=''><img src={ReserveIcon}/>Reservas</button>
                </div>
            </div>
        </>
    )
}