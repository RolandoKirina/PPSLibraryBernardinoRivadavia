import BookFilter from  '../../components/bookfilter/BookFilter.jsx';
import{ useEntityManager} from '../../hooks/useEntityManager.js';

import { useState } from 'react';

import {fees }from '../../data/mocks/fees.js';
import GenericSection from '../../components/generic/GenericSection/GenericSection.jsx';

import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import ShowDetails from '../../components/generic/ShowDetails/ShowDetails.jsx';
export const FeeSection = () => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [PopUpEdit,setPopupEdit]=useState(false);
  const [PopUpAdd,setPopupAdd]=useState(false);
  const [PopUpDelete,setPopUpDelete]=useState(false);

 const [PopUpDetail,setPopUpDetail]=useState(false);

  const {items,getItem,createItem,updateItem,deleteItem} = useEntityManager(fees, "fees");


  
    const columns = [
      { header: 'Numero de cuota', accessor: 'numberofFee' },
      { header: 'Nombre de socio', accessor: 'partnerName' },
      { header: 'Cuotas Pagas', accessor: 'paidfees' },
      {header:'Cuotas Impagas',accessor:'unpaidfees'},
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
            <img src={DetailsIcon} alt="Detalles" onClick={()=> setPopUpDetail(true)}/>
          </button>
        )
      }
    ];


  const feesPopUp=[
      {
          key: 'deletePopup',
          title: 'Borrar Cuota',
          className: 'delete-size-popup',
          content: <PopUpDelete
                    title={"Borrar cuota"}
                    onConfirm={() => {
                      deleteItem(selectedItem.id);
                      setPopUpDelete(false);
                    }}
                        closePopup={() => setPopUpDelete(false)}/>,
          close: () => setPopUpDelete(false),
          condition: PopUpDelete,
          variant: 'delete'
      },
      {
        key: 'editPopup',
        title: 'Editar Cuota',
        className: 'popup-container',
        content: <div/>,
        close: () => setPopupEdit(false),
        condition: PopUpEdit
      },
      {
        key: 'AddPopup',
        title: 'Agregar Cuotas',
        className: 'popup-container',
        content: <div/>,
        close: () => setPopupAdd(false),
        condition: PopUpAdd
      },
    
  
  
   {
        key: 'SeeDetail',
        title: 'Ver detalle',
        content: <ShowDetails isPopup={true} detailsData={<h1>adszxzvx</h1>}/>,
        close: () => setPopUpDetail(false),
        condition: PopUpDetail
      }
    ]

     return (
        <>
        
          <GenericSection title="Listado de cuotas" filters={<BookFilter/>} 
          columns={columns} data={items} popups={feesPopUp}
       
          
          ></GenericSection>
    
    
    
    
    
        
        </>
      );
}


export default FeeSection;