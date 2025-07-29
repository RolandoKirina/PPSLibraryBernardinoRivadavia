import './PendientBooks.css';
import { Table } from '../../table/Table';
import { useState } from 'react';
import DetailsIcon from '../../../assets/img/details-icon.svg';

export default function PendientBooks() {
    const [popupView, setPopupView] = useState("default");

    const pendientBooks = [
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
     ];
    
        return (
            <>
                <div className='pendient-books-container'>
                    <div className='title'>
                        <h2>Libros pendientes</h2>
                    </div>
                    <div className='content'>
                        <Table columns={columns} data={pendientBooks} />
                    </div>
                    
                </div>
            </>
        )
}