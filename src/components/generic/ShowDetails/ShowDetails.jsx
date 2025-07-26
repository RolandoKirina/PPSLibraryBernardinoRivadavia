import './ShowDetails.css';
import { useState } from 'react';
import ToggleIcon from '../../../assets/img/toggle-icon.svg';


export default function ShowDetails({isPopup, detailsData, titleText}) {

    function toggleDrowMenu(id) {
        const updatedMenus = detailsMenus.map(menu => 
            menu.id === id ? {...menu, active: !menu.active } : {...menu, active: false}
        )
        setDetailsMenus(updatedMenus);

    }   

    const [detailsMenus, setDetailsMenus] = useState(detailsData);

    return (
        <>
        <div className={`details-container`}>
            <div className='details-content'>
                {!isPopup && (
                    <div className='titlepopup2'>
                              <h1 className="titlepopuph1">{titleText}</h1>
                    </div>
                )}
                <div className='dropdown-details-menu'>
                    {detailsMenus.map(menu => (
                    <div key={menu.id}>
                        <div className='dropdown-title'>
                        <h4>{menu.title}</h4>
                        <button type='button' onClick={() => toggleDrowMenu(menu.id)}>
                            <img src={ToggleIcon} alt='toggle' />
                        </button>
                        </div>

                        {menu.active && (
                        
                        <div className='detailsInfoMenu'>
                            {menu.rows.map((row, rowIndex) => (
                            <div className='items-info-details' key={rowIndex}>
                                {row.map((item, itemIndex) => (
                                <div className='item-details' key={itemIndex}>
                                    <h4>{item.label}</h4>
                                    <p>{item.value}</p>
                                </div>
                                ))}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                    ))}
                </div>
            </div>

        </div>
        </>
    )
}