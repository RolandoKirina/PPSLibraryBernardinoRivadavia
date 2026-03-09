import { Table } from '../../common/table/Table';
import './GenerateListPopup.css';
import Btn from '../../common/btn/Btn';
import printIcon from '../../../assets/img/print-icon.svg';
import { titlesByType } from '../../../data/generatedlist/generatedList';

export default function GenerateListPopup({
    dataByType,
    totalItems,
    columnsByType,
    typeList,
    title,
    feeDates,
    handleChangePage,
    loading,
    resetPageTrigger,
    rowsPerPage,
    others,
    onPrint 
}) {

    console.log(dataByType);
    console.log(columnsByType);

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

                        {dataByType.length > 0 ? (
                            <Table
                                columns={columnsByType}
                                data={dataByType}
                                isPrintList={true}
                                totalItems={totalItems}
                                handleChangePage={handleChangePage}
                                loading={loading}
                                resetPageTrigger={resetPageTrigger}
                                rowsPerPage={rowsPerPage}
                            >
                                {typeList === 'TypeOneFees' &&
                                    others?.totalFees != null &&
                                    others?.totalAmount != null && (
                                        <div className='fees-info'>
                                            <span>Cantidad de cuotas: {others.totalFees}</span>
                                            <span>Monto total: {others.totalAmount}</span>
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
                        {/* Cambiamos window.print() por onPrint. 
                           Añadimos un check por si acaso la prop no viene (onPrint && onPrint())
                        */}
                        <Btn
                            onClick={() => onPrint && onPrint()}
                            variant={'primary'}
                            text={'Generar PDF'}
                            icon={<img src={printIcon} alt='printIcon' />}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}