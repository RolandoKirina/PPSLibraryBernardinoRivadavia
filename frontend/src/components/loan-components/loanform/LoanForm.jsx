import { useState, useEffect } from 'react';
import './LoanForm.css';
import SearchPartner from '../searchpartner/SearchPartner';
import Reader from '../reader/Reader';
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
import { editLoanformFields } from '../../../data/forms/LoanForms';
import UnpaidFees from '../unpaidfees/UnpaidFees';
//import { pendingbooks } from "../../../data/mocks/pendingbooks.js";
import { useEntityLookup } from '../../../hooks/useEntityLookup.js';
import ReturnIcon from '../../../assets/img/return-icon.svg';
import ReneweIcon from '../../../assets/img/renewe-icon.svg';
import { useAuth } from '../../../auth/AuthContext.jsx';
import PendingBooks from '../pendingBooks/PendingBooks.jsx';
import PartnerMemo from '../partnermemo/PartnerMemo.jsx';

export default function LoanForm({ method, createLoanItem, loanSelected, errorMessage }) {
  const chunkSize = 100;
  const rowsPerPage = 5;
  const [offsetActual, setOffsetActual] = useState(0);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);

  const [popupView, setPopupView] = useState("default");
  const [confirmSaveChangesPopup, setConfirmSaveChangesPopup] = useState(false);
  const BASE_URL = "http://localhost:4000/api/v1";
  const [addBookMessage, setAddBookMessage] = useState('');

  const [confirmReturnAllPopup, setConfirmReturnAllPopup] = useState(false);
  const [confirmReturnPopup, setConfirmReturnPopup] = useState(false);
  const [confirmRenewePopup, setConfirmRenewePopup] = useState(false);

  const { auth } = useAuth();

  const formatToInputDate = (date) => {
    if (!date) return '';
    const [day, month, year] = date.split('-');
    return `20${year}-${month}-${day}`;
  };

  const [loanData, setLoanData] = useState({
    loanType: 'retired',
    employeeCode: '',
    retiredDate: '',
    expectedDate: '',
    books: []
  });

  const isUpdate = method === 'update';

  const partnerSource = isUpdate ? loanSelected : loanData;

  const [validateError, setValidateError] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  const { data: employeeInfo, error: employeeError, loading: employeeLoading } = useEntityLookup(loanData.employeeCode, `${BASE_URL}/employees/by-code/`);

  const [books, setBooks] = useState([]);

  const [libraryBooks, setLibraryBooks] = useState([]);
  const [loanBooksFetched, setLoanBooksFetched] = useState([]);
  const [totalLibraryBooks, setTotalLibraryBooks] = useState(0);

  const [loadingBooks, setLoadingBooks] = useState(false);

  useEffect(() => {
    getLibraryBooks({ limit: chunkSize, offset: 0 });

    if (method === 'update' && loanSelected?.loanId) {
      getLoanBooks(loanSelected.loanId, { limit: chunkSize, offset: 0 })
        .then(rows => {
          setLoanData({
            loanType: loanSelected.loanType || 'in_room',
            employeeCode: loanSelected.employeeCode || '',
            retiredDate: formatToInputDate(loanSelected.retiredDate),
            expectedDate: formatToInputDate(loanSelected.expectedDate),
            books: rows
          });
        });
    }
  }, []);


  const getLibraryBooks = async (filters = {}, append = false) => {
    setLoadingBooks(true);

    const queryParams = new URLSearchParams(filters).toString();

    const res = await fetch(`${BASE_URL}/books/withFields?${queryParams}`);
    const { rows, total } = await res.json();

    setTotalLibraryBooks(total);
    setLibraryBooks(prev => append ? [...prev, ...rows] : rows);

    setLoadingBooks(false);
    return rows;
  };

  const getLoanBooks = async (loanId, filters = {}) => {
    setLoadingBooks(true);

    const queryParams = new URLSearchParams(filters).toString();

    const res = await fetch(`${BASE_URL}/books/withFields/loan/${loanId}?${queryParams}`);
    const { rows } = await res.json();

    setLoanBooksFetched(rows);

    setLoadingBooks(false);
    return rows;
  };

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    if (books.length < totalLibraryBooks && lastItemIndex > books.length) {
      const newOffset = books.length;

      await getLibraryBooks(
        {
          limit: chunkSize,
          offset: newOffset
        },
        true
      );
    }
  }

  function handleAddNewLoan() {
    if (validateError) return;
    const newLoan = {
      loanType: loanData.loanType,
      employeeCode: loanData.employeeCode,
      retiredDate: loanData.retiredDate,
      expectedDate: loanData.expectedDate,
      partnerName: loanData.partnerName,
      partnerNumber: loanData.partnerNumber,
      books: loanData.books
    };

    console.log(newLoan);
    createLoanItem(newLoan);
  }

  function handleEditLoan() {
    if (validateError) return;

    console.log(loanData.books);

    const normalizedBooks = loanData.books.map(b => {
      const returned =
        b.returned === true || b.returned === "Si" || b.returned === "Sí";

      return {
        BookId: b.BookId,
        loanId: loanData.loanId,
        renewes: b.renewes || 0,
        BookCode: b.codeInventory,
        returned,
        returnedDate: returned
          ? (
            b.returnedDate instanceof Date
              ? b.returnedDate.toISOString()
              : null
          )
          : null
      };
    });

    const updatedLoan = {
      employeeCode: loanData.employeeCode,
      retiredDate: loanData.retiredDate,
      expectedDate: loanData.expectedDate,
      books: normalizedBooks
    };

    createLoanItem(updatedLoan);
  }


  async function handleAddBook(book) {
    const res = await verifyIfExists(book.BookId);

    if (!res.available) {
      setAddBookMessage(`El libro "${book.title}" ya está prestado y no puede ser añadido.`);
      return;
    }

    setLoanData(prev => {
      const alreadyExists = prev.books.some(b => b.BookId === book.BookId);

      if (alreadyExists) {
        setAddBookMessage(`El libro "${book.title}" ya fue añadido.`);
        return prev;
      }

      setAddBookMessage('');
      setValidateError('');
      return { ...prev, books: [...prev.books, book] };
    });
  }

  async function verifyIfExists(bookId) {
    try {
      const res = await fetch(`${BASE_URL}/loan-books/repeated-book/${bookId}`);
      if (!res.ok) throw new Error("Error al obtener datos");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  function handleDeleteBook(book) {
    setLoanData(prev => {
      let alreadyExists = prev.books.some(b => b.BookId === book.BookId);
      if (!alreadyExists) return prev;

      let booksUpdated = prev.books.filter(b => b.BookId !== book.BookId);
      return { ...prev, books: booksUpdated };
    });
  }

  const validateBeforeSave = () => {

    if (loanData.retiredDate && loanData.expectedDate && new Date(loanData.expectedDate) < new Date(loanData.retiredDate)) {
      setValidateError('La fecha prevista no puede ser anterior a la fecha de retiro.');
      return false;
    }

    if (!loanData.books || loanData.books.length === 0) {
      setValidateError('Debe agregar al menos un libro antes de guardar el préstamo.');
      return false;
    }

    setValidateError('');
    return true;
  };

  const nowISO = () => new Date().toISOString();
  const nowText = () => new Date().toLocaleDateString("es-AR");


  async function returnLoanBook(loanBook) {
    const { BookId } = loanBook;

    setLoanData(prev => ({
      ...prev,
      books: prev.books.map(b => {
        if (b.BookId !== BookId) return b;

        return {
          ...b,
          returned: true,
          returnedDate: nowISO(),
          returnDateText: nowText(),
        };
      }),
    }));
  }
  async function reneweLoanBook(loanBook) {
    const { BookId } = loanBook;

    setLoanData(prev => ({
      ...prev,
      books: prev.books.map(b =>
        b.BookId === BookId
          ? {
            ...b,
            renewes: (b.renewes || 0) + 1
          }
          : b
      ),
    }));
  }


  function returnAllLoanBooks() {
    const iso = nowISO();
    const text = nowText();

    setLoanData(prev => ({
      ...prev,
      books: prev.books.map(b => {
        if (b.returned) return b;

        return {
          ...b,
          returned: true,
          returnedDate: iso,
          returnDateText: text,
        };
      }),
    }));
  }



  const bookshelfBooksColumns = [
    { header: 'Codigo', accessor: 'codeInventory' },
    { header: 'Título', accessor: 'title' },
    {
      header: 'Agregar',
      accessor: 'add',
      render: (_, row) => (
        <button type='button' className="button-table" onClick={() => handleAddBook(row)}>
          <img src={AddBookIcon} alt="Agregar" />
        </button>
      )
    }
  ];

  const columns = [
    { header: 'Código del libro', accessor: 'codeInventory' },
    { header: 'Título', accessor: 'title' },
    ...(method === 'update'
      ? [
        { header: 'Fecha Devolución', accessor: 'returnDateText' },
        { header: 'Renovado', accessor: 'renewes' },
        {
          header: 'Devolver',
          accessor: 'return',
          render: (_, row) => (
            row.returned
              ? <span className="status-text">Ya devuelto</span>
              : (
                <button
                  type="button"
                  className="button-table"
                  onClick={() => {
                    setConfirmReturnPopup(true);
                    setSelectedBook(row);
                    returnLoanBook(row);
                  }}
                >
                  <img src={ReturnIcon} alt="Devolver" />
                </button>
              )
          )
        },
        {
          header: 'Renovar',
          accessor: 'renewe',
          render: (_, row) => (
            row.returned
              ? <span className="status-text">No disponible</span>
              : (
                <button
                  type="button"
                  className="button-table"
                  onClick={() => {
                    setConfirmRenewePopup(true);
                    setSelectedBook(row);
                    reneweLoanBook(row);
                  }}
                >
                  <img src={ReneweIcon} alt="Renovar" />
                </button>
              )
          )

        }

      ]
      : [])
  ];


  const lendBooksColumns = [
    { header: 'Código del libro', accessor: 'codeInventory' },
    { header: 'Título', accessor: 'title' },
    {
      header: 'Borrar',
      accessor: 'delete',
      render: (_, row) => (
        <button type='button' className="button-table" onClick={() => handleDeleteBook(row)}>
          <img src={DeleteIcon} alt="Borrar" />
        </button>
      )
    }
  ];

  const columnsPendingBooks = [
    { header: 'Código de libro', accessor: 'codeInventory' },
    { header: 'Título', accessor: 'title' },
    { header: 'Fecha de retiro', accessor: 'retiredDate' },
    { header: 'Fecha prevista', accessor: 'expectedDate' },
    { header: 'Fecha de devolución', accessor: 'returnedDate' },
    { header: 'Renovaciones', accessor: 'renewes' },
    {
      header: 'Devuelto', accessor: 'returned',
      render: (value) => value ? 'Sí' : 'No'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoanData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'retiredDate' || name === 'expectedDate') {
        // Validar inmediatamente fechas para mostrar mensaje rápido
        if (updated.retiredDate && updated.expectedDate && new Date(updated.expectedDate) < new Date(updated.retiredDate)) {
          setValidateError('La fecha prevista no puede ser anterior a la fecha de retiro.');
        } else {
          setValidateError('');
        }
      }
      return updated;
    });

  };

  const handleExtraData = (newData) => {
    console.log(newData);
    setLoanData(prev => {
      const updated = { ...prev, ...newData };
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

            <SearchPartner
              method={method}
              menu={setPopupView}
              onDataChange={handleExtraData}
              loanType={'retired'}
              partnerData={{
                partnerName: partnerSource.name,
                partnerNumber: partnerSource.partnerNumber,
                memoSearch: partnerSource.memoSearch
              }}
            />

            <div className='reader-error'>{errorMessage && <p className="">{errorMessage}</p>}</div>

            <div className='lend-books-container'>
              <h2 className='lend-books-title'>Libros a Prestar</h2>


              <Table columns={columns} data={loanData.books} totalItems={loanData.books.length} loading={loadingBooks} resetPageTrigger={resetPageTrigger} >

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
                <h3>Libros a prestar</h3>
              </div>
              <Table columns={lendBooksColumns} data={loanData.books} totalItems={loanData.books.length} loading={loadingBooks} resetPageTrigger={resetPageTrigger} />
            </div>
          </div>
          {addBookMessage && (
            <div className='add-books-error'>
              <p style={{ color: 'red', marginTop: '0.5rem' }}>{addBookMessage}</p>
            </div>
          )}
        </>
      )}

      {popupView === 'unpaidFees' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <UnpaidFees changeView={setPopupView} partnerNumber={partnerSource.partnerNumber} />
        </>
      )}

      {popupView === 'pendingBooks' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <PendingBooks changeView={setPopupView} partnerNumber={partnerSource.partnerNumber} />
        </>
      )}

      {popupView === 'partnerMemo' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <PartnerMemo changeView={setPopupView} partnerNumber={partnerSource.partnerNumber} />
        </>
      )}
    </div>
  );
}
