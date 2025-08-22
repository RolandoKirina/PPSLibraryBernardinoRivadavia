import './LoanButtons.css';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import PrintIcon from '../../../assets/img/print-icon.svg';
import ReserveIcon from '../../../assets/img/reserve-icon.svg';
import ReturnIcon from '../../../assets/img/return-icon.svg';
import Btn from '../../btn/Btn';
import { authMock } from '../../../data/mocks/authMock';

export default function LoanButtons({displayLoanform, displayReturnForm, displayListingsPopup, displayRenewe}) {
    return (
        <>
            <div className='loan-buttons'>
                <div className='loan-options'>
                    {authMock.role === 'admin' && (
                         <Btn icon={<img src={PlusIcon}/>} onClick={displayLoanform} text={'Nuevo'}/>
                    )}
                   
                    <Btn icon={<img src={ReturnIcon}/>} onClick={displayReturnForm} text={'Devoluciones'}/>

                    {authMock.role === 'admin' && (
                    <Btn icon={<img src={PrintIcon}/>} onClick={displayListingsPopup} text={'Listados'}/>
                    )}
                    
                    <Btn icon={<img src={ReserveIcon}/>} onClick={displayRenewe} text={'Reservas'}/>
                </div>
            </div>
        </>
    )
}