import './ShowDetails.css';
import { useState } from 'react';
import Accordion from '../accordion/Accordion';

export default function ShowDetails({ data, isPopup, detailsData, titleText }) {
  
  function fillDetailsWithData(detailsData, data) {
    return detailsData.map(menu => ({
      ...menu,
      rows: menu.rows.map(row =>
        row.map(item => ({
          ...item,
          value: item.attribute ? data[item.attribute] ?? '—' : item.value
        }))
      )
    }));
  }

  const [detailsMenus, setDetailsMenus] = useState(() => fillDetailsWithData(detailsData, data));

  function toggleDropdownMenu(id) {
    setDetailsMenus(menus =>
      menus.map(menu =>
        menu.id === id
          ? { ...menu, active: !menu.active }
          : { ...menu, active: false }
      )
    );
  }

  return (
    <div className="details-container">
      <div className="details-content">
        {!isPopup && (
          <div className="titlepopup2">
            <h1 className="titlepopuph1">{titleText}</h1>
          </div>
        )}

        <div className="dropdown-details-menu">
          {detailsMenus.map(menu => (
            <Accordion
              key={menu.id}
              title={menu.title}
              isActive={menu.active}
              onToggle={() => toggleDropdownMenu(menu.id)}
            >
              {menu.rows.map((row, rowIndex) => (
                <div className="items-info-details" key={rowIndex}>
                  {row.map((item, itemIndex) => (
                    <div className="item-details" key={itemIndex}>
                      <h4>{item.label}</h4>
                      <p>{item.value}</p>
                    </div>
                  ))}
                </div>
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}
