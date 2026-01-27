import './ShowDetails.css';
import { useState } from 'react';
import Accordion from '../accordion/Accordion';
import Btn from '../../common/btn/Btn';
import { Table } from '../../common/table/Table';
import UnpaidFees from '../../loan-components/unpaidfees/UnpaidFees';
import BackviewBtn from '../../common/backviewbtn/BackviewBtn';
export default function ShowDetails({ data, isPopup, detailsData, titleText,actions }) {

 const [popupView,setPopupView]= useState(null);
 const [unpaidFees, setUnpaidFees] = useState([]);
 const [pendingBooks,setPendingBooks] = useState([]);

  const normalizeFees = (fees) =>
    fees.map(fee => ({
      ...fee,
      partnerName: fee.Partner?.name ?? '—',
      partnerNumber: fee.Partner?.id ?? '—'
    }));
  
async function fetchUnpaidFees() {
  try {

    const res = await fetch(`http://localhost:4000/api/v1/fees/partners/${data.id}/unpaid-fees`);
    
    const json = await res.json();
    console.log(json)
    setUnpaidFees(json);
    setPopupView("unpaidfees");

  } catch (error) {
    console.error("Error al cargar cuotas impagas", error);
  } 
}

async function fetchPendingBooks() {
  try {
    
    const res = await fetch(`http://localhost:4000/api/v1/books/pendingBooks/${data.id}`);
    const json = await res.json();
    setPendingBooks(json);
    setPopupView("pendingbooks");

  } catch (error) {
    console.error("Error al cargar cuotas impagas", error);
  }
}
   const columnsPendingBooks = [
     { header: 'Código de libro', accessor: 'bookCode' },
     { header: 'Título', accessor: 'title' },
     { header: 'Fecha de retiro', accessor: 'retiredDate' },
     { header: 'Fecha prevista', accessor: 'expectedDate' },
     { header: 'Fecha de devolución', accessor: 'returnedDate' },
     { header: 'Renovaciones', accessor: 'renewes' }
   ];

 function renderView () {
    if (!actions) {
      return null; 
    }

    switch (popupView) {
          case "unpaidfees":
        return (
          <div >
            <UnpaidFees data={unpaidFees} />
            <BackviewBtn menu="default" changeView={setPopupView} />
          </div>
        );

         case "pendingbooks":
            return (
              <>
                {pendingBooks && pendingBooks.length > 0 ? (
                  <Table
                    columns={columnsPendingBooks}
                    data={pendingBooks}
                  />
                ) : (
                  <div className="msg-unpaidfees">
                    <p>No hay libros pendientes</p>
                  </div>
                )}

                <BackviewBtn menu="default" changeView={setPopupView} />
              </>
            );
      }
  }
    

  function fillDetailsWithData(detailsData, data) {
    if (!data) return detailsData;

    return detailsData.map(menu => ({
      ...menu,
      rows: menu.rows.map(row =>
        row.map(item => {
          const rawValue = item.attribute ? data[item.attribute] ?? '—' : item.value;
          return {
            ...item,
            value: rawValue
          };
        })
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
  const renderFieldValue = (value, subfields) => {
    if (!value) return '—';

    if (Array.isArray(value)) {
      return (
        <ul>
          {value.map((item, index) => (
            <li key={index}>
              {subfields
                ? subfields.map(({ key, label }) => `${label}: ${item[key]}`).join(' ')
                : Object.values(item).join(' ')}
            </li>
          ))}
        </ul>
      );
    }

    return String(value);
  };




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
                      <div>
                        <span>{item.label}</span>
                        <div>{renderFieldValue(item.value, item.subfields)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </Accordion>

            
          ))}
          {actions && (
            
          <div  className="partner-state-btns">
              <div>
                <Btn text="Cuotas impagas"variant="secondary" onClick={fetchUnpaidFees}/>                   
                <Btn text="Libros pendientes" variant="secondary" onClick={fetchPendingBooks} />
              </div>
          </div>)}
          {renderView()}
        
        </div>
      </div>
    </div>
  );
}
