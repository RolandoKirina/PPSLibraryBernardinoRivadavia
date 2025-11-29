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

export default function ReaderForm({ method, createReaderItem, loanSelected }) {
  const [popupView, setPopupView] = useState("default");
  const [confirmSaveChangesPopup, setConfirmSaveChangesPopup] = useState(false);
  const BASE_URL = "http://localhost:4000/api/v1";
  const [addBookMessage, setAddBookMessage] = useState('');

  const [confirmReturnAllPopup, setConfirmReturnAllPopup] = useState(false);
  const [confirmReturnPopup, setConfirmReturnPopup] = useState(false);
  const [confirmRenewePopup, setConfirmRenewePopup] = useState(false);

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

  const partnerSource = isUpdate ? loanSelected : loanData;
  const readerSource = isUpdate ? loanSelected : loanData;

  // 🔹 Error unificado
  const [validateError, setValidateError] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  const { data: employeeInfo, error: employeeError, loading: employeeLoading } = useEntityLookup(loanData.employeeCode, `${BASE_URL}/employees?code=`);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();

    if (method === 'update' && loanSelected?.dni) {

      const fetchAllBooksFromLoan = async () => {
        const loanSelectedId = loanSelected.loanId;
        const booksFromLoan = await getBooks(loanSelectedId);

        setLoanData({
          books: booksFromLoan || [],
          employeeCode: loanSelected.employeeCode || '',
          retiredDate: loanSelected.retiredDate || '',
          readerDNI: loanSelected.dni,
          readerName: loanSelected.name,

        });
      };

      fetchAllBooksFromLoan();
    }
  }, []);

  const getBooks = async (loanSelectedId) => {
    try {
      let url = loanSelectedId
        ? `${BASE_URL}/books/withFields/loan/${loanSelectedId}`
        : `${BASE_URL}/books/withFields`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener libros");
      const data = await response.json();

      if (!loanSelectedId) setBooks(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  function handleAddNewLoan() {
    if (validateError) return;
    const newLoan = {
      employeeCode: loanData.employeeCode,
      retiredDate: loanData.retiredDate,
      readerDNI: loanData.readerDNI,
      readerName: loanData.readerName,
      books: loanData.books
    };

    createReaderItem(newLoan);
  }

  function handleEditLoan() {
    if (validateError) return;
    const updatedLoan = {
      employeeCode: loanData.employeeCode,
      retiredDate: loanData.retiredDate,
      returnedDate: loanData.returnedDate,
      readerDNI: loanData.readerDNI,
      readerName: loanData.readerName,
      books: loanData.books
    };
    createReaderItem(updatedLoan);
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
      const res = await fetch(`${BASE_URL}/reader-books/repeated-book/${bookId}`);
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

    if (!loanData.books || loanData.books.length === 0) {
      setValidateError('Debe agregar al menos un libro antes de guardar el préstamo.');
      return false;
    }

    setValidateError('');
    return true;
  };


  async function returnLoanBook(loanBook) {

    const { BookId } = loanBook;

    setLoanData(prev => ({
      ...prev,
      books: prev.books.map(b => {
        if (b.BookId !== BookId) return b;

        const now = new Date();
        const formattedDate = now.toLocaleDateString();

        return {
          ...b,
          returned: "Sí",             // antes era "No"
          returnedDate: now,          // guardamos la fecha real (si la usás)
          returnDateText: formattedDate, // tu campo correcto
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
            renewes: (b.renewes || 0) + 1,
          }
          : b
      ),
    }));
  }

  function returnAllLoanBooks() {
    setLoanData(prev => ({
      ...prev,
      books: prev.books.map(b => {

        if (b.returnedDate) return b;

        const now = new Date();
        const formattedDate = now.toLocaleDateString();

        return {
          ...b,
          returned: "Sí",
          returnedDate: now,
          returnDateText: formattedDate
        };
      })
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
        { header: 'Devuelto', accessor: 'returned' },
        { header: 'Fecha Devolución', accessor: 'returnDateText' },
        { header: 'Renovado', accessor: 'renewes' },
        {
          header: 'Devolver',
          accessor: 'return',
          render: (_, row) => (
            row.returnedDate
              ? <span className="status-text">Ya devuelto</span>
              : (
                <button
                  type='button'
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
            row.returnedDate
              ? <span className="status-text">No disponible</span>
              : (
                <button
                  type='button'
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
      return updated;
    });

  };

  const handleExtraData = (newData) => {
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


            <div className='lend-books-container'>
              <h2 className='lend-books-title'>Libros a Prestar</h2>

              <Table columns={columns} data={loanData.books}>
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
              <Table columns={bookshelfBooksColumns} data={books} />
            </div>
            <div className='author-books'>
              <div className='author-books-title'>
                <h3>Libros de este autor</h3>
              </div>
              <Table columns={lendBooksColumns} data={loanData.books} />
            </div>
          </div>
          {addBookMessage && (
            <div className='add-books-error'>
              <p style={{ color: 'red', marginTop: '0.5rem' }}>{addBookMessage}</p>
            </div>
          )}
        </>
      )}
      {/* 
      {popupView === 'unpaidFees' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <UnpaidFees changeView={setPopupView} />
        </>
      )}

      {popupView === 'editUnpaidFees' && (
        <>
          <BackviewBtn menu={'unpaidFees'} changeView={setPopupView} />
          <GenericForm
            title={'Editar cuota pendiente'}
            fields={editLoanformFields}
            onSubmit={(data) => console.log('Formulario enviado:', data)}
          />
        </>
      )}

      {popupView === 'pendingBooks' && (
        <>
          <Table columns={columnsPendingBooks} data={pendingbooks}></Table>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
        </>
      )} */}
    </div>
  );

}
