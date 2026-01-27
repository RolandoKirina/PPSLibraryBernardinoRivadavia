import './AddRenewe.css';
import { Table } from '../../common/table/Table';
import { useState, useEffect } from 'react';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import AddBookIcon from '../../../assets/img/add-book-icon.svg';
import Btn from '../../common/btn/Btn';
import PopUp from '../../common/popup-table/PopUp';
import ConfirmMessage from '../../../components/common/confirmMessage/ConfirmMessage';
import BackviewBtn from '../../common/backviewbtn/BackviewBtn';
import SaveIcon from '../../../assets/img/save-icon.svg';
import { useAuth } from '../../../auth/AuthContext';
import SearchPartner from '../searchpartner/SearchPartner';
import UnpaidFees from '../unpaidfees/UnpaidFees';
import PendingBooks from '../pendingBooks/PendingBooks';
import PartnerMemo from '../partnermemo/PartnerMemo';

export default function AddRenewe({ refreshItems, createReneweItem }) {
  const { auth } = useAuth();
  const BASE_URL = 'http://localhost:4000/api/v1';

  const chunkSize = 100;
  const rowsPerPage = 5;
  const [offsetActual, setOffsetActual] = useState(0);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);

  const [popupView, setPopupView] = useState('default');
  const [confirmPopup, setConfirmPopup] = useState(false);

  const [reneweData, setReneweData] = useState({
    partnerNumber: '',
    partnerFullName: '',
    memoSearch: '',
    reservationDate: '',
    expectedDate: '',
    books: []
  });

  const [libraryBooks, setLibraryBooks] = useState([]);
  const [totalLibraryBooks, setTotalLibraryBooks] = useState(0);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [addBookMessage, setAddBookMessage] = useState('');

  useEffect(() => {
    getLibraryBooks({ limit: chunkSize, offset: 0 });
  }, []);

  const getLibraryBooks = async (filters = {}, append = false) => {
    setLoadingBooks(true);
    const queryParams = new URLSearchParams(filters).toString();
    const res = await fetch(`${BASE_URL}/books/withFields?${queryParams}`);
    const { rows, total } = await res.json();

    setTotalLibraryBooks(total);
    setLibraryBooks(prev => append ? [...prev, ...rows] : rows);
    setLoadingBooks(false);
  };

  async function handleChangePage(page) {
    const lastItemIndex = Number(page) * rowsPerPage;
    if (libraryBooks.length < totalLibraryBooks && lastItemIndex > libraryBooks.length) {
      await getLibraryBooks(
        { limit: chunkSize, offset: libraryBooks.length },
        true
      );
    }
  }

  function handleAddBook(book) {
    setReneweData(prev => {
      if (prev.books.some(b => b.BookId === book.BookId)) {
        setAddBookMessage(`El libro "${book.title}" ya fue añadido.`);
        return prev;
      }
      setAddBookMessage('');
      return { ...prev, books: [...prev.books, book] };
    });
  }

  function handleDeleteBook(book) {
    setReneweData(prev => ({
      ...prev,
      books: prev.books.filter(b => b.BookId !== book.BookId)
    }));
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setReneweData(prev => ({ ...prev, [name]: value }));
  }

  function handleExtraData(data) {
    setReneweData(prev => ({ ...prev, ...data }));
  }

  async function handleSaveChanges() {
    if (!reneweData.partnerNumber || reneweData.books.length === 0) return;

    await createReneweItem(reneweData);
    setConfirmPopup(false);
    await refreshItems();
  }

  const bookshelfBooksColumns = [
    { header: 'Código', accessor: 'codeInventory' },
    { header: 'Título', accessor: 'title' },
    {
      header: 'Agregar',
      accessor: 'add',
      render: (_, row) => (
        <button type='button' className='button-table' onClick={() => handleAddBook(row)}>
          <img src={AddBookIcon} alt='Agregar' />
        </button>
      )
    }
  ];

  const reneweBooksColumns = [
    { header: 'Código', accessor: 'codeInventory' },
    { header: 'Título', accessor: 'title' },
    {
      header: 'Borrar',
      accessor: 'delete',
      render: (_, row) => (
        <button type='button' className='button-table' onClick={() => handleDeleteBook(row)}>
          <img src={DeleteIcon} alt='Borrar' />
        </button>
      )
    }
  ];

  const popups = [
    {
      condition: confirmPopup,
      title: 'Confirmar reserva',
      content: (
        <ConfirmMessage
          text='¿Está seguro de guardar la nueva reserva?'
          closePopup={() => setConfirmPopup(false)}
          onConfirm={handleSaveChanges}
        />
      )
    }
  ];
  return (
    <div className='renewe-books-container'>
      {popupView === 'default' && (
        <div className='main-renewe-books'>
          <div className='renewe-books-title'>
            <h3>Datos de la reserva</h3>
          </div>

          <div className='add-loan-form-inputs'>
            <div className='add-loan-retire-date input'>
              <label>Fecha reserva</label>
              <input type='date' name='reservationDate' value={reneweData.reservationDate} onChange={handleOnChange} />
            </div>
            <div className='add-loan-retire-date input'>
              <label>Fecha promesa</label>
              <input type='date' name='expectedDate' value={reneweData.expectedDate} onChange={handleOnChange} />
            </div>
            <SearchPartner
              method="create"
              menu={setPopupView}
              onDataChange={handleExtraData}
              partnerData={{
                partnerNumber: reneweData.partnerNumber,
                partnerName: reneweData.partnerFullName,
                memoSearch: reneweData.memoSearch
              }}
            />
          </div>

          <div className='renewe-books-title'>
            <h3>Libros vinculados a la reserva</h3>
          </div>

          <Table columns={reneweBooksColumns} data={reneweData.books} totalItems={reneweData.books.length}>
            <div className='main-renewe-btns'>
              <Btn variant={'primary'} className='primary-btn' onClick={() => setPopupView('addBook')} text='Administrar libros' />
            </div>
          </Table>

          {addBookMessage && <p className='error-text'>{addBookMessage}</p>}

          <div className='save-changes-lend-books'>
            <Btn variant={'primary'} text='Guardar' onClick={() => setConfirmPopup(true)} icon={<img src={SaveIcon} alt='Guardar' />} />
          </div>

          {popups.map(({ condition, title, content }, idx) =>
            condition ? (
              <PopUp key={idx} title={title} onClick={() =>
                setConfirmPopup(false)}>
                {content}
              </PopUp>
            ) : null
          )}
        </div>
      )}

      {popupView === 'addBook' && (
        <>
          <BackviewBtn menu='default' changeView={setPopupView} />
          <div className='library-books'>
            <div className='renewe-books-title'>
              <h3>Libros cargados en la biblioteca</h3>
            </div>
            <Table columns={bookshelfBooksColumns} data={libraryBooks} totalItems={totalLibraryBooks} handleChangePage={handleChangePage} loading={loadingBooks} resetPageTrigger={resetPageTrigger} />
          </div>
          <div className='renewe-books'>
            <div className='renewe-books-title'>
              <h3>Libros vinculados</h3>
            </div>
            <Table columns={reneweBooksColumns} data={reneweData.books} totalItems={reneweData.books.length} />
          </div>
        </>
      )}

      {popupView === 'unpaidFees' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <UnpaidFees changeView={setPopupView} partnerNumber={reneweData.partnerNumber} />
        </>
      )}

      {popupView === 'pendingBooks' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <PendingBooks changeView={setPopupView} partnerNumber={reneweData.partnerNumber} />
        </>
      )}

      {popupView === 'partnerMemo' && (
        <>
          <BackviewBtn menu={'default'} changeView={setPopupView} />
          <PartnerMemo changeView={setPopupView} partnerNumber={reneweData.partnerNumber} />
        </>
      )}
    </div>
  );
}
