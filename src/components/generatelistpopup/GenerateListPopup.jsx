import { Table } from '../table/Table';
import './GenerateListPopup.css';
import Btn from '../btn/Btn';
import printIcon from '../../assets/img/print-icon.svg';

export default function GenerateListPopup({dataByType, columnsByType, typeList, title}) {
     const resolvedType = typeList || 'TypeOne';

    return (
        <>
            {/* <div className='generate-list-container'>
                <div className='generate-list-content'> */}
                <div className='generate-list-container'>
                    <div className='generate-list-title'>
                        <h3>{title}</h3>
                    </div>
                    <Table columns={columnsByType[resolvedType]} data={dataByType[resolvedType]} isPrintList={true} rowsPerPage={30}>
                        <div className='print-icon-btn'>
                            <Btn variant={'primary'} text={'Imprimir'} icon={<img src={printIcon} alt='printIcon'/> }/>
                        </div>
                    </Table>
                </div>

                {/* </div>
            </div> */}
        </>
    )
}