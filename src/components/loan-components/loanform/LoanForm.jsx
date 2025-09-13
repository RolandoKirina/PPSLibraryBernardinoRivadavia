import { useState } from 'react';
import './LoanForm.css';
import SearchPartner from '../searchpartner/SearchPartner';
import Reader from '../reader/Reader';
import BackviewBtn from '../../common/backviewbtn/BackviewBtn';
import GenericForm from '../../generic/GenericForm/GenericForm';
import Btn from '../../common/btn/Btn';
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useEntityManager } from '../../../hooks/useEntityManager';
import { mockBooksLoans } from '../../../data/mocks/loans';
import PopUp from '../../common/popup-table/PopUp';
import ConfirmMessage from '../../common/confirmMessage/ConfirmMessage';
import { Table } from '../../common/table/Table';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import AddBookIcon from '../../../assets/img/add-book-icon.svg';
import { books } from '../../../data/mocks/authors';
import { editLoanformFields } from '../../../data/forms/LoanForms';
import UnpaidQuotes from '../unpaidquotes/UnpaidQuotes';

export default function LoanForm({createLoanItem}) {
  const [popupView, setPopupView] = useState("default");
  const { items, getItem, createItem, updateItem, deleteItem } = useEntityManager(mockBooksLoans, 'booksLoans');
  const [confirmSaveChangesPopup, setConfirmSaveChangesPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  const [loanData, setLoanData] = useState({
    loanType: 'in_room',
    employeeCode: '',
    retiredDate: '',
    expectedDate: '',
    books: []
  });

function handleAddNewLoan() {
  console.log("entro");
  loanData.books.forEach(lendBook => {
    createLoanItem({
      bookCode: lendBook.bookCode,
      bookTitle: lendBook.bookTitle,
      partnerName: loanData.partnerName,
      partnerNumber: loanData.partnerNumber,
      retiredDate: loanData.retiredDate,
      expectedDate: loanData.expectedDate,
      retiredHour: '11:00',
      employeeCode: loanData.employeeCode
    });
  });
}

  function handleAddBook(book) {
    setLoanData(prev => {
      let alreadyExists = loanData.books.some(b => b.id === book.id);

      if(alreadyExists) {
        return prev;
      }

      return {
        ...prev,
        books: [...prev.books, book]
      }

    }
    )
  }

  function handleDeleteBook(book) {
    setLoanData(prev => {
      let alreadyExists = loanData.books.some(b => b.id === book.id);

      if(!alreadyExists) {
        return prev;
      }

      let booksUpdated = prev.books.filter(b => b.id !== book.id);

      return {
        ...prev,
        books: booksUpdated
      }

    }
    )
  }

    const bookshelfBooksColumns = [
            { header: 'Codigo', accessor: 'bookCode' },
            { header: 'Título', accessor: 'bookTitle' },
            {
                header: 'Agregar',
                accessor: 'add',
                render: (_, row) => (
                <button type='button' className="button-table" onClick={() => handleAddBook(row)}>
                    <img src={AddBookIcon} alt="Agregar" />
                </button>
                )
            }
    ]

  const columns = [
          { header: 'Código del libro', accessor: 'bookCode' },
          { header: 'Título', accessor: 'bookTitle' },
    ];

    const lendBooksColumns = [ //igual que mainAuthorBooksColumns pero solo se muestran 3 columnas
              { header: 'Código del libro', accessor: 'bookCode' },
              { header: 'Título', accessor: 'bookTitle' },
              { header: 'Posición', accessor: 'position' },
              {
                  header: 'Borrar',
                  accessor: 'delete',
                  render: (_, row) => (
                   <button type='button' className="button-table" onClick={() => {
                      handleDeleteBook(row);
                      console.log("deleted");
                  }}>
                      <img src={DeleteIcon} alt="Borrar" />
                  </button>
                  )
              }
  ];

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
                <h4>Tipo de Préstamo <span className='required'>*</span></h4>
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

              <div className='add-loan-code-employee input'>
                <label>Código Empleado <span className='required'>*</span></label>
                <input
                  type='number'
                  name='employeeCode'
                  value={loanData.employeeCode}
                  onChange={handleChange}
                />
                <span className='found'>Fortunato, Jorge</span>
              </div>

              <div className='add-loan-retire-date input'>
                <label>Fecha de retiro <span className='required'>*</span></label>
                <input
                  type='date'
                  name='retiredDate'
                  value={loanData.retiredDate}
                  onChange={handleChange}
                />
              </div>

              <div className='add-loan-retire-date input'>
                <label>Fecha prevista <span className='required'>*</span></label>
                <input
                  type='date'
                  name='expectedDate'
                  value={loanData.expectedDate}
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

            <div className='lend-books-container'>
                <h2 className='lend-books-title'>Libros a Prestar</h2>

              <Table columns={columns} data={loanData.books}>
                <div className='add-book-to-lend'>
                  <Btn variant={'primary'} text={'Agregar Libro'} onClick={() => setPopupView('addBook')} icon={<img src={AddBookIcon} alt='addBookIconButton'/> }/>
                </div>
              </Table>
            </div>

            <div className='save-changes-lend-books'>
                <Btn type={'button'} variant={'primary'} text={'Guardar'} onClick={() => {
                  setConfirmSaveChangesPopup(true);

                  }} icon={<img src={SaveIcon} alt='saveIconButton'/> }/>
            </div>

          </form>

            {confirmSaveChangesPopup && (
            <PopUp title={'Guardar préstamo'} onClick={() => setConfirmSaveChangesPopup(false)}>
              <ConfirmMessage text={'¿Está seguro de guardar el nuevo prestamo?'} closePopup={() => setConfirmSaveChangesPopup(false)} onConfirm={() => {
                handleAddNewLoan();
                setConfirmSaveChangesPopup(false);
                }}/>
            </PopUp>
          )}  
        </div>
      )}

      {popupView === 'addBook' && (
        <>
          {/* <BackviewBtn menu={'default'} changeView={setPopupView} />
          <GenericForm title={'Agregar Libro en Prestamo'} fields={addLendBookFields} onSubmit={(data) => {
            console.log(data);
            addLoanItems(data);
            setPopupView('default');
            }}>
            <Btn className='search-book-btn' text={'Buscar libro'} onClick={() => setPopupView('searchBook')} />
          </GenericForm> */}

          <BackviewBtn menu={'default'} changeView={setPopupView}/>
          <div className='author-books-container'>
              <div className='library-books'>
                <div className='author-books-title'>
                    <h3>Libros cargados en la biblioteca</h3>
                </div>
                <Table columns={bookshelfBooksColumns} data={books}/>
            </div>
            <div className='author-books'>
                <div className='author-books-title'>
                    <h3>Libros de este autor</h3>
                </div>
                <Table columns={lendBooksColumns} data={loanData.books}/>

                {/* {method === 'update' ? (
                    <Table columns={authorBooksColumns} data={authorSelected.books}/>
                ): (
                    <Table columns={authorBooksColumns} data={authorData.books}/>
                )} */}
            </div>
          </div>
          
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
          <GenericForm title={'Editar cuota pendiente'} fields={editLoanformFields} onSubmit={(data) => console.log('Formulario enviado:', data)} />
        </>
      )}
      
    </div>
  );
}
