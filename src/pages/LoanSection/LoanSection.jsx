import LoanFilter from "../../components/loanfilter/LoanFilter";
import './LoanSection.css';
import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import { Table } from "../../components/table/Table";
import LoanButtons from "../../components/loanbuttons/LoanButtons";

export default function LoanSection() {
    
    const loans = [
    { id: 1, reader_name: 'Carolina Gómez', title: 'La sombra del viento' },
    { id: 2, reader_name: 'Martín Rodríguez', title: 'El Principito' },
    { id: 3, reader_name: 'Lucía Méndez', title: 'Rayuela' },
    { id: 4, reader_name: 'Gabriel Pérez', title: 'Cien años de soledad' },
    { id: 5, reader_name: 'Ana Torres', title: 'Fahrenheit 451' }
    ];

    const columns = [
    { header: 'Nombre Lector', accessor: 'reader_name' },
    { header: 'Titulo', accessor: 'title' },
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
            <main>
               <LoanFilter />
               <section className="loan-section">
                <div className="loan-title">
                    <h2>Listado de Prestamos</h2>
                </div>
                <div className="loans">
                    <Table  columns={columns} data={loans}>
                        <LoanButtons />
                    </Table>
                    
                </div>
               </section>
            </main>
        
        </>

    );
}