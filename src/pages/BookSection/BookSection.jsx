import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import { useState } from 'react';
import BookFilter from  '../../components/bookfilter/BookFilter.jsx';
import  '../../components/Table/Table.css';
import './BookSection.css';
import PopUpDelete from '../../components/deletebtnComponent/PopUpDelete.jsx';
import FormAddBook from '../../components/FormAddbook/FormAddBook.jsx';
import {duplicateBook} from '../../data/book/BookForms.js';
import GenericForm from '../../components/generic/GenericForm/GenericForm.jsx';
import {BookDetail} from '../../data/book/BookDetail.js';
import GenericSection from '../../components/generic/GenericSection/GenericSection.jsx';
import ShowDetails from '../../components/generic/ShowDetails/ShowDetails.jsx';
import {books }from '../../data/mocks/books.js';
import{ useEntityManager} from '../../hooks/useEntityManager.js';
import Btn from '../../components/btn/Btn.jsx';
import PlusIcon from '../../assets/img/plus-icon.svg';
import BookIcon from '../../assets/img/book-icon.svg';
import FormEditBook from '../../components/formeditbook/FormEditbook.jsx';
import BookRanking from '../../components/bookranking/BookRanking.jsx';

const BookSection = () => {

  
  const [selectedItem, setSelectedItem] = useState(null);
  const [PopUpEdit,setPopupEdit]=useState(false);
  const [PopUpAdd,setPopupAdd]=useState(false);
  const [PopUpDeleteBook,setPopUpDelete]=useState(false);
  const [PopUpDuplicate,setPopUpDuplicate]=useState(false);
  const [PopUpDetail,setPopUpDetail]=useState(false);
  const [PopUpRanking,setPopUpRanking]=useState(false);


  const {items,getItem,createItem,updateItem,deleteItem} = useEntityManager(books, "books");

  const columns = [
    { header: 'Título', accessor: 'title' },
    { header: 'Código de inventario', accessor: 'code_inventory' },
    { header: 'Codigo de CDU', accessor: 'codeCDU' },
    {
      header: 'Borrar',
      accessor: 'delete',
      className: "action-buttons",
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
      className: "action-buttons",
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
      className: "action-buttons",
      render: (_, row) => (
        <button className="button-table">
          <img src={DetailsIcon} alt="Detalles" onClick={
            ()=> {setPopUpDetail(true)
              setSelectedItem(row)
            }
            }/>
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
      content: <ShowDetails data={selectedItem} detailsData={BookDetail} isPopup={true}  />,
      close: () => setPopUpDetail(false),
      condition: PopUpDetail
    },
    {
      key: 'BooksRanking',
      title: 'Ranking de libros',
      classname: 'ranking-books-size',
      content: <BookRanking />,
      close: () => setPopUpRanking(false),
      condition: PopUpRanking
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
        <div className='listbtns'>
               <Btn  icon={<img src={PlusIcon}/>} onClick={() => setPopupAdd(true)} text={'Agregar libro'} variant={"primary"}/>
               <Btn icon={<img src={PlusIcon}/>} onClick={() =>setPopUpDuplicate(true)} text={'Duplicar libro'} variant={"primary"}/>
               <Btn icon={<img src={BookIcon}/>} onClick={() =>setPopUpRanking(true)} text={'Ranking de libros'} variant={"primary"}/>
        </div>
         
      } 
      
      ></GenericSection>





    
    </>
  );
};

export default BookSection;
