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
import UnpaidFees from '../unpaidfees/UnpaidFees';
import { pendingbooks } from "../../../data/mocks/pendingbooks.js";
import { useEffect } from 'react';


export default function LoanForm({ method, createLoanItem, loanSelected }) {
  const [popupView, setPopupView] = useState("default");
  const { items, getItem, createItem, updateItem, deleteItem } = useEntityManager(mockBooksLoans, 'booksLoans');
  const [confirmSaveChangesPopup, setConfirmSaveChangesPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const BASE_URL= "http://localhost:4000/api/v1";

    const [loanData, setLoanData] = useState({
    loanType: 'in_room',
    employeeCode: '',
    retiredDate: '',
    expectedDate: '',
    books: []
  });

  const isUpdate = method === 'update';

  const partnerSource = isUpdate ? loanSelected : loanData;
  const readerSource = isUpdate ? loanSelected : loanData;


  const [books, setBooks] = useState([]);
  
    useEffect(() => {
        getBooks();

        if(method === 'update' && loanSelected?.loanId) {
  
        const fetchAllBooksFromLoan = async () => {
           
            const loanSelectedId = loanSelected.loanId;

            const booksFromLoan = await getBooks(loanSelectedId);

            setLoanData({
              loanType: loanSelected.loanType || 'in_room',
              employeeCode: loanSelected.employeeCode || '',
              retiredDate: loanSelected.retiredDate || '',
              expectedDate: loanSelected.expectedDate || '', // corregido,
              books: booksFromLoan || []
            });


       
        }

        fetchAllBooksFromLoan();

        }
        
    }, []);

    const getBooks = async (loanSelectedId) => {
      try {
         let url = loanSelectedId
          ? `${BASE_URL}/books/withFields/loan/${loanSelectedId}`
          : `${BASE_URL}/books/withFields`;

          // let url =`${BASE_URL}/books/withFields`;

          const response = await fetch(url);
          if (!response.ok) throw new Error("Error al obtener libros");
          const data = await response.json();

          // Siempre actualizar el estado general
          if (!loanSelectedId) {
          setBooks(data); // libros generales
          }

          return data;
      } catch (error) {
          console.error(error);
          return [];
      }
    };



  function handleAddNewLoan() {
    const newLoan = {
      loanType: loanData.loanType,
      employeeCode: loanData.employeeCode,
      retiredDate: loanData.retiredDate,
      expectedDate: loanData.expectedDate,
      partnerName: loanData.partnerName, 
      partnerNumber: loanData.partnerNumber,
      //     retiredHour: '11:00',
      books: loanData.books
    }

    createLoanItem(newLoan);
  }

  function handleEditLoan() {
    const updatedLoan = {
      employeeCode: loanData.employeeCode,
      retiredDate: loanData.retiredDate,
      expectedDate: loanData.expectedDate,
      //     retiredHour: '11:00',
      books: loanData.books

    }

    createLoanItem(updatedLoan);
  }

  function handleAddBook(book) {
    setLoanData(prev => {
      let alreadyExists = loanData.books.some(b => b.BookId === book.BookId);

      if (alreadyExists) {
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
      let alreadyExists = loanData.books.some(b => b.BookId === book.BookId);

      if (!alreadyExists) {
        return prev;
      }

      let booksUpdated = prev.books.filter(b => b.BookId !== book.BookId);

      return {
        ...prev,
        books: booksUpdated
      }

    }
    )
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
  ]

  const columns = [
    { header: 'Código del libro', accessor: 'codeInventory' },
    { header: 'Título', accessor: 'title' },
  ];

  const lendBooksColumns = [ //igual que mainAuthorBooksColumns pero solo se muestran 3 columnas
    { header: 'Código del libro', accessor: 'codeInventory' },
    { header: 'Título', accessor: 'title' },
    { header: 'Posición', accessor: 'position' },
    {
      header: 'Borrar',
      accessor: 'delete',
      render: (_, row) => (
        <button type='button' className="button-table" onClick={() => {
          handleDeleteBook(row);
        }}>
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

  const handleLoanTypeChange = (value, prev) => {
  if (value === 'retired') {
    const { readerDNI, readerName, ...rest } = prev;
    return {
      ...rest,
      partnerName: prev.partnerName || '',
      partnerNumber: prev.partnerNumber || '',
      memoSearch: prev.memoSearch || '',
      loanType: value
    };
  } else {
    const { partnerName, partnerNumber, memoSearch, ...rest } = prev;
    return {
      ...rest,
      readerDNI: prev.readerDNI || '',
      readerName: prev.readerName || '',
      loanType: value
    };
  }
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setLoanData(prev => {
    if (name === 'loanType') {
      return handleLoanTypeChange(value, prev);
    }
    return { ...prev, [name]: value };
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
    {method === 'update' ? (
  <p><strong>Tipo de préstamo:</strong> {loanData.loanType === 'in_room' ? 'En sala' : 'Retirado'}</p>
) : (
  <>
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
  </>
)}

  </div>
</div>


              <div className='add-loan-code-employee input'>
                <label>Código Empleado <span className='required'>*</span></label>
                <input
                  type='text'
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

            {partnerSource.loanType === 'retired' ? (
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
) : (
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
)}


            <div className='lend-books-container'>
              <h2 className='lend-books-title'>Libros a Prestar</h2>

              <Table columns={columns} data={loanData.books}>
                <div className='add-book-to-lend'>
                  <Btn variant={'primary'} text={'Agregar Libro'} onClick={() => setPopupView('addBook')} icon={<img src={AddBookIcon} alt='addBookIconButton' />} />
                </div>
              </Table>
            </div>

            <div className='save-changes-lend-books'>
              <Btn type={'button'} variant={'primary'} text={'Guardar'} onClick={() => {
                setConfirmSaveChangesPopup(true);

              }} icon={<img src={SaveIcon} alt='saveIconButton' />} />
            </div>

          </form>

          {confirmSaveChangesPopup && (
            <PopUp title={'Guardar préstamo'} onClick={() => setConfirmSaveChangesPopup(false)}>
              <ConfirmMessage text={'¿Está seguro de guardar el nuevo prestamo?'} closePopup={() => setConfirmSaveChangesPopup(false)} onConfirm={() => {
                if(method === 'update') {
                  handleEditLoan();
                }
                else {
                  handleAddNewLoan();
                }
                setConfirmSaveChangesPopup(false);
              }} />
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

        </>
      )}

      {popupView === 'unpaidFees' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <UnpaidFees changeView={setPopupView} />
        </>
      )}

      {popupView === 'editUnpaidFees' && (
        <>
          <BackviewBtn menu={'unpaidFees'} changeView={setPopupView} />
          <GenericForm title={'Editar cuota pendiente'} fields={editLoanformFields} onSubmit={(data) => console.log('Formulario enviado:', data)} />
        </>
      )}

      {popupView === 'pendingBooks' && (
        <>
          <Table columns={columnsPendingBooks} data={pendingbooks}></Table>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
        </>
      )}


    </div>
  );
}
