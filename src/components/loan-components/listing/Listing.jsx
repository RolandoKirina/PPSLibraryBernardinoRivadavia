import './Listing.css';
import PrintIcon from '../../../assets/img/print-icon.svg';
import {phoneListing, returnDateListing} from '../../../data/loan/LoanListings';
import { Table } from '../../table/Table';

export default function Listing({type}) {
    let firstDate = '01/06/25'; 
    let secondDate = '08/06/25';

    const loansAmount = [
        { id: 1, number_partner: 123, fullname: 'Garcia, Ana', quantity: 5 },
        { id: 1, number_partner: 123, fullname: 'Garcia, Ana', quantity: 5 },
        { id: 1, number_partner: 123, fullname: 'Garcia, Ana', quantity: 5 },
        { id: 1, number_partner: 123, fullname: 'Garcia, Ana', quantity: 5 },
        { id: 1, number_partner: 123, fullname: 'Garcia, Ana', quantity: 5 },

    ];
    
        const columns = [
        { header: 'N° Socio', accessor: 'number_partner' },
        { header: 'Nombre y Apellido', accessor: 'fullname' },
        { header: 'Cant.Prestamos', accessor: 'quantity' },
    ];

    return (
        <>
            <div className='listing-container'>
                <div className='listing-title'>
                    {type==='phone' && <h2>Préstamos con teléfono</h2>}
                    {type==='return-date' && <h2>Préstamos con fecha de devolución</h2>}
                    {type==='loans-per-partner' && <h2>Cantidad de préstamos por socio</h2>}
                    <img src={PrintIcon} />
                </div>

                {type==='phone' &&
                    <>
                        {phoneListing.map(info => 
                        <div className='listing-info' key={info.id}>
                            <div className='separator'></div>
                            
                            <div className='rows-info'>
                                {info.allInfo.map(info => 
                                    <div className='item' key={info.id}>
                                        {info.rows.map(row => 
                                            <div key={row.id}>
                                                <h4>{row.label}:</h4>
                                                <span>{row.value}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        )}
                    </>
                }

                {type==='return-date' &&
                    <>
                        {returnDateListing.map(info => 
                        <div className='listing-info' key={info.id}>
                            <div className='separator'></div>
                            
                            <div className='rows-info'>
                                {info.allInfo.map(info => 
                                    <div className='item' key={info.id}>
                                        {info.rows.map(row => 
                                            <div key={row.id}>
                                                <h4>{row.label}:</h4>
                                                <span>{row.value}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        )}
                    </>
                }

                {type ==='loans-per-partner' &&
                    <>
                        <div className='listing-info'>
                            <div className='dates-range'>
                                <h3>Rango: {firstDate} al {secondDate} </h3>
                            </div>
                        <Table columns={columns} data={loansAmount}>

                         </Table>
                        </div>
                        

                    </>
                }

            </div>
        </>
    )
}