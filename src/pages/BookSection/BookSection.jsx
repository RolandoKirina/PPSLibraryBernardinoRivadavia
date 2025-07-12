import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import { Table } from '../../components/table/Table.jsx';
import BookFilter from  '../../components/bookfilter/BookFilter.jsx';
import  '../../components/Table/Table.css';
import './BookSection.css';
const BookSection = () => {

  const books = [
    { id: 1, title: 'El principito', code_inventory:202 },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949 }
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
        <button className="button-table"  onClick={() => console.log('Editar', row)}>
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
        <Table columns={columns} data={books} />
      </div>
       
    </section>
    </>
    
  );
};

export default BookSection;
