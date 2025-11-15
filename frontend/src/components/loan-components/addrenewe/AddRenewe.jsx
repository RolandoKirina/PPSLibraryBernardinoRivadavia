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

export default function AddRenewe({ refreshItems, createReneweItem }) {
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [popupView, setPopupView] = useState('default');
  const BASE_URL = 'http://localhost:4000/api/v1';
  const { auth } = useAuth();

  const [reneweData, setReneweData] = useState({
    partnerNumber: '',
    partnerFullName: '',
    reneweDate: '',
    expectedDate: '',
    books: []
  });

  const [books, setBooks] = useState([]);
  const [addBookMessage, setAddBookMessage] = useState('');

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async (reservationId) => {
    try {
      let url = reservationId
        ? `${BASE_URL}/books/withFields/reservation/${reservationId}`
        : `${BASE_URL}/books/withFields`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener libros');
      const data = await response.json();

      if (!reservationId) setBooks(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  async function handleAddBook(book) {
   /* const available = await verifyIfAvailable(book.BookId);

    if (!available) {
      setAddBookMessage(`El libro "${book.title}" no está disponible para reservar.`);
      return;
    }*/

    setReneweData((prev) => {
      const exists = prev.books.some((b) => b.BookId === book.BookId);
      if (exists) {
        setAddBookMessage(`El libro "${book.title}" ya fue añadido.`);
        return prev;
      }

      setAddBookMessage('');
      return { ...prev, books: [...prev.books, book] };
    });
  }

  // 🔹 Verificar si un libro ya está reservado o no
  async function verifyIfAvailable(bookId) {
    try {
      const res = await fetch(`${BASE_URL}/reservations/repeated-book/${bookId}`);
      if (!res.ok) throw new Error('Error al verificar libro');
      const data = await res.json();
      return data.available; // true o false
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // 🔹 Eliminar libro de la reserva
  function handleDeleteBook(book) {
    setReneweData((prev) => {
      const updated = prev.books.filter((b) => b.BookId !== book.BookId);
      return { ...prev, books: updated };
    });
  }

  async function handleSaveChanges() {
  if (!reneweData.partnerNumber) {
    alert('Debe completar los datos del socio.');
    return;
  }

  if (reneweData.books.length === 0) {
    alert('Debe agregar al menos un libro a la reserva.');
    return;
  }

  try {
    await createReneweItem({
      partnerNumber: reneweData.partnerNumber,
      partnerFullName: reneweData.partnerFullName,
      reservationDate: reneweData.reservationDate,
      expectedDate: reneweData.expectedDate,
      books: reneweData.books,
    });

    setConfirmPopup(false);

    await refreshItems();
  } catch (error) {
    console.error("Error al guardar los cambios:", error);
    alert("Ocurrió un error al guardar los cambios.");
  }
}


  function handleOnChange(e) {
    const { name, value } = e.target;
    setReneweData((prev) => ({ ...prev, [name]: value }));
  }

  // 🔹 Columnas
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
    { header: 'Código del libro', accessor: 'codeInventory' },
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
              <label>Número de socio</label>
              <input type='text' name='partnerNumber' value={reneweData.partnerNumber} onChange={handleOnChange} />
            </div>
            <div className='add-loan-retire-date input'>
              <label>Apellido, Nombre</label>
              <input type='text' name='partnerFullName' value={reneweData.partnerFullName} onChange={handleOnChange} />
            </div>
            <div className='add-loan-retire-date input'>
              <label>Fecha reserva</label>
              <input type='date' name='reservationDate' value={reneweData.reservationDate} onChange={handleOnChange} />
            </div>
            <div className='add-loan-retire-date input'>
              <label>Fecha promesa</label>
              <input type='date' name='expectedDate' value={reneweData.expectedDate} onChange={handleOnChange} />
            </div>
          </div>

          <div className='renewe-books-title'>
            <h3>Libros vinculados a la reserva</h3>
          </div>

          <Table columns={reneweBooksColumns} data={reneweData.books}>
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
            <Table columns={bookshelfBooksColumns} data={books} />
          </div>
          <div className='renewe-books'>
            <div className='renewe-books-title'>
              <h3>Libros vinculados</h3>
            </div>
            <Table columns={reneweBooksColumns} data={reneweData.books} />
          </div>
        </>
      )}
    </div>
  );
}
