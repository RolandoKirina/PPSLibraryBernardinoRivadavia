import './LoanButtons.css';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import PrintIcon from '../../../assets/img/print-icon.svg';
import ReserveIcon from '../../../assets/img/reserve-icon.svg';
import ReturnIcon from '../../../assets/img/return-icon.svg';

export default function LoanButtons({displayLoanform}) {
    function handleOpenLoanForm() {
      displayLoanform();
    }
    
    return (
        <>
            <div className='loan-buttons'>
                <div className='loan-options'>
                    <button className='' onClick={handleOpenLoanForm}><img src={PlusIcon}/>Nuevo</button>
                    <button className=''><img src={ReturnIcon}/>Devoluciones</button>
                    <button className=''><img src={PrintIcon}/>Listados</button>
                    <button className=''><img src={ReserveIcon}/>Reservas</button>
                </div>
            </div>
        </>
    )
}