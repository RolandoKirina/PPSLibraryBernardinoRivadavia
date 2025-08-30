import './AddRenewe.css';
import { Table } from '../../table/Table';
import { useState } from 'react';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import AddBookIcon from '../../../assets/img/add-book-icon.svg';
import Btn from '../../btn/Btn';
import PopUp from '../../popup-table/PopUp';
import ConfirmMessage from '../../../components/confirmMessage/ConfirmMessage';
import BackviewBtn from '../../backviewbtn/BackviewBtn';
import SaveIcon from '../../../assets/img/save-icon.svg';
import { books } from '../../../data/mocks/authors';

export default function addRenewe({menu, selected, createReneweItem }) {
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [popupView, setPopupView] = useState('default');
  const [reneweData, setReneweData] = useState({
    partnerNumber: '',
    partnerFullName: '',
    reneweDate: '',
    expectedDate: '',
    books: []
  })

function handleSaveChanges() {
  reneweData.books.forEach(reneweBook => {
    createReneweItem({
      partnerNumber: reneweData.partnerNumber,
      partnerFullName: reneweData.partnerFullName,
      bookTitle: reneweBook.bookTitle,
      reneweDate: reneweData.reneweDate,
      expectedDate: reneweData.expectedDate
    });
  });
}
  function handleAddBook(book) {
    setReneweData(prev => {
      let alreadyExists = reneweData.books.some(b => b.id === book.id);

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
    setReneweData(prev => {
      let alreadyExists = reneweData.books.some(b => b.id === book.id);

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

  function handleOnChange(e) {
    const {name, value} = e.target;

    setReneweData(prev => ({
      ...prev,
      [name]: value
    }))

    console.log("Datos de la reserva:", { ...reneweData, [name]: value });
  }


  const mainReneweBooksColumns = [
    { header: 'Código del libro', accessor: 'bookCode' },
    { header: 'Título', accessor: 'bookTitle' },
    { header: 'Posición', accessor: 'position' },
    { header: 'Codclass', accessor: 'codClass' },
    { header: 'Codrcdu', accessor: 'codRcdu' },
    { header: 'CodLing', accessor: 'codLing' },
  ];

  const reneweBooksColumns = [
    { header: 'Código del libro', accessor: 'bookCode' },
    { header: 'Título', accessor: 'bookTitle' },
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

  const bookshelfBooksColumns = [
    { header: 'Código', accessor: 'bookCode' },
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
  ];

  const reneweBooksPopups = [
    {
      key: 'confirmPopup',
      title: 'Confirmar cambios',
      className: '',
      content: <ConfirmMessage text="¿Está seguro de confirmar los cambioss?" closePopup={() => setConfirmPopup(false)} onConfirm={() => {
        setConfirmPopup(false)
        handleSaveChanges()
        
      }}/>,
      close: () => setConfirmPopup(false),
      condition: confirmPopup,
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
              <label>Numero</label>
              <input type='text' name='partnerNumber' value={reneweData.partnerNumber} onChange={handleOnChange}/>
            </div>
            <div className='add-loan-retire-date input'>
              <label>Apellido, Nombre</label>
              <input type='text' name='partnerFullName' value={reneweData.partnerFullName} onChange={handleOnChange}/>
            </div>
            <div className='add-loan-retire-date input'>
              <label>Fecha reserva</label>
              <input type='date' name='reneweDate' value={reneweData.reneweDate}  onChange={handleOnChange}/>
            </div>
            <div className='add-loan-retire-date input'>
              <label>Fecha promesa</label>
              <input type='date' name='expectedDate' value={reneweData.expectedDate}  onChange={handleOnChange}/>
            </div>
            {/*FILTRO:  <div className='add-loan-retire-date'>
              <label>Título libro</label>
              <input type='text' />
            </div> */}
          </div>
          <div className='renewe-books-title'>
            <h3>Libros vinculados a la reserva</h3>
          </div>
          <Table columns={mainReneweBooksColumns} data={reneweData.books}>
            <div className='main-renewe-btns'>
              <Btn variant={'primary'} className="primary-btn" onClick={() => setPopupView('addBook')} text="Administrar libros" />
            </div>
          </Table>
          <div className='save-changes-lend-books'>
            <Btn variant={'primary'} text="Guardar" onClick={() => setConfirmPopup(true)} icon={<img src={SaveIcon} alt="Guardar" />} />
          </div>
          {reneweBooksPopups.map(({ condition, title, className, content, close, variant }, idx) =>
            condition && (
              <PopUp key={idx} title={title} className={className || ''} onClick={close} {...(variant === 'delete' && { variant: 'delete' })}>
                {content}
              </PopUp>
            )
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
