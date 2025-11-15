import FeeFilter from '../../components/filter/feefilter/FeeFilter.jsx';
import { useEntityManagerAPI } from '../../hooks/useEntityManagerAPI.js';

import { useState, useEffect } from 'react';

import GenericSection from '../../components/generic/GenericSection/GenericSection.jsx';

import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import ShowDetails from '../../components/generic/ShowDetails/ShowDetails.jsx';
import Btn from '../../components/common/btn/Btn.jsx';
import CardFees from '../../components/fees-components/CardFees/CardFees.jsx';
import { FeesDetail } from '../../data/showdetails/FeesDetail.js';
import GenericForm from '../../components/generic/GenericForm/GenericForm.jsx';
import editnewFeesForm from '../../data/forms/FeesForms.js';

import FeesBetweenDates from '../../components/fees-components/feesbetweendates/FeesBetweenDates.jsx';
import PopUpDelete from '../../components/common/deletebtnComponent/PopUpDelete.jsx';
import './FeeSection.css';

export const FeeSection = () => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedId, setSelectedId]=useState(null);
  const [PopUpEdit, setPopupEdit] = useState(false);
  const [PopUpAdd, setPopupAdd] = useState(false);
  const [popupdelete, setPopUpDelete] = useState(false);
  const [PopUpDetail, setPopUpDetail] = useState(false);
  const [PopUpPaidFees, setPopUpPaidFees] = useState(false);
  const [PopUpFeesBetweenDates, setPopUpFeesBetweenDates] = useState(false);

  const { items, getItems, getItem, createItem, updateItem, deleteItem } = useEntityManagerAPI("fees");

  const [formData, setFormData] = useState({
      unpaidfees: false,
      partnerNumber: "",
      name: "",
      surname: "",
      paymentdate: null,
    });

     const handleFilterChange = (e) => {
      const { name, value } = e.target;
      const updated = { ...formData, [name]: value };
      setFormData(updated);
    };

      useEffect(() => {
  const filters = Object.fromEntries(
    Object.entries(formData).filter(([_, v]) => v !== "")
  );

  const delay = setTimeout(() => {
    if (Object.keys(filters).length > 0) {
      getItems(filters);
    }
  }, 300);

  return () => clearTimeout(delay);
}, [formData]);



   const formattedFees = items.map(fee => ({
      ...fee,
      paid: fee.paid ? '✅ Pagada' : '❌ Impaga',
   }));


  const columns = [
    { header: 'Numero de cuota', accessor: 'feeid' },
    { header: 'Nombre de socio',  accessor: 'name'},
    { header: 'valor', accessor: 'amount' },
    {header: 'Numero de socio', accessor: 'partnerNumber'},
      {
      header: 'Pagada',
      accessor: 'paid',
      render: (value) => value ? '✅ Pagada' : '❌ Impaga',
    },
    {
      header: 'Borrar',
      accessor: 'delete',
      className: "action-buttons",
      render: (_, row) => (
        <button className="button-table"
          onClick={() => {
               setSelectedId(row.feeId);
               setPopUpDelete(true)
               
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
           () => setPopUpDelete(row)
            setPopupEdit(true)
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
          <img src={DetailsIcon} alt="Detalles" 
                   onClick={() => {
                    setSelectedItem(row)
                    setPopUpDetail(true)
             }}
 />
        </button>
      )
    }
  ];

  const paidfeescolumns = [
    { header: 'Cuotas pagadas', accessor: 'numberofFee' },
    { header: 'Cuotas impagas', accessor: 'partnerName' },
    { header: 'Cuotas nuevas', accessor: 'paidfees' },
  ];

  const feesPopUp = [
    {
      key: 'deletePopup',
      title: 'Borrar Cuota',
      className: 'delete-size-popup',
      content: <PopUpDelete
        title={"item"}
        onConfirm={() => deleteItem(selectedItem.feeid)} 
        closePopup={() => setPopUpDelete(false)}
        refresh={() => getItems()} />,
        close: () => setPopUpDelete(false),
        condition: popupdelete,
    },
    {
      key: 'editPopup',
      title: 'Editar Cuota',
      className: 'feespopup',
      content: <GenericForm title={'Editar cuota nueva'} fields={editnewFeesForm} className="editfees" />,
      close: () => setPopupEdit(false),
      condition: PopUpEdit
    },
    {
      key: 'AddPopup',
      title: 'Agregar Cuotas',
      className: 'popup-container',
      content: <GenericForm title={'Añadir cuota nueva'} fields={editnewFeesForm} className="addfees" />,
      close: () => setPopupAdd(false),
      condition: PopUpAdd
    },
    {
      key: 'SeeDetail',
      title: 'Ver detalle',
      content: <ShowDetails data={selectedItem} detailsData={FeesDetail} isPopup={true} />,
      close: () => setPopUpDetail(false),
      condition: PopUpDetail
    },
    {
      key: 'PaidFees',
      title: 'Cuotas pagas',
      content: <CardFees></CardFees>,
      close: () => setPopUpPaidFees(false),
      condition: PopUpPaidFees
    },
    {
      key: 'FeesBetweenDates',
      title: 'Cuotas entre fechas',
      content: <FeesBetweenDates />,
      className: 'print-partners-size',
      close: () => setPopUpFeesBetweenDates(false),
      condition: PopUpFeesBetweenDates
    }
  ]

  return (
    <>
      <GenericSection title="Listado de cuotas" filters={
        <FeeFilter formData={formData || 
          { partnerWithUnpaidFees: false, name: "", surname: "", PaymentDate: "" }} 
          onChange={handleFilterChange} />}

        columns={columns} data={items} popups={feesPopUp}
        actions={
          <div className='fees-actions'>
            <Btn text="Cuotas pagas" variant="primary" onClick={() => setPopUpPaidFees(true)}></Btn>
            <Btn text="Agregar cuota" variant="primary" onClick={() => setPopupAdd(true)}></Btn>
            <Btn text="Cuotas entre fechas" variant="primary" onClick={() => setPopUpFeesBetweenDates(true)}></Btn>
          </div>
        }

      ></GenericSection>

    </>
  );
}


export default FeeSection;