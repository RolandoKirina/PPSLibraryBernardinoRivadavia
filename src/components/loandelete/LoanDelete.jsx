import './LoanDelete.css';
import Btn from '../btn/Btn';

export default function LoanDelete({closePopup}) {
    function handleClosePopup() {
        closePopup();
    }

    return (
        <>
            <div className='loan-delete-container'>
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