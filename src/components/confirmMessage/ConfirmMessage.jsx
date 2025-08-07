import './ConfirmMessage.css';
import Btn from '../btn/Btn';

export default function ConfirmMessage({text, closePopup, onConfirm}) {
    return (
        <>
            <div className={`confirm-container`}>
                <div className='confirm-content'>
                    <div className="titleconfirm">
                    <h2>{text}</h2>
                    </div>
                    <div className='confirm-btns'>
                    <Btn text={'Cancelar'} className={'cancel-btn'} onClick={() => closePopup()} />
                    <Btn text={'Confirmar'} className={'confirm-btn'} onClick={onConfirm} />
                    </div>
                </div>
            </div>

        </>
    )
}