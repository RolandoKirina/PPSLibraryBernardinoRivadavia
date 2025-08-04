import { useState } from 'react';
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

export default function LoanForm() {
  const [popupView, setPopupView] = useState("default");

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
              <SearchPartner menu={setPopupView} onDataChange={handleExtraData} loanType={'retired'}/>
            ) : (
              <Reader menu={setPopupView} onDataChange={handleExtraData} loanType={'in_room'}/>
            )}

            <LendBooks menu={setPopupView} method={'add'} onDataChange={handleExtraData} />
          </form>
        </div>
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

      {popupView === 'addBook' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <GenericForm title={'Agregar Libro en Prestamo'} fields={addLendBookFields} onSubmit={(data) => console.log('Formulario enviado:', data)}>
            <Btn className='search-book-btn' text={'Buscar libro'} onClick={() => setPopupView('searchBook')} />
          </GenericForm>
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
