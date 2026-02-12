import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import { useState, useEffect } from 'react';
import BookFilter from '../../components/filter/bookfilter/BookFilter.jsx';
import './BookSection.css';
import PopUpDelete from '../../components/common/deletebtnComponent/PopUpDelete.jsx';
import FormAddBook from '../../components/book-components/FormAddBook/FormAddBook.jsx';
import { duplicateBook } from '../../data/forms/BookForms.js';
import GenericForm from '../../components/generic/GenericForm/GenericForm.jsx';
import { BookDetail } from '../../data/showdetails/BookDetail.js';
import GenericSection from '../../components/generic/GenericSection/GenericSection.jsx';
import ShowDetails from '../../components/generic/ShowDetails/ShowDetails.jsx';
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
const BookSection = () => {
  const chunkSize = 100;
  const rowsPerPage = 5;
  const [offsetActual, setOffsetActual] = useState(0);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);
  const { auth } = useAuth();
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
  const [filters, setFilters] = useState({});
  const BASE_URL = "http://localhost:4000/api/v1/books";

  const { items, loading, totalItems, getItems, getItem, createItem, updateItem, deleteItem } =
    useEntityManagerAPI("books");

  const [formData, setFormData] = useState({
    author: "",
    codeInventory: "",
    codeCDU: "",
    codeSignature: "",
    bookTitle: "",
    yearEdition: "",
    numberEdition: ""
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const activeFilters = Object.fromEntries(
        Object.entries(formData).filter(([_, v]) => v !== "")
      );

      setFilters(activeFilters);

      setOffsetActual(0);
      setResetPageTrigger(prev => prev + 1);

      getItems({
        ...activeFilters,
        sortBy: 'title', direction: 'asc', 
        limit: chunkSize,
        offset: 0
      });
    }, 500);

    return () => clearTimeout(delay);
  }, [formData]);

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    if (items.length < totalItems && lastItemIndex > items.length) {
      const newOffset = items.length;
      await getItems({ ...formData, sortBy: 'title', direction: 'asc', limit: chunkSize, offset: newOffset }, true);
      setOffsetActual(newOffset);
    }
  }

  let columns = [];
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
          refresh={() => getItems({
        ...filters,
        sortBy: 'title', direction: 'asc', 
        limit: chunkSize,
        offset: 0
      })}
        />
      ),
      close: () => setPopUpDelete(false),
      condition: PopUpDeleteBook
    },
    {
      key: 'editPopup',
      title: 'Editar Libro',
      className: 'popup-container-book-form editsize',
      content: <FormEditBook selectedBook={selectedItem} getItems={() => getItems({
        ...filters,
        sortBy: 'title', direction: 'asc', 
        limit: chunkSize,
        offset: 0
      })} />,
      close: () => setPopupEdit(false),
      condition: PopUpEdit
    },
    {
      key: 'AddPopup',
      title: 'Agregar Libro',
      className: 'popup-container-book-form editsize',
      content: <FormAddBook getItems={() => getItems({
        ...filters,
        sortBy: 'title', direction: 'asc', 
        limit: chunkSize,
        offset: 0
      })} />,
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

  async function duplicateBooks(data) {
    try {
      const response = await fetch(BASE_URL + "/duplicateBook", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codeInventory: data.codeInventory,
          newCodeInventory: data.newCodeInventory,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al duplicar el libro');
      }

      const result = await response.json();
      console.log('Libro duplicado:', result);

      await getItems();

      return result;

    } catch (error) {
      console.error('Error duplicando el libro:', error.message);
      throw error; // opcional: para manejarlo más arriba
    }
  }


  return (
    <>
      <GenericSection
        title="Listado de libros"
        filters={
          <BookFilter formData={formData} onChange={handleFilterChange}
          />}
        columns={columns}
        data={items}
        popups={booksPopUp}
        totalItems={totalItems}
        handleChangePage={handleChangePage}
        loading={loading}
        resetPageTrigger={resetPageTrigger}
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
