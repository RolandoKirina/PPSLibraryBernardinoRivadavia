import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import { useState } from 'react';
import BookFilter from '../../components/filter/bookfilter/BookFilter.jsx';
import './BookSection.css';
import PopUpDelete from '../../components/common/deletebtnComponent/PopUpDelete.jsx';
import FormAddBook from '../../components/book-components/FormAddBook/FormAddBook.jsx';
import { duplicateBook } from '../../data/forms/BookForms.js';
import GenericForm from '../../components/generic/GenericForm/GenericForm.jsx';
import { BookDetail } from '../../data/showdetails/BookDetail.js';
import GenericSection from '../../components/generic/GenericSection/GenericSection.jsx';
import ShowDetails from '../../components/generic/ShowDetails/ShowDetails.jsx';
//import { books } from '../../data/mocks/books.js';
import { useEntityManagerAPI } from '../../hooks/useEntityManagerAPI.js';
import Btn from '../../components/common/btn/Btn.jsx';
import PlusIcon from '../../assets/img/plus-icon.svg';
import BookIcon from '../../assets/img/book-icon.svg';
import LostBookIcon from '../../assets/img/lost-book.svg';
import ReaderIcon from '../../assets/img/reader.svg';
import FormEditBook from '../../components/book-components/formeditbook/FormEditBook.jsx';
import PartnersBooks from '../../components/partner-components/partnersbooks/PartnersBooks.jsx';
import LostBooks from '../../components/book-components/lostbooks/LostBooks.jsx';
import BookRanking from '../../components/book-components/bookranking/BookRanking.jsx';
import { useAuth } from '../../auth/AuthContext';
import roles from '../../auth/roles';
import { useEffect } from 'react';
const BookSection = () => {
 
  const { auth } = useAuth();

 const [books, setBooks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [PopUpEdit, setPopupEdit] = useState(false);
  const [PopUpAdd, setPopupAdd] = useState(false);
  const [PopUpDeleteBook, setPopUpDelete] = useState(false);
  const [PopUpDuplicate, setPopUpDuplicate] = useState(false);
  const [PopUpDetail, setPopUpDetail] = useState(false);
  const [PopUpRanking, setPopUpRanking] = useState(false);
  const [PopUpBooksPartners, setPopUpBooksPartners] = useState(false);
  const [PopUpLostBooks, setPopUpLostBooks] = useState(false);
  const [error, setError] = useState(null);

const { items, getItems, getItem, createItem, updateItem, deleteItem } =
  useEntityManagerAPI("books");

  const [formData, setFormData] = useState({
    author: "",
    codeInventory: "",
    codeCDU: "",
    codeSignature: "",
    yearEdition: "",
    numberEdition: ""
  });

   const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  useEffect(() => {
      const filters = Object.fromEntries(
        Object.entries(formData).filter(([_, v]) => v !== "")
      );

      const delay = setTimeout(() => {
        getItems(filters);
      }, 300); 

      return () => clearTimeout(delay);
}, [formData, items]);


let columns =[];
   if (auth.role === roles.admin) {

         columns = [
          { header: 'Título', accessor: 'title' },
          { header: 'Código de inventario', accessor: 'codeInventory' },
          { header: 'Codigo de CDU', accessor: 'codeCDU' },
          {
            header: 'Borrar',
            accessor: 'delete',
            className: "action-buttons",
            render: (_, row) => (
              <button className="button-table"
                onClick={() => {
                    console.log("ID seleccionado:", row.BookId);
                setSelectedId(row.BookId);
                setPopUpDelete(true);
              }}>

                <img src={DeleteIcon} alt="Borrar" />
              </button>
            )
          },
          {
            header: 'Editar',
            accessor: 'edit',
            className: "action-buttons",
            render: (_, row) => (
              <button className="button-table"
                onClick={() => {
                  setPopupEdit(true)
                  setSelectedItem(row)
                }}

              >
                <img src={EditIcon} alt="Editar" />
              </button>
            )
          },
          {
            header: 'Ver detalle',
            accessor: 'details',
            className: "action-buttons",
            render: (_, row) => (
              <button className="button-table">
                <img src={DetailsIcon} alt="Detalles" onClick={
                  () => {
                    setPopUpDetail(true)
                    setSelectedItem(row)
                  }
                } />
              </button>
            )
          }
        ];

   }

  else if ((auth.role === roles.user || auth.role === roles.reader)) {

    
         columns = [
          { header: 'Título', accessor: 'title' },
          { header: 'Código de inventario', accessor: 'codeInventory' },
          { header: 'Codigo de CDU', accessor: 'codeCDU' }];

  }
  
  const booksPopUp = [
    {
      key: 'deletePopup',
      title: 'Borrar Libro',
      className: 'delete-size-popup',
      content: (
        <PopUpDelete
          title="Libro"
          onConfirm={() => deleteItem(selectedId)} 
          closePopup={() => setPopUpDelete(false)}
          refresh={() => getItems()} 
        />
      ),
      close: () => setPopUpDelete(false),
      condition: PopUpDeleteBook
    },
    {
      key: 'editPopup',
      title: 'Editar Libro',
      className: 'popup-container-book-form',
      content: <FormEditBook selectedBook={selectedItem} />,
      close: () => setPopupEdit(false),
      condition: PopUpEdit
    },
    {
      key: 'AddPopup',
      title: 'Agregar Libro',
      className: 'popup-container-book-form',
      content: <FormAddBook />,
      close: () => setPopupAdd(false),
      condition: PopUpAdd
    },
    {
      key: 'DuplicatePopUp',
      title: 'Duplicar Libro',
      className: 'fade-popup',
      content: (
        <GenericForm
          fields={duplicateBook}
          onSubmit={(data) => {
            duplicateBooks(data);
            setPopUpDuplicate(false);
          }}
        />
      ),
      close: () => setPopUpDuplicate(false),
      condition: PopUpDuplicate
    },
    {
      key: 'SeeDetail',
      title: 'Ver detalle',
      content: <ShowDetails data={selectedItem} detailsData={BookDetail} isPopup={true} />,
      close: () => setPopUpDetail(false),
      condition: PopUpDetail
    },
    {
      key: 'BooksRanking',
      title: 'Ranking de libros',
      className: 'ranking-books-size',
      content: <BookRanking />,
      close: () => setPopUpRanking(false),
      condition: PopUpRanking
    },
    {
      key: 'BooksPartnersQuantity',
      title: 'Cantidad de libros y socios',
      className: 'books-partners-amount-size',
      content: <PartnersBooks />,
      close: () => setPopUpBooksPartners(false),
      condition: PopUpBooksPartners
    },
    {
      key: 'LostBooks',
      title: 'Libros perdidos',
      className: 'lost-books-size',
      content: <LostBooks />,
      close: () => setPopUpLostBooks(false),
      condition: PopUpLostBooks
    }
  ]

  function duplicateBooks(data) {
    let bookData = getItem(data.id);
    const maxId = Math.max(...items.map(b => b.id), 0);
    const newId = maxId + 1;
    const duplicatedBook = { ...bookData, id: newId };
    createItem(duplicatedBook);
  }
return (
    <>
      <GenericSection 
  title="Listado de libros" 
  filters={      <BookFilter formData={formData} onChange={handleFilterChange} />}
  columns={columns} 
  data={items} 
  popups={booksPopUp}
  actions={
    auth.role === roles.admin ? (
      <div className="listbtns">
        <Btn icon={<img src={PlusIcon} />} onClick={() => setPopupAdd(true)} text="Agregar libro" variant="primary" />
        <Btn icon={<img src={PlusIcon} />} onClick={() => setPopUpDuplicate(true)} text="Duplicar libro" variant="primary" />
        <Btn icon={<img src={BookIcon} />} onClick={() => setPopUpRanking(true)} text="Ranking de libros" variant="primary" />
        <Btn icon={<img src={ReaderIcon} />} onClick={() => setPopUpBooksPartners(true)} text="Libros y socios" variant="primary" />
        <Btn icon={<img src={LostBookIcon} />} onClick={() => setPopUpLostBooks(true)} text="Libros perdidos" variant="primary" />
      </div>
    ) : null
  }
/>

     
    </>
  );
}
export default BookSection;
