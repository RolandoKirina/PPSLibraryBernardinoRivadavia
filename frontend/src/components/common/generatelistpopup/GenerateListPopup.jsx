import { Table } from '../../common/table/Table';
import './GenerateListPopup.css';
import Btn from '../../common/btn/Btn';
import printIcon from '../../../assets/img/print-icon.svg';
import { titlesByType } from '../../../data/generatedlist/generatedList';

export default function GenerateListPopup({ dataByType, totalItems, columnsByType, typeList, title, feeDates, handleChangePage, loading, resetPageTrigger, rowsPerPage, others }) {

    return (
        <>
            <div className='generate-list-container'>
                <div className='generate-list-title'>
                    <div className="print-loans-area">
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
                        {(typeList === 'TypeOneFees' || typeList === 'TypeTwoFees') && (
                            <h4>Entre el: {feeDates.beforeDate} y el: {feeDates.afterDate}</h4>
                        )}

                        {/* añadir fecha y hora y num pagina */}

                        {dataByType.length > 0 ? (
                            <Table columns={columnsByType} data={dataByType} isPrintList={true} totalItems={totalItems} handleChangePage={handleChangePage} loading={loading} resetPageTrigger={resetPageTrigger} rowsPerPage={rowsPerPage}>


                                {typeList === 'TypeOneFees' &&
                                    others?.totalFees != null &&
                                    others?.totalAmount != null && (
                                        <div className='fees-info'>
                                            <span>Cantidad de cuotas: {others.totalFees}</span>
                                            <span>Monto total: {others.totalAmount}</span>
                                        </div>
                                    )}


                                {typeList === 'TypeTwoFees' && (
                                    <div className='fees-info'>
                                        <span>| Cantidad total | Regular: 7979 | Honorario: 0 | Protector: 313 | Débito: 0 | </span>
                                        <span>| Importe total | Regular: $21.913.181,00 | Honorario: $204.000,00 | Protector: $1.867.450,00 | Débito: $0,00 |</span>
                                    </div>
                                )}
                            </Table>
                        ) : (
                            <div className="no-results">
                                <p>No hay resultados que coincidan con los filtros seleccionados.</p>
                            </div>
                        )}
                    </div>

                    <div className='print-icon-btn'>
                        <Btn onClick={() => window.print()} variant={'primary'} text={'Imprimir'} icon={<img src={printIcon} alt='printIcon' />} />
                    </div>

                </div>

            </div>
        </>
    )
}