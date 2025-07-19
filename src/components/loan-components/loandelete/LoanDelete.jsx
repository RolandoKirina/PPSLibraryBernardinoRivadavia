import './LoanDelete.css';
import Btn from '../../btn/Btn';

export default function LoanDelete({isPopup, closePopup}) {
    function handleClosePopup() {
        closePopup(false);
    }

    return (
        <>
            <div className={`loan-delete-container${isPopup ? ' is-popup' : ''}`}>
                <div className='color-top'></div>
                <div className='loan-delete-content'>
                    <div className='delete-message'>
                        <h3>¿Estás seguro de que quieres eliminar el préstamo?</h3>
                    </div>
                    <div className='loan-delete-btns'>
                        <Btn text={'Cancelar'} className={'cancel-btn'} onClick={handleClosePopup}/>
                        <Btn text={'Eliminar'} className={'delete-btn'} onClick={handleClosePopup}/>
                    </div>
                </div>
            </div>

        </>
    )
}