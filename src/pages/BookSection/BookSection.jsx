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
import {books }from '../../data/mocks/books.js';
import{ useEntityManager} from '../../hooks/useEntityManager.js';
const BookSection = () => {

  
  const [selectedItem, setSelectedItem] = useState(null);
  const [PopUpEdit,setPopupEdit]=useState(false);
  const [PopUpAdd,setPopupAdd]=useState(false);
  const [PopUpDeleteBook,setPopUpDelete]=useState(false);
  const [PopUpDuplicate,setPopUpDuplicate]=useState(false);
  const [PopUpDetail,setPopUpDetail]=useState(false);


  const {items,getItem,createItem,updateItem,deleteItem} = useEntityManager(books, "books");

  const columns = [
    { header: 'Título', accessor: 'title' },
    { header: 'Código de inventario', accessor: 'code_inventory' },
    { header: 'Codigo de CDU', accessor: 'codeCDU' },
    {
      header: 'Borrar',
      accessor: 'delete',
      render: (_, row) => (
        <button className="button-table"
          onClick={() => {
            setPopUpDelete(true)
            setSelectedItem(row)
        }}>
        
          <img src={DeleteIcon} alt="Borrar" />
        </button>
      )
    },
    {
      header: 'Editar',
      accessor: 'edit',

      render: (_, row) => (
        <button className="button-table"  
        onClick={() =>{
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
        content: <PopUpDelete
                  title={"Ítem"}
                  onConfirm={() => {
                    deleteItem(selectedItem.id);
                    setPopUpDelete(false);
                  }}
                      closePopup={() => setPopUpDelete(false)}/>,
        close: () => setPopUpDelete(false),
        condition: PopUpDeleteBook,
        variant: 'delete'
    },
    {
      key: 'editPopup',
      title: 'Editar Libro',
      className: 'popup-container',
      content: <FormEditBook/>,
      close: () => setPopupEdit(false),
      condition: PopUpEdit
    },
    {
      key: 'AddPopup',
      title: 'Agregar Libro',
      className: 'popup-container',
      content: <FormAddBook/>,
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
      content: <ShowDetails isPopup={true} detailsData={BookDetail}/>,
      close: () => setPopUpDetail(false),
      condition: PopUpDetail
    }
  ]

  function duplicateBooks(data){
    let bookData = getItem(data.id);
     const maxId = Math.max(...items.map(b => b.id), 0);
    const newId = maxId + 1;
    const duplicatedBook = { ...bookData, id: newId };
    createItem(duplicatedBook);
  }
  return (
    <>
    
      <GenericSection title="Listado de libros" filters={<BookFilter/>} 
      columns={columns} data={items} popups={booksPopUp}
      actions={
          <BookButtons  addBook={() => setPopupAdd(true)} 
                        duplicateBook={() => setPopUpDuplicate(true)}></BookButtons>
      } 
      
      ></GenericSection>





    
    </>
  );
};

export default BookSection;
