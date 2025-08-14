import { useEffect, useState } from 'react';
import './LoanForm.css';
import SearchPartner from '../searchpartner/SearchPartner';
import Reader from '../reader/Reader';
import LendBooks from '../lendbooks/LendBooks';
import BackviewBtn from '../../backviewbtn/BackviewBtn';
import ShowDetails from '../../generic/ShowDetails/ShowDetails';
import { lendBooksDetails } from '../../../data/loan/LoanDetails';
import GenericForm from '../../generic/GenericForm/GenericForm';
import { addLendBookFields } from '../../../data/loan/LoanForms';
import Btn from '../../btn/Btn';
import SearchBooks from '../searchBooks/SearchBooks';
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useEntityManager } from '../../../hooks/useEntityManager';
import { mockBooksLoans } from '../../../data/mocks/loans';
import PopUp from '../../popup-table/PopUp2';
import ConfirmMessage from '../../confirmMessage/ConfirmMessage';

export default function LoanForm({createLoanItem}) {
  const [popupView, setPopupView] = useState("default");
  const { items, getItem, createItem, updateItem, deleteItem } = useEntityManager(mockBooksLoans, 'booksLoans');
  const [confirmSaveChanges, setConfirmSaveChangesPopup] = useState(false);

  const [loanData, setLoanData] = useState({
    loanType: 'in_room',
    employeeCode: '',
    retiredDate: ''
  });

const handleChange = (e) => {
  const { name, value } = e.target;

  setLoanData(prev => {
    let updated = { ...prev, [name]: value };

    // Al cambiar el tipo de préstamo, limpiar y asignar según corresponda
    if (name === 'loanType') {
      if (value === 'retired') {
        // Eliminar datos del lector
        delete updated.readerDNI;
        delete updated.readerName;

        updated = {
          ...updated,
          partnerName: prev.partnerName || '',
          partnerNumber: prev.partnerNumber || '',
          memoSearch: prev.memoSearch || ''
        };
      } else if (value === 'in_room') {
        // Eliminar datos del socio
        delete updated.partnerName;
        delete updated.partnerNumber;
        delete updated.memoSearch;

        updated = {
          ...updated,
          readerDNI: prev.readerDNI || '',
          readerName: prev.readerName || ''
        };
      }
    }

    console.log("Datos del préstamo:", updated);
    return updated;
  });
};


  const handleExtraData = (newData) => {
  setLoanData(prev => {
    const updated = { ...prev, ...newData };
    console.log("Préstamo actualizado con datos externos:", updated);
    return updated;
  });
};

function addLoanItems(data) {
  createItem(data);

  if(data.loanType === 'retired') {
    console.log(items);
    items.forEach((lendBook) => {
    createItem({
      bookCode: lendBook.bookCode,
      bookTitle: lendBook.bookTitle,
      partnerNumber: data.partnerNumber,
      partnerName: data.partnerName,
      retiredDate: data.retiredDate,
      employee: data.employeeCode,
      // retiredHour: data.retiredHour, // si lo tenés
      // address: data.partnerAddress, // si lo tenés
      // phone: data.partnerPhone,     // si lo tenés
    });
  });
  }
  else if(data.loanType === 'in_room') { //segun el tipo, cambiar columnas de tabla si se elige en el filtro
     items.map((lendBook) => 
      createItem({
        bookCode: lendBook.bookCode,
        bookTitle: lendBook.bookTitle,
        retiredDate: data.retiredDate,
        employee: data.employeeCode, //aqui deberia buscar el nombre por codigo
        // adress:
        // phone:
        // retiredHour:
      })
    )
  }
  
}


  return (
    <div className='add-loan-form-container'>

      {popupView === 'default' && (
        <div className='add-loan-form-content'>
          <form>
            <div className='type-loan-title'>
              <h2>Datos del préstamo</h2>
            </div>

            <div className='add-loan-form-inputs'>
              <div>
                <h4>Tipo de Préstamo</h4>
                <div>
                  <label>
                    <input
                      type='radio'
                      name='loanType'
                      value='in_room'
                      checked={loanData.loanType === 'in_room'}
                      onChange={handleChange}
                    />
                    En sala
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='loanType'
                      value='retired'
                      checked={loanData.loanType === 'retired'}
                      onChange={handleChange}
                    />
                    Retirado
                  </label>
                </div>
              </div>

              <div className='add-loan-code-employee'>
                <label>Código Empleado</label>
                <input
                  type='number'
                  name='employeeCode'
                  value={loanData.employeeCode}
                  onChange={handleChange}
                />
                <span className='found'>Fortunato, Jorge</span>
              </div>

              <div className='add-loan-retire-date'>
                <label>Fecha de retiro</label>
                <input
                  type='date'
                  name='retiredDate'
                  value={loanData.retiredDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {loanData.loanType === 'retired' ? (
              <SearchPartner menu={setPopupView} onDataChange={handleExtraData} loanType={'retired'} 
              partnerData={
                {
                  partnerName: loanData.partnerName,
                  partnerNumber: loanData.partnerNumber,
                  memoSearch: loanData.memoSearch 
                }
              }
              />
            ) : (
              <Reader menu={setPopupView} onDataChange={handleExtraData} loanType={'in_room'}
                 readerData={{
                  readerDNI: loanData.readerDNI,
                  readerName: loanData.readerName
                }}
              />
            )}

            <LendBooks menu={setPopupView} method={'add'} onDataChange={handleExtraData} itemsData={items}
  deleteItem={deleteItem} />

            <div className='save-changes-lend-books'>
                <Btn text={'Guardar'} onClick={() => {
                  setConfirmSaveChangesPopup(true)

                  }} icon={<img src={SaveIcon} alt='saveIconButton'/> }/>
            </div>

          </form>

          {confirmSaveChanges && (
            <PopUp>
              <ConfirmMessage text={'¿Está seguro de guardar el nuevo prestamo?'} closePopup={() => setConfirmSaveChangesPopup(false)} onConfirm={() => {
                createLoanItem(loanData);
                setConfirmSaveChangesPopup(false);
                }}/>
            </PopUp>
          )}
        </div>
      )}

      {popupView === 'addBook' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <GenericForm title={'Agregar Libro en Prestamo'} fields={addLendBookFields} onSubmit={(data) => {
            console.log(data);
            addLoanItems(data);
            setPopupView('default');
            }}>
            <Btn className='search-book-btn' text={'Buscar libro'} onClick={() => setPopupView('searchBook')} />
          </GenericForm>
        </>
      )}

      {popupView === 'editForm' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <GenericForm title={'Editar Libro en Prestamo'} fields={addLendBookFields} onSubmit={(data) => console.log('Formulario enviado:', data)}>
            <Btn className='search-book-btn' text={'Buscar libro'} onClick={() => setPopupView('searchBook')} />
          </GenericForm>
        </>
      )}

      {popupView === 'details' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <ShowDetails insidePopup={true} titleText={'Detalles de libro en préstamo'} isPopup={false} detailsData={lendBooksDetails} />
        </>
      )}

      {popupView === 'searchBook' && (
        <>
          <BackviewBtn menu={'addBook'} changeView={setPopupView} />
          <SearchBooks />
        </>
      )}

      {popupView === 'unpaidQuotes' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <UnpaidQuotes changeView={setPopupView} />
        </>
      )}

      {popupView === 'editUnpaidQuote' && (
        <>
          <BackviewBtn menu={'unpaidQuotes'} changeView={setPopupView} />
          <GenericForm title={'Editar cuota pendiente'} fields={addLendBookFields} onSubmit={(data) => console.log('Formulario enviado:', data)} />
        </>
      )}
      
    </div>
  );
}
