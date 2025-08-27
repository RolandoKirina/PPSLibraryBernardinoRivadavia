import { Table } from '../table/Table';
import './GenerateListPopup.css';
import { dataTypeOne } from '../../data/generatedList/generatedList';
import { columnsByType } from '../../data/generatedList/generatedList';
import Btn from '../btn/Btn';
import printIcon from '../../assets/img/print-icon.svg';

export default function GenerateListPopup({typeList}) {
   


    return (
        <>
            <div className='generate-list-container'>
                <div className='generate-list-content'>
                    <Table columns={columnsByType[typeList]} data={dataTypeOne}>
                        <div className='print-icon-btn'>
                            <Btn variant={'primary'} text={'Imprimir'} icon={<img src={printIcon} alt='printIcon'/> }/>
                        </div>
                    </Table>
                </div>
            </div>
        </>
    )
}