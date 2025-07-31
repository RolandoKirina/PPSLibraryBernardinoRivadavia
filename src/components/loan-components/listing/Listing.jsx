import './Listing.css';
import PrintIcon from '../../../assets/img/print-icon.svg';
import {phoneListing, returnDateListing, quantityParnerListing} from '../../../data/loan/LoanListings';

export default function Listing({type}) {
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
                        {quantityParnerListing.map(info => 
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

            </div>
        </>
    )
}