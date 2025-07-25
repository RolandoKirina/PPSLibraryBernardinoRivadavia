import './SearchPartner.css';
import Btn from '../../btn/Btn';
import { useState } from 'react';
import PopUp from '../../popup-table/PopUp2';
import PartnerMemo from '../partnermemo/PartnerMemo';

export default function SearchPartner() {
    const [memoPopup, setMemoPopup] = useState(false);

    function redirect(routeName) {
        window.open(`${window.location.origin}/${routeName}`, '_blank');
    }

    return (
        <>
            <div className='search-partner-container'>
                <h2>Socio</h2>
                <div className='search-partner-inputs'>
                    <div>
                        <label>Número</label>
                        <input type='number'/>
                    </div>
                     <div>
                        <label>Apellido, Nombre</label>
                        <input type='text'/>
                    </div>
                     <div>
                        <label>Busqueda por Memo</label>
                        <input type='text'/>
                    </div>
                </div>
                <div className='search-partner-buttons'>
                    <Btn text={'Cuotas Impagas'} onClick={() => redirect('loans/partner/quotes')}/>
                    <Btn text={'Libros Pendientes'} onClick={() => redirect('loans/partner/pendient-books')}/>
                    <Btn text={'Memo del Socio'} onClick={() => setMemoPopup(true)}/>
                </div>

                {memoPopup && (
                    <PopUp title={'Memo del Socio'} className={'popup-memo-size'} onClick={() => setMemoPopup(false)}>
                        <PartnerMemo />
                    </PopUp>
                )}
            </div>
        </>
    )
}