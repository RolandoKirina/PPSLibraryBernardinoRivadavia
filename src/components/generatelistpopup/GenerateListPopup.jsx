import { Table } from '../table/Table';
import './GenerateListPopup.css';
import Btn from '../btn/Btn';
import printIcon from '../../assets/img/print-icon.svg';
import { titlesByType } from '../../data/generatedlist/generatedList';

export default function GenerateListPopup({dataByType, columnsByType, typeList, title}) {
     return (
        <>
            {/* <div className='generate-list-container'>
                <div className='generate-list-content'> */}
                <div className='generate-list-container'>
                    {typeList !== 'BookRanking' && (
                    <div className='generate-list-title'>
                        <h3>{title ? title : titlesByType[typeList]}</h3>
                    </div>
                    )}

                    <Table columns={columnsByType[typeList]} data={dataByType[typeList]} isPrintList={true} rowsPerPage={30}>
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