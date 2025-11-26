import './FeeSection.css';
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
import {editnewFeesForm , addnewFeesForm} from '../../data/forms/FeesForms.js';
import FeesBetweenDates from '../../components/fees-components/feesbetweendates/FeesBetweenDates.jsx';
import PopUpDelete from '../../components/common/deletebtnComponent/PopUpDelete.jsx';
import EditFees from '../../components/fees-components/formEditFee/EditFees.jsx';


export const FeeSection = () => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedId, setSelectedId]=useState(null);
  const [PopUpEdit, setPopupEdit] = useState(false);
  const [PopUpAdd, setPopupAdd] = useState(false);
  const [popupdelete, setPopUpDelete] = useState(false);
  const [PopUpDetail, setPopUpDetail] = useState(false);
  const [PopUpPaidFees, setPopUpPaidFees] = useState(false);
  const [PopUpFeesBetweenDates, setPopUpFeesBetweenDates] = useState(false);
  const [error, setError] = useState(false);
  const { items, getItems, getItem, createItem, updateItem, deleteItem } = useEntityManagerAPI("fees");

  const [formData, setFormData] = useState({
      unpaidfees: false,
      partnerNumber: "",
      name: "",
      surname: "",
      paymentdate: "",
    });
    
    async function handleUpdateItem(data) {
        try {
            const res = await updateItem(selectedItem.feeid, data);
            console.log(res)
            setPopupEdit(false);

             await getItems();
        }
        catch (err) {
            console.error(err);
        }
    }

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

    const formatDate = (value) => {

      if (!value || value === "No pagada" || value === "null" || value === "") {
        return "—";
      }

      const fecha = new Date(`${value}T00:00:00`);

      if (isNaN(fecha)) return "—";

      return fecha.toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    };

    const formattedFees = items.map(fee => ({
      ...fee,
      paid: fee.paid ? '✅ Pagada' : '❌ Impaga',
   }));

    async function handleAddItem(data) {
        try {
            const res = await fetch("http://localhost:4000/api/v1/fees/generate-unpaid-fees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
            });
           
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({ msg: "Error inesperado del servidor" }));
            setError(errorData.message); 
            return;
          }
          else{
            setError(null)
          }
            setPopupAdd(false);
            await getItems();

        } catch (err) {
            console.error("Error al crear cuota", err);
        }
    }


  const columns = [
    { header: 'Numero de cuota', accessor: 'feeid' },
    { header: 'Nombre de socio',  accessor: 'name'},
    { header: 'valor', accessor: 'amount' },
    {header: 'Numero de socio', accessor: 'partnerNumber'},
    {header: "Fecha de pago", 
      accessor: 'date_of_paid',   
       render: (value) => formatDate(value)
    },
      {
      header: 'Pagada',
      accessor: 'paid',
      render: (value) => value ? '✅ Paga' : '❌ Impaga',
    },
    {
      header: 'Borrar',
      accessor: 'delete',
      className: "action-buttons",
      render: (_, row) => (
        <button className="button-table"
          onClick={() => {
               setSelectedId(row.feeid);
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
          onClick={() => { () =>
            console.log(row)
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

  const feesPopUp = [
    {
      key: 'deletePopup',
      title: 'Borrar Cuota',
      className: 'delete-size-popup',
      content: <PopUpDelete
        title={"item"}
        onConfirm={() => deleteItem(selectedId)} 
        closePopup={() => setPopUpDelete(false)}
        refresh={() => getItems()} />,
        close: () => setPopUpDelete(false),
        condition: popupdelete,
    },
    {
      key: 'editPopup',
      title: 'Editar Cuota',
      className: 'feespopup',
      content: <EditFees title={'Editar cuota'} selectedFee={selectedItem}
      itemSelected={selectedItem}
      fields={editnewFeesForm} 
      className="editfees" />,
      close: () => setPopupEdit(false),
      condition: PopUpEdit
    },
    {
      key: 'AddPopup',
      title: 'Generar Cuotas',
      className: 'popup-container',
      content: <GenericForm title={'Generar cuotas nuevas'} error={error}
      onSubmit={handleAddItem}
      fields={addnewFeesForm} className="addfees" />,
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
              <Btn text="Modificaciones en cuotas" variant="primary" onClick={() => alert("realizar")}></Btn>

            </div>
          }

      ></GenericSection>

    </>
  );
}


export default FeeSection;