import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import { Table } from '../../components/table/Table.jsx';
import { useState } from 'react';
import plusIcon from '../../assets/img/add-book-icon.svg';
import Btn from '../../components/btn/Btn'
import BookFilter from  '../../components/bookfilter/BookFilter.jsx';
import  '../../components/Table/Table.css';
import './BookSection.css';
import PopUp from '../../components/popup-table/PopUp2.jsx';
import FormEditBook from '../../components/formeditbook/formeditbook.jsx';
const BookSection = () => {

  const [PopUpEditBook,setPopupEditBook]=useState(false);
  const [PopUpAddBook,setPopupAddBook]=useState(false);
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
        <button className="button-table"onClick={() => console.log('Eliminar', row)}>
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
        <button className="button-table" onClick={() => console.log('Ver detalle', row)}>
          <img src={DetailsIcon} alt="Detalles" />
        </button>
      )
    }
  ];

  return (
    <>
    
    <section className='booksection'>
      <BookFilter/>
      <div className="bookinf">
        <div className="book-title">
              <h2>Listado de libros</h2>
          </div>
        <Table columns={columns} data={books}>

            {PopUpEditBook && (
              <PopUp
                title="Editar libro"
                className="popup-container"
                onClick={() => setPopupEditBook(false)}
              > 
              <FormEditBook></FormEditBook>   
              </PopUp>
            )}
  
        </Table>
        

      <div>
        <div className="listbtns">
                  <div>
                    
                    <Btn 
                    className="primary-btn"
                    text="Agregar libro" 
                    onClick={()=> setPopupAddBook(true)}
                    icon={<img src={plusIcon} alt="Añadir" />} 
                    
                    
                  />  
                  {PopUpAddBook && (
                  <PopUp
                  title="Agregar libro"
                  className="popup-container"
                  onClick={() => console.log(setPopupAddBook(false))}
                  >
                       <FormEditBook />

                  </PopUp>
                  )}
               
                  </div>

                  <div>
                    <Btn 
                    className="primary-btn"
                      text="Duplicar libro" 
                      icon={<img src={plusIcon} alt="duplicar"
                      />} 
                    />
                  </div>
                </div>
              </div>
      </div>
   
    </section>
  
   
    
    </>
  );
};

export default BookSection;
