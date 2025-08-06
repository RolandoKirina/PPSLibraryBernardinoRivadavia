
import GenericSection from '../../components/generic/GenericSection/GenericSection.jsx';
import { partners } from '../../data/mocks/partners.js';
import PartnerFilter from '../../components/filter/partner/PartnerFilter.jsx';
import { useState } from 'react';

import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import FormEditPartner  from '../../components/formeditpartner/FormEditPartner.jsx';

import PopUpDelete from '../../components/deletebtnComponent/PopUpDelete.jsx';
import { useEntityManager } from '../../hooks/useEntityManager.js';
import ShowDetails from '../../components/generic/ShowDetails/ShowDetails.jsx';
export default function PartnerSection(){

   {
    /*
    const partners = [{id: 1, partnerName: "Maria", partnerSurname: "Rolando", 
        statePartner: false, DNI: "45324233", telephone: "2494354658", collectionadress:
         "Brown 103",pendingbooks:3,unpaidfees: 2, reasonwithdrawal,category: "regular"}];*/
   } 



    const {items,getItem,createItem,updateItem,deleteItem} = useEntityManager(partners, "partners");


     const [selectedItem, setSelectedItem] = useState(null);
     const [itemsDetailsData, setItemsDetailsData] = useState(null);

    const [PopUpDeletePartner,setPopUpDelete]=useState(false);

   const [PopUpEdit,setPopupEdit]=useState(false);

   const [PopUpDetail,setPopUpDetail]=useState(false);

   const [PopUpAdd,setPopUpAdd]=useState(false);

   function getItemsDetails(item) {
        let ItemData = getItem(item.Id);
        setItemsDetailsData(ItemData);
    }

   const columns = [
    {header: 'Numero de socio', accessor: 'id'},
    {header: 'Nombre',accessor: 'partnerName'},
    {header: 'Apellido', accessor: 'partnerSurname'},
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
          }}>
            <img src={EditIcon} alt="Editar" />
          </button>
        )
        },
        {
          header: 'Ver detalle',
          accessor: 'details',
          render: (_, row) => (
            <button className="button-table">
              <img src={DetailsIcon} alt="Detalles" onClick={()=> {
                 setPopUpDetail(true)   
                 setSelectedItem(row)
                     getItemsDetails(row)
                }
              }
             />
            </button>
          )
        }

   ];

  const partnersPopUp =[
      {
           
          key: 'deletePopup',
          title: 'Borrar ítem',
          className: 'delete-size-popup',
          content: (
            <PopUpDelete
              title={"Ítem"}
              onConfirm={() => {
                deleteItem(selectedItem.id);
                setPopUpDelete(false);
              }}
              closePopup={() => setPopUpDelete(false)}
            />
          ),
          close: () => setPopUpDelete(false),
          condition: PopUpDeletePartner,
           variant: 'delete'


      },
      {
            key: 'editPopup',
            title: 'Editar socio',
            className: 'popup-container',
            content: <FormEditPartner/>,
            close: () => setPopupEdit(false),
            condition: PopUpEdit
      },
      {
            key: 'AddPopup',
            title: 'Agregar Socio',
            className: 'popup-container',
            //content: <FormAddBook/>,
            close: () => setPopUpAdd(false),
            condition: PopUpAdd
      },
      // {
      //       key: 'detailsPopup',
      //       title: 'Detalles del socio',
      //       className: '',
      //       content: <ShowDetails data={itemsDetailsData} detailsData={ItemDetailsInfo} isPopup={true} />,
      //       close: () => setDetailsPopup(false),
      //       condition: detailsPopup
      // },
  ];
        
     return (
        <>
        
          <GenericSection title="Listado socios" filters={<PartnerFilter/>} 
          columns={columns} data={items} popups={partnersPopUp}
            // actions={
            //   <BookButtons  
            //     addBook={() => setPopupAddBook(true)} 
            //     duplicateBook={() => setPopUpDuplicateBook(true)}
            //   />
            // }
          ></GenericSection>
    
          
    
    
    
        
        </>
      );
}