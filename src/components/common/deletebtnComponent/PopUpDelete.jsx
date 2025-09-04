

import './PopUpDelete.css';
import Btn from '../btn/Btn';

export default function PopUpDelete ({title,closePopup, onConfirm}) {

    return (
        <>
            <div className={`delete-container`}>
                <div className='delete-content'>
                    <div className="titledelete">
                        <h2>¿Estás seguro de que quieres eliminar el {title}?</h2>
                    </div>
                    <div className='delete-btns'>
                        <Btn text={'Cancelar'} onClick={() => closePopup()} variant="cancel"/>
                        <Btn text={'Eliminar'} onClick={onConfirm} variant="delete"/>
                    </div>
                </div>
            </div>

        </>
    )
}