import './AddRenewe.css';
import { Table } from '../../table/Table';
import { useState } from 'react';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import AddBookIcon from '../../../assets/img/add-book-icon.svg';
import Btn from '../../btn/Btn';
import PopUp from '../../popup-table/PopUp2';
import ConfirmMessage from '../../../components/confirmMessage/ConfirmMessage';
import BackviewBtn from '../../backviewbtn/BackviewBtn';
import FormEditBook from '../../formeditbook/FormEditBook';
import SaveIcon from '../../../assets/img/save-icon.svg';

export default function addRenewe({ menu }) {
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [popupView, setPopupView] = useState('default');

  const mainReneweBooks = [
    { id: 1, book_code: '000320023', title: '100 Años del eco tandil', position: 1, codclass: '51', codrcdu: '', codling: 'M 22' },
  ];

  const reneweBooks = [
    { id: 1, book_code: '000320023', title: '100 Años del eco tandil', position: 1 },
  ];

  const mainReneweBooksColumns = [
    { header: 'Código del libro', accessor: 'book_code' },
    { header: 'Título', accessor: 'title' },
    { header: 'Posición', accessor: 'position' },
    { header: 'Codclass', accessor: 'codclass' },
    { header: 'Codrcdu', accessor: 'codrcdu' },
    { header: 'CodLing', accessor: 'codling' },
    {
      header: 'Editar',
      accessor: 'edit',
      render: (_, row) => (
        <button type='button' className="button-table" onClick={() => setPopupView('editBookForm')}>
          <img src={EditIcon} alt="Editar" />
        </button>
      )
    }
  ];

  const bookshelfBooks = Array(5).fill({
    id: 1,
    book_code: '000320023',
    title: '100 Años del eco tandil'
  });

  const reneweBooksColumns = [
    { header: 'Código del libro', accessor: 'book_code' },
    { header: 'Título', accessor: 'title' },
    { header: 'Posición', accessor: 'position' },
    {
      header: 'Borrar',
      accessor: 'delete',
      render: (_, row) => (
        <button type='button' className="button-table" onClick={() => setConfirmPopup(true)}>
          <img src={DeleteIcon} alt="Borrar" />
        </button>
      )
    }
  ];

  const bookshelfBooksColumns = [
    { header: 'Código', accessor: 'book_code' },
    { header: 'Título', accessor: 'title' },
    {
      header: 'Agregar',
      accessor: 'edit',
      render: (_, row) => (
        <button type='button' className="button-table" onClick={() => menu('editForm')}>
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
      content: <ConfirmMessage text="¿Está seguro de confirmar los cambios?" closePopup={() => setConfirmPopup(false)} />,
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
            <div className='add-loan-retire-date'>
              <label>Numero</label>
              <input type='text' />
            </div>
            <div className='add-loan-retire-date'>
              <label>Apellido, Nombre</label>
              <input type='text' />
            </div>
            <div className='add-loan-retire-date'>
              <label>Fecha reserva</label>
              <input type='date' />
            </div>
            <div className='add-loan-retire-date'>
              <label>Fecha promesa</label>
              <input type='date' />
            </div>
            <div className='add-loan-retire-date'>
              <label>Título libro</label>
              <input type='text' />
            </div>
          </div>
          <div className='renewe-books-title'>
            <h3>Libros vinculados a la reserva</h3>
          </div>
          <Table columns={mainReneweBooksColumns} data={mainReneweBooks}>
            <div className='main-renewe-btns'>
              <Btn className="primary-btn" onClick={() => setPopupView('addBook')} text="Administrar libros" />
            </div>
          </Table>
          <div className='save-changes-lend-books'>
            <Btn text="Guardar" onClick={() => setConfirmPopup(true)} icon={<img src={SaveIcon} alt="Guardar" />} />
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
            <Table columns={bookshelfBooksColumns} data={bookshelfBooks} />
          </div>
          <div className='renewe-books'>
            <div className='renewe-books-title'>
              <h3>Libros vinculados</h3>
            </div>
            <Table columns={reneweBooksColumns} data={reneweBooks} />
          </div>
        </>
      )}

      {popupView === 'editBookForm' && (
        <>
          <BackviewBtn menu='default' changeView={setPopupView} />
          <div>
            <div className='editBookAuthor'>
              <h2>Editar libro</h2>
            </div>
            <FormEditBook />
          </div>
        </>
      )}
    </div>
  );
}
