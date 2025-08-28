import { Table } from '../table/Table';
import './GenerateListPopup.css';
import { dataByType } from '../../data/generatedList/generatedList';
import { columnsByType } from '../../data/generatedList/generatedList';
import Btn from '../btn/Btn';
import printIcon from '../../assets/img/print-icon.svg';

export default function GenerateListPopup({typeList}) {
     const resolvedType = typeList || 'TypeOne';

    return (
        <>
            <div className='generate-list-container'>
                <div className='generate-list-content'>
                    <Table columns={columnsByType[resolvedType]} data={dataByType[resolvedType]}>
                        <div className='print-icon-btn'>
                            <Btn variant={'primary'} text={'Imprimir'} icon={<img src={printIcon} alt='printIcon'/> }/>
                        </div>
                    </Table>
                </div>
            </div>
        </>
    )
}