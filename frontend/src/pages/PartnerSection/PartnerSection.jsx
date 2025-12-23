import GenericSection from '../../components/generic/GenericSection/GenericSection.jsx';
import PartnerFilter from '../../components/filter/partner/PartnerFilter.jsx';
import { useEffect, useState } from 'react';
import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import FormEditPartner from '../../components/partner-components/formeditpartner/FormEditPartner.jsx';
import DetailsIcon from '../../assets/img/details-icon.svg';
import PlusIcon from '../../assets/img/plus-icon.svg';
import PopUpDelete from '../../components/common/deletebtnComponent/PopUpDelete.jsx';
import ShowDetails from '../../components/generic/ShowDetails/ShowDetails.jsx';
import { DetailPartner } from '../../data/showdetails/partner.js';
import Btn from '../../components/common/btn/Btn.jsx';
import PrintIcon from '../../assets/img/print-icon.svg';
import './PartnerSection.css';
import PrintPartnerPopup from '../../components/partner-components/printpartnerpopup/PrintPartnerPopup.jsx';
import PartnersBooks from '../../components/partner-components/partnersbooks/PartnersBooks.jsx';
import ReaderIcon from '../../assets/img/reader.svg';
import FormAddPartner from '../../components/partner-components/formaddpartner/FormAddPartner.jsx';
import { useEntityManagerAPI } from '../../hooks/useEntityManagerAPI.js';
export default function PartnerSection() {

  const { items, getItems, createItem, updateItem, deleteItem } = useEntityManagerAPI("partners");
  const [selectedItem, setSelectedItem] = useState(null);
  const [PopUpDeletePartner, setPopUpDelete] = useState(false);
  const [PopUpEdit, setPopupEdit] = useState(false);

  const [printListPopup, setPrintListPopup] = useState(false);
  const [PopUpBooksPartners, setPopUpBooksPartners] = useState(false);
  const [DetailData, setDetailData] = useState(null);
  const [PopUpDetail, setPopUpDetail] = useState(false);
  const [PopUpAdd, setPopUpAdd] = useState(false);

  /*function getItemsDetails(item) {
    let ItemData = getItem(item.id);
    setDetailData({ ...ItemData }); // <-- esto crea nueva referencia

  }*/

  const [formData, setFormData] = useState({
       unpaidFees: "",
        pendingBooks: "",
        isActive: "all",
  });


   useEffect(() => {
  const filters = Object.fromEntries(
    Object.entries(formData).filter(([_, v]) => v !== "")
  );

  const delay = setTimeout(() => {
    getItems(filters);
  }, 300);

  return () => clearTimeout(delay);
}, [formData]);

   const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  


  const columns = [
    { header: 'Numero de socio', accessor: 'id' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Apellido', accessor: 'surname' },

{ header: 'Estado', 
  accessor: 'isActive', 
  render: (_, row) => { const value = row.isActive; 
    if (value === 1 || value === true) return 'Activo'; 
    if (value === 2 || value === false || value === 0) return 'Inactivo';
     return `Valor desconocido: ${value}`; } },
    {
      header: 'Editar',
      accessor: 'edit',
      className: "action-buttons",
      render: (_, row) => (
        <button className="button-table"
          onClick={() => {
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
      className: "action-buttons",
      render: (_, row) => (
        <button className="button-table">
          <img src={DetailsIcon} alt="Detalles" onClick={() => {
            setPopUpDetail(true)
            getItemsDetails(row);
          }
          }
          />
        </button>
      )
    }
  ];

  const partnersPopUp = [
    {

      key: 'deletePopup',
      title: 'Borrar socio',
      className: 'delete-size-popup',
      content: (
        <PopUpDelete
          title={"Socio"}
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
      className: 'popup-container add-edit-partner-size',
      content: <FormEditPartner />,
      close: () => setPopupEdit(false),
      condition: PopUpEdit
    },
    {
      key: 'AddPopup',
      title: 'Agregar Socio',
      className: 'popup-container add-edit-partner-size',
      content: <FormAddPartner />,
      close: () => setPopUpAdd(false),
      condition: PopUpAdd
    },
    {
      key: 'detailsPopup',
      title: 'Detalles del socio',
      className: '',

      content: <ShowDetails data={DetailData} detailsData={DetailPartner} isPopup={true} />,
      close: () => setPopUpDetail(false),
      condition: PopUpDetail
    },
    {
      key: 'printListPopup',
      title: 'Imprimir listado de socios',
      className: 'print-partners-size',
      content: <PrintPartnerPopup />,
      close: () => setPrintListPopup(false),
      condition: printListPopup
    },
    {
      key: 'BooksPartnersQuantity',
      title: 'Cantidad de libros y socios',
      classname: 'books-partners-amount-size',
      content: <PartnersBooks />,
      close: () => setPopUpBooksPartners(false),
      condition: PopUpBooksPartners
    }
  ];

  return (
    <>

      <GenericSection title="Listado socios" filters={<PartnerFilter formData={formData} onChange={handleFilterChange} />}
        columns={columns} data={items} popups={partnersPopUp}
        actions={
          <div>
            <div className='partner-buttons'>
              <Btn text="Agregar socio" onClick={() => setPopUpAdd(true)} variant={"primary"} icon={<img src={PlusIcon} />} ></Btn>
              <Btn text="Imprimir socios" onClick={() => setPrintListPopup(true)} variant={"primary"} icon={<img src={PrintIcon} />} ></Btn>
              <Btn icon={<img src={ReaderIcon} />} onClick={() => setPopUpBooksPartners(true)} text={'Libros y socios'} variant={"primary"} />
            </div>
          </div>
        }
      >
      </GenericSection>

    </>
  );
}