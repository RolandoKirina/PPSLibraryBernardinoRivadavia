import './BackviewBtn.css';
import Btn from '../btn/Btn';
import LeftArrow from '../../assets/img/left-arrow.svg';

export default function BackviewBtn({menu, changeView}) {
    return (
        <>
            <div className='backview-btn'>
                <Btn icon={<img src={LeftArrow}/>} text='Volver' onClick={() => changeView(menu)}/>
            </div>
        </>
    )
}