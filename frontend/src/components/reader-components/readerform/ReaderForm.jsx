import { useState, useEffect } from 'react';
import './ReaderForm.css';
import Reader from '../../loan-components/reader/Reader.jsx';
import BackviewBtn from '../../common/backviewbtn/BackviewBtn';
import GenericForm from '../../generic/GenericForm/GenericForm';
import Btn from '../../common/btn/Btn';
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useEntityManager } from '../../../hooks/useEntityManager';
import PopUp from '../../common/popup-table/PopUp';
import ConfirmMessage from '../../common/confirmMessage/ConfirmMessage';
import { Table } from '../../common/table/Table';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import AddBookIcon from '../../../assets/img/add-book-icon.svg';
//import { editLoanformFields } from '../../../data/forms/LoanForms';
//import UnpaidFees from '../unpaidfees/UnpaidFees';
//import { pendingbooks } from "../../../data/mocks/pendingbooks.js";
import { useEntityLookup } from '../../../hooks/useEntityLookup.js';
import ReturnIcon from '../../../assets/img/return-icon.svg';
import ReneweIcon from '../../../assets/img/renewe-icon.svg';
import { useAuth } from '../../../auth/AuthContext.jsx';
export default function ReaderForm({ method, createReaderItem, loanSelected, errorMessage }) {
  const chunkSize = 100;
  const rowsPerPage = 5;

  const [popupView, setPopupView] = useState("default");
  const [confirmSaveChangesPopup, setConfirmSaveChangesPopup] = useState(false);
  const BASE_URL = "http://localhost:4000/api/v1";
  const [addBookMessage, setAddBookMessage] = useState('');

  const { auth } = useAuth();

  const [loanData, setLoanData] = useState({
    employeeCode: '',
    returnedDate: '',
    retiredDate: '',
    books: [],
    readerDNI: '',
    readerName: ''
  });

  const isUpdate = method === 'update';
  const readerSource = isUpdate ? loanSelected : loanData;

  const [validateError, setValidateError] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  const { data: employeeInfo, error: employeeError, loading: employeeLoading } = useEntityLookup(loanData.employeeCode, `${BASE_URL}/employees/by-code/`);


  const [libraryBooks, setLibraryBooks] = useState([]);
  const [totalLibraryBooks, setTotalLibraryBooks] = useState(0);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);

  useEffect(() => {
    fetchLibraryBooks({ limit: chunkSize, offset: 0 });

    if (isUpdate && loanSelected?.loanId) {
      fetchLoanBooks(loanSelected.loanId).then(rows => {
        setLoanData({
          books: rows || [],
          employeeCode: loanSelected.employeeCode || '',
          retiredDate: loanSelected.retiredDate || '',
          readerDNI: loanSelected.dni,
          readerName: loanSelected.name
        });
      });
    }
  }, []);

  const fetchLibraryBooks = async (filters = {}, append = false) => {
    setLoadingBooks(true);

    const queryParams = new URLSearchParams(filters).toString();
    const res = await fetch(`${BASE_URL}/books/withFields?${queryParams}`);
    const { rows, total } = await res.json();

    setTotalLibraryBooks(total);
    console.log(total);
    setLibraryBooks(prev => (append ? [...prev, ...rows] : rows));
    console.log(libraryBooks);

    setLoadingBooks(false);
    return rows;
  };

  const fetchLoanBooks = async (loanId) => {
    const res = await fetch(`${BASE_URL}/books/withFields/loan/${loanId}`);
    const { rows } = await res.json();
    return rows;
  };

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    if (lastItemIndex > libraryBooks.length) {
      const newOffset = libraryBooks.length;

      await fetchLibraryBooks(
        { limit: chunkSize, offset: newOffset },
        true
      );
    }
  }

  const handleExtraData = (newData) => { setLoanData(prev => { const updated = { ...prev, ...newData }; return updated; }); };

  const handleChange = (e) => { const { name, value } = e.target; setLoanData(prev => { const updated = { ...prev, [name]: value }; return updated; }); };

  async function handleAddBook(book) {
    const res = await verifyIfExists(book.BookId);

    if (!res.available) {
      setAddBookMessage(`El libro "${book.title}" ya está prestado y no puede ser añadido.`);
      return;
    }

    setLoanData(prev => {
      if (prev.books.some(b => b.BookId === book.BookId)) {
        setAddBookMessage(`El libro "${book.title}" ya fue añadido.`);
        return prev;
      }

      setAddBookMessage('');
      setValidateError('');
      return { ...prev, books: [...prev.books, book] };
    });
  }

  async function verifyIfExists(bookId) {
    const res = await fetch(`${BASE_URL}/reader-books/repeated-book/${bookId}`);
    return res.ok ? res.json() : { available: false };
  }

  function handleDeleteBook(book) {
    setLoanData(prev => ({
      ...prev,
      books: prev.books.filter(b => b.BookId !== book.BookId)
    }));
  }

  const validateBeforeSave = () => {
    if (!loanData.books.length) {
      setValidateError('Debe agregar al menos un libro antes de guardar el préstamo.');
      return false;
    }
    setValidateError('');
    return true;
  };

  function handleAddNewLoan() {
    if (validateError) return;
    createReaderItem(loanData);
  }

  function handleEditLoan() {
    if (validateError) return;
    createReaderItem(loanData);
  }

  const bookshelfBooksColumns = [
    { header: 'Código', accessor: 'codeInventory' },
    { header: 'Título', accessor: 'title' },
    {
      header: 'Agregar',
      render: (_, row) => (
        <button type='button' className="button-table" onClick={() => handleAddBook(row)}>
          <img src={AddBookIcon} alt="Agregar" />
        </button>
      )
    }
  ];

  const lendBooksColumns = [
    { header: 'Código del libro', accessor: 'codeInventory' },
    { header: 'Título', accessor: 'title' },
    {
      header: 'Borrar',
      render: (_, row) => (
        <button type='button' className="button-table" onClick={() => handleDeleteBook(row)}>
          <img src={DeleteIcon} alt="Borrar" />
        </button>
      )
    }
  ];

  const columns = [{ header: 'Código del libro', accessor: 'codeInventory' }, { header: 'Título', accessor: 'title' }, ...(method === 'update' ? [{ header: 'Devuelto', accessor: 'returned' }, { header: 'Fecha Devolución', accessor: 'returnDateText' }, { header: 'Renovado', accessor: 'renewes' }, { header: 'Devolver', accessor: 'return', render: (_, row) => (row.returnedDate ? <span className="status-text">Ya devuelto</span> : (<button type='button' className="button-table" onClick={() => { setConfirmReturnPopup(true); setSelectedBook(row); returnLoanBook(row); }} > <img src={ReturnIcon} alt="Devolver" /> </button>)) }, { header: 'Renovar', accessor: 'renewe', render: (_, row) => (row.returnedDate ? <span className="status-text">No disponible</span> : (<button type='button' className="button-table" onClick={() => { setConfirmRenewePopup(true); setSelectedBook(row); reneweLoanBook(row); }} > <img src={ReneweIcon} alt="Renovar" /> </button>)) }] : [])];

  return (
    <div className='add-loan-form-container'>
      {popupView === 'default' && (
        <div className='add-loan-form-content'>
          <form>
            <div className='type-loan-title'>
              <h2>Datos del préstamo</h2>
            </div>

            <div className='add-loan-form-inputs'>

              <div className='add-loan-code-employee input'>
                <label>Código Empleado <span className='required'>*</span></label>
                <input
                  type='text'
                  name='employeeCode'
                  value={loanData.employeeCode}
                  onChange={handleChange}
                  placeholder="Ej: EMP123"
                />
                {employeeInfo && (
                  <span className='found'>Empleado: {employeeInfo.name}</span>
                )}
                {employeeError && (
                  <span className='not-found'>{employeeError}</span>
                )}
                {employeeLoading && <p className="status-text loading-text">Buscando empleado...</p>}
              </div>

              <div className='add-loan-retire-date input'>
                <label>Fecha de retiro <span className='required'>*</span></label>
                <input
                  type='datetime-local'
                  name='retiredDate'
                  value={loanData.retiredDate}
                  onChange={handleChange}
                />
              </div>

              {method === 'update' && (
                <div className='add-loan-retire-date input'>
                  <label>Fecha de devolución <span className='required'>*</span></label>
                  <input
                    type='datetime-local'
                    name='returnedDate'

                    onChange={handleChange}
                  />
                </div>
              )}


            </div>



            <Reader
              method={method}
              menu={setPopupView}
              onDataChange={handleExtraData}
              loanType={'in_room'}
              readerData={{
                readerDNI: readerSource.readerDNI,
                readerName: readerSource.readerName
              }}
            />

            <div className='reader-error'>{errorMessage && <p className="">{errorMessage}</p>}</div>

            <div className='lend-books-container'>
              <h2 className='lend-books-title'>Libros a Prestar</h2>

              <Table columns={columns} data={loanData.books} totalItems={loanData.books.length} handleChangePage={() => { console.log("work") }} loading={loadingBooks} resetPageTrigger={resetPageTrigger} >
                <div className='add-book-to-lend'>
                  <Btn
                    variant={'primary'}
                    text={'Agregar Libro'}
                    onClick={() => setPopupView('addBook')}
                    icon={<img src={AddBookIcon} alt='addBookIconButton' />}
                  />
                </div>
              </Table>


              {auth.role === 'admin' && method === 'update' && (
                <div className='add-book-to-lend'>
                  <Btn
                    text={'Devolver todos'}
                    onClick={() => {
                      setConfirmReturnAllPopup(true);
                      returnAllLoanBooks();
                    }}
                  />
                </div>
              )}


            </div>

            <div className='save-changes-lend-books'>
              <div className='validate-error'>
                {validateError && (
                  <p className="error-text">{validateError}</p>
                )}
              </div>

              <Btn
                type={'button'}
                variant={'primary'}
                text={'Guardar'}
                onClick={() => {
                  if (validateBeforeSave()) setConfirmSaveChangesPopup(true);
                }}
                icon={<img src={SaveIcon} alt='saveIconButton' />}
              />
            </div>
          </form>

          {confirmSaveChangesPopup && (
            <PopUp title={'Guardar préstamo'} onClick={() => setConfirmSaveChangesPopup(false)}>
              <ConfirmMessage
                text={'¿Está seguro de guardar el nuevo préstamo?'}
                closePopup={() => setConfirmSaveChangesPopup(false)}
                onConfirm={() => {
                  if (method === 'update') handleEditLoan();
                  else handleAddNewLoan();
                  setConfirmSaveChangesPopup(false);
                }}
              />
            </PopUp>
          )}


        </div>
      )}

      {popupView === 'addBook' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <div className='author-books-container'>
            <div className='library-books'>
              <div className='author-books-title'>
                <h3>Libros cargados en la biblioteca</h3>
              </div>
              <Table columns={bookshelfBooksColumns} data={libraryBooks} totalItems={totalLibraryBooks} handleChangePage={handleChangePage} loading={loadingBooks} resetPageTrigger={resetPageTrigger} />
            </div>
            <div className='author-books'>
              <div className='author-books-title'>
                <h3>Libros para este lector</h3>
              </div>
              <Table columns={lendBooksColumns} data={loanData.books} totalItems={loanData.books.length} handleChangePage={() => { console.log("work") }} loading={loadingBooks} resetPageTrigger={resetPageTrigger} />
            </div>
          </div>
          {addBookMessage && (
            <div className='add-books-error'>
              <p style={{ color: 'red', marginTop: '0.5rem' }}>{addBookMessage}</p>
            </div>
          )}
        </>
      )}

    </div>
  );
}
