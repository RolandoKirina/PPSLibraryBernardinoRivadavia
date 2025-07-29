import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import { useState } from 'react';
import BookFilter from  '../../components/bookfilter/BookFilter.jsx';
import  '../../components/Table/Table.css';
import './BookSection.css';
import FormEditBook from '../../components/formeditbook/FormEditbook.jsx';
import PopUpDelete from '../../components/deletebtnComponent/PopUpDelete.jsx';
import FormAddBook from '../../components/FormAddbook/FormAddBook.jsx';
import {duplicateBook} from '../../data/book/BookForms.js';
import GenericForm from '../../components/generic/GenericForm/GenericForm.jsx';
import {BookDetail} from '../../data/book/BookDetail.js';
import GenericSection from '../../components/generic/GenericSection/GenericSection.jsx';
import BookButtons from '../../components/BookButtons/BookButtons.jsx';
import ShowDetails from '../../components/generic/ShowDetails/ShowDetails.jsx';

const BookSection = () => {

  const [PopUpEditBook,setPopupEditBook]=useState(false);
  const [PopUpAddBook,setPopupAddBook]=useState(false);
  const [PopUpDeleteBook,setPopUpDeleteBook]=useState(false);
  const [PopUpDuplicateBook,setPopUpDuplicateBook]=useState(false);
  const [PopUpDetailBook,setPopUpDetailBook]=useState(false);
  const books = [
    { id: 1, title: 'El principito', code_inventory: 202, codeCDU: 108 },
    { id: 2, title: '1984', title: '1984', code_inventory: 203, codeCDU: 109 },
    { id: 3, title: 'Cien años de soledad', code_inventory: 204, codeCDU: 110 },
    { id: 4, title: 'Fahrenheit 451', code_inventory: 205, codeCDU: 111 },
    { id: 5, title: 'Crónica de una muerte anunciada', code_inventory: 206, codeCDU: 112 }
  ];

  const columns = [
    { header: 'Título', accessor: 'title' },
    { header: 'Código de inventario', accessor: 'code_inventory' },
    { header: 'Codigo de CDU', accessor: 'codeCDU' },
    {
      header: 'Borrar',
      accessor: 'delete',
      render: (_, row) => (
        <button className="button-table"onClick={() => setPopUpDeleteBook(true)}>
          <img src={DeleteIcon} alt="Borrar" />
        </button>
      )
    },
    {
      header: 'Editar',
      accessor: 'edit',

      render: (_, row) => (
        <button className="button-table"  onClick={() => setPopupEditBook(true)}>
          <img src={EditIcon} alt="Editar" />
        </button>
      )
    },
    {
      header: 'Ver detalle',
      accessor: 'details',
      render: (_, row) => (
        <button className="button-table">
          <img src={DetailsIcon} alt="Detalles" onClick={()=> setPopUpDetailBook(true)}/>
        </button>
      )
    }
  ];

  const booksPopUp=[
    {
        key: 'deletePopup',
        title: 'Borrar Libro',
        className: 'delete-size-popup',
        content: <PopUpDelete title="Libro"/>,
        close: () => setPopUpDeleteBook(false),
        condition: PopUpDeleteBook,
        variant: 'delete'
    },
    {
      key: 'editPopup',
      title: 'Editar Libro',
      className: 'popup-container',
      content: <FormEditBook/>,
      close: () => setPopupEditBook(false),
      condition: PopUpEditBook
    },
    {
      key: 'AddPopup',
      title: 'Agregar Libro',
      className: 'popup-container',
      content: <FormAddBook/>,
      close: () => setPopupAddBook(false),
      condition: PopUpAddBook
    },
    {
      key: 'DuplicatePopUp',
      title: 'Duplicar Libro',
      content: <GenericForm fields={duplicateBook} onSubmit={(data) => console.log('Formulario enviado:', data)}/>,
      close: () => setPopUpDuplicateBook(false),
      condition: PopUpDuplicateBook
    },
    {
      key: 'SeeDetail',
      title: 'Ver detalle',
      content: <ShowDetails isPopup={true} detailsData={BookDetail}/>,
      close: () => setPopUpDetailBook(false),
      condition: PopUpDetailBook
    }
  ]

  return (
    <>
    
      <GenericSection title="Listado de libros" filters={<BookFilter/>} 
      columns={columns} data={books} popups={booksPopUp}
      actions={
          <BookButtons  addBook={() => setPopupAddBook(true)} 
                        duplicateBook={() => setPopUpDuplicateBook(true)}></BookButtons>
      } 
      
      ></GenericSection>





    
    </>
  );
};

export default BookSection;
