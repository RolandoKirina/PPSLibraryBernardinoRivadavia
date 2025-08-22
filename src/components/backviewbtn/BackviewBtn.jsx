import './BackviewBtn.css';
import Btn from '../btn/Btn';
import LeftArrow from '../../assets/img/left-arrow-secondary.svg';

export default function BackviewBtn({menu, changeView}) {
    return (
        <>
            <div className='backview-btn'>
                <Btn variant={'btn-secondary'} icon={<img src={LeftArrow}/>} text='Volver' onClick={() => changeView(menu)}/>
            </div>
        </>
    )
}