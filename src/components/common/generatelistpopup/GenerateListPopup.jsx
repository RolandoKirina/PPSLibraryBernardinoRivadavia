import { Table } from '../../common/table/Table';
import './GenerateListPopup.css';
import Btn from '../../common/btn/Btn';
import printIcon from '../../../assets/img/print-icon.svg';
import { titlesByType } from '../../../data/generatedlist/generatedList';

export default function GenerateListPopup({dataByType, columnsByType, typeList, title, feeDates}) {
     return (
        <>
                <div className='generate-list-container'>
                    <div className='generate-list-title'>
                        <h3>{title ? title : titlesByType[typeList]} </h3>
                        <h4>{new Date().toLocaleString('es-AR', {
                            weekday: 'long',
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                            })}
                        </h4>
                        {console.log(typeList)}
                        {(typeList === 'TypeOneFees' || typeList === 'TypeTwoFees') && (
                         <h4>Entre el: {feeDates.beforeDate} y el: {feeDates.afterDate}</h4>
                        )}
                        
                    </div>
                    {/* añadir fecha y hora y num pagina */}

                    <Table columns={columnsByType[typeList]} data={dataByType[typeList]} isPrintList={true} rowsPerPage={30}>
                        <div className='print-icon-btn'>
                            <Btn variant={'primary'} text={'Imprimir'} icon={<img src={printIcon} alt='printIcon'/> }/>
                        </div>
                        {typeList === 'TypeOneFees' && (
                         <div className='fees-info'>
                            <span>Cantidad de cuotas: </span>
                            <span>Monto total: </span>
                         </div>
                        )}
                        {typeList === 'TypeTwoFees'&& (
                        <div className='fees-info'>
                         <span>| Cantidad total | Regular: 7979 | Honorario: 0 | Protector: 313 | Débito: 0 | </span>
                         <span>| Importe total | Regular: $21.913.181,00 | Honorario: $204.000,00 | Protector: $1.867.450,00 | Débito: $0,00 |</span>  
                        </div>
  
                         )}
                    </Table>

                    {/* añadir info extra seguntipo de listado*/}   
                    {/*

                    en listado de cuotas x letra y categoria:
                    entre el dia:  y el dia: + fecha y hora

                    y al final:


                    
                    en listado de cuotas pagas por fecha - entre el dia:  y el dia: + fecha y hora

                    y al final:
                        cantidad de cuotas: $
                        monto total: $ 
                    
                    
                    */}                    
                </div>
        </>
    )
}