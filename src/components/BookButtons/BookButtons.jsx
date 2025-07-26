import './BookButtons.css';
import PlusIcon from '../../assets/img/plus-icon.svg';
import Btn from '../btn/Btn';


export default function BookButtons({addBook,duplicateBook}) {
    return (
        <>
            <div className='listbtns'>
                
                    <Btn className="primary-btn" icon={<img src={PlusIcon}/>} onClick={addBook} text={'Agregar libro'}/>
                    <Btn className="primary-btn" icon={<img src={PlusIcon}/>} onClick={duplicateBook} text={'Duplicar libro'}/>
                
            </div>
        </>
    )
}