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
import { FeesDetail } from '../../data/showdetails/FeesDetail.js';
import GenericForm from '../../components/generic/GenericForm/GenericForm.jsx';
import { editnewFeesForm, addnewFeesForm } from '../../data/forms/FeesForms.js';
import FeesBetweenDates from '../../components/fees-components/feesbetweendates/FeesBetweenDates.jsx';
import PopUpDelete from '../../components/common/deletebtnComponent/PopUpDelete.jsx';
import EditFees from '../../components/fees-components/formEditFee/EditFees.jsx';
import { useAuth } from '../../auth/AuthContext.jsx';
import { roles } from '../../auth/roles.js';
import ConfirmMessage from '../../components/common/confirmMessage/ConfirmMessage.jsx';
import UnpaidFees from '../../components/loan-components/unpaidfees/UnpaidFees.jsx';

export const FeeSection = () => {
  const chunkSize = 100;
  const rowsPerPage = 5;
  const [offsetActual, setOffsetActual] = useState(0);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);

  const { auth } = useAuth();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [PopUpEdit, setPopupEdit] = useState(false);
  const [PopUpAdd, setPopupAdd] = useState(false);
  const [popupdelete, setPopUpDelete] = useState(false);
  const [PopUpDetail, setPopUpDetail] = useState(false);
  const [PopUpFeesBetweenDates, setPopUpFeesBetweenDates] = useState(false);
  const [PopupUnpaidFees, setPopupUnpaidFees] = useState(false);

  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const { items, loading, totalItems, getItems, getItem, createItem, updateItem, deleteItem } = useEntityManagerAPI("fees");

  const [formData, setFormData] = useState({
    unpaidfees: false,
    partnerNumber: "",
    name: "",
    surname: "",
    paymentdate: "",
    feeStatus: "",
    creationStartDate: "",
    creationEndDate: "",
    periodStartDate: "",
    periodEndDate: ""
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const activeFilters = Object.fromEntries(
        Object.entries(formData).filter(([_, v]) => v !== "" && v !== null)
      );

      setOffsetActual(0);
      setResetPageTrigger(prev => prev + 1);

      getItems({
        ...activeFilters,
        sortBy: 'id',
        direction: 'asc',
        limit: chunkSize,
        offset: 0
      });
    }, 500);

    return () => clearTimeout(delay);
  }, [formData]);



  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    if (items.length < totalItems && lastItemIndex > items.length) {
      const newOffset = items.length;
      await getItems({ ...formData, sortBy: 'id', direction: 'asc', limit: chunkSize, offset: newOffset }, true);
      setOffsetActual(newOffset);
    }
  }

  async function refreshFees() {
    await getItems({ ...formData, sortBy: 'id', direction: 'asc', limit: chunkSize, offset: 0 }, true);
    setPopupEdit(false);
  }

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

  async function handleAddItem(data) {
    try {

      const res = await fetch("http://localhost:4000/api/v1/fees/generate-unpaid-fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ msg: "Error inesperado del servidor" }));
        setError(errorData.message);
        return;
      }
      else {
        setError(null);
        setSuccessMessage("Cuotas generadas exitosamente");

        setTimeout(() => {
          setSuccessMessage("");
          setPopupAdd(false);
        }, 3000);
      }

      await getItems();

    } catch (err) {
      console.error("Error al crear cuota", err);
      setError("No se pudo conectar con el servidor");
    }
  }

  async function changeFeeState(id) {
    try {
      const res = await fetch(`http://localhost:4000/api/v1/fees/change-state/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        }
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ msg: "Error al cambiar el estado de la cuota" }));
        setError(errorData.message || "Error al actualizar");
        return;
      } else {
        setError(null);
        setSuccessMessage("Cuota actualizada exitosamente");

        setTimeout(() => {
          setSuccessMessage("");
          setPopUpDelete(false);
        }, (3000));
      }

      await getItems({
        ...formData,
        sortBy: 'id',
        direction: 'asc',
        limit: chunkSize,
        offset: 0
      });

    } catch (err) {
      console.error("Error en changeFeeState:", err);
      setError("No se pudo conectar con el servidor");
    }
  }

  let columns = [];

  if (auth.role === roles.admin) {
    columns = [
      {
        header: 'Socio',
        accessor: 'name',
        render: (value, row) => `${value} (N° ${row.partnerNumber})`
      },
      {
        header: 'Cuotas impagas',
        accessor: 'unpaidFees',
        render: (value, row) => (
          <button
            className="button-link"
            onClick={() => {
              setSelectedItem(null);
              setPopupUnpaidFees(true);
            }}
          >
            {value} {value === 1 ? 'cuota impaga' : 'cuotas impagas'}
          </button>
        )
      },
      {
        header: 'Periodo',
        accessor: 'month',
        render: (_, row) => `${String(row.month).padStart(2, '0')}/${row.year}`
      },
      {
        header: 'Importe',
        accessor: 'amount',
        render: (value) => `$${value}`
      },
      {
        header: 'Pagada',
        accessor: 'paid',
        render: (value) => value ? '✅ Paga' : '❌ Impaga',
      },
      {
        header: 'Eliminar',
        accessor: 'status',
        className: "action-buttons",
        render: (value, row) => (
          <button
            className="button-table"
            title={value ? "Deshabilitar cuota" : "Habilitar cuota"}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedId(row.feeid || row.id);
              setPopUpDelete(true);
            }}>
            <img
              src={DeleteIcon}
              alt="Estado"
              style={{ filter: value ? 'none' : 'grayscale(1) opacity(0.5)' }}
            />
          </button>
        )
      },
      {
        header: 'Editar',
        accessor: 'edit',
        className: "action-buttons",
        render: (_, row) => (
          <button
            className="button-table"
            onClick={(e) => {
              e.stopPropagation();
              setPopupEdit(true);
              setSelectedItem(row);
            }}
          >
            <img src={EditIcon} alt="Editar" />
          </button>
        )
      },
      {
        header: 'Detalle',
        accessor: 'details',
        className: "action-buttons",
        render: (_, row) => (
          <button className="button-table"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedItem(row);
              setPopUpDetail(true);
            }}
          >
            <img src={DetailsIcon} alt="Detalles" />
          </button>
        )
      }
    ];
  }
  else if (auth.role === roles.partner) {
    columns = [
      { header: 'Numero de cuota', accessor: 'feeid' },
      { header: 'Estado cuota', accessor: 'statusLabel' },
      { header: 'valor', accessor: 'amount' },
      {
        header: "Fecha de pago",
        accessor: 'date_of_paid',
        render: (value) => formatDate(value)
      },
      {
        header: 'Pagada',
        accessor: 'paid',
        render: (value) => value ? '✅ Paga' : '❌ Impaga',
      },
    ];
  }

  const feesPopUp = [
    {
      key: 'deletePopup',
      title: 'Borrar Cuota',
      className: 'delete-size-popup',
      content: <ConfirmMessage
        text={'¿Quiere cambiar el estado de la cuota?'}
        closePopup={() => setPopUpDelete(false)}
        onConfirm={() => changeFeeState(selectedId)}
        successMessage={successMessage}
      />,

      close: () => setPopUpDelete(false),
      condition: popupdelete,

    },
    {
      key: 'editPopup',
      title: 'Editar Cuota',
      className: 'feespopup',
      content: <EditFees title={'Editar cuota'} selectedFee={selectedItem} refresh={refreshFees}
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
      content: <GenericForm title={'Generar cuotas nuevas'} error={error} successMessage={successMessage}
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
      key: 'FeesBetweenDates',
      title: 'Cuotas entre fechas',
      content: <FeesBetweenDates />,
      className: 'print-partners-size',
      close: () => setPopUpFeesBetweenDates(false),
      condition: PopUpFeesBetweenDates
    },
    {
      key: 'unpaidFees',
      title: 'Cuotas Impagas',
      classname: 'books-partners-amount-size',
      content: <UnpaidFees item={selectedItem} section="Fee" />,
      close: () => setPopupUnpaidFees(false),
      condition: PopupUnpaidFees
    },
  ]

  let adminFeeActions = null;
  let title = 'Listado de tus cuotas';

  if (auth.role === roles.admin) {
    title = 'Listado de cuotas';

    adminFeeActions = <div className='fees-actions'>
      <Btn text="Generar Cuotas" variant="primary" onClick={() => setPopupAdd(true)}></Btn>
      <Btn text="Cuotas entre fechas" variant="primary" onClick={() => setPopUpFeesBetweenDates(true)}></Btn>
      <Btn text="Ingresar Fecha de pago" variant="primary" onClick={() => setPopUpFeesBetweenDates(true)}></Btn>
      <Btn text="Cuotas Impagas" variant="primary" onClick={() => setPopupUnpaidFees(true)}></Btn>
    </div>;
  }

  return (
    <>
      <GenericSection title={title} totalItems={totalItems} showCount={true} handleChangePage={handleChangePage} loading={loading} resetPageTrigger={resetPageTrigger} showCount={true} filters={
        <FeeFilter formData={formData ||
          { partnerWithUnpaidFees: false, name: "", surname: "", PaymentDate: "", feeStatus: "" }}
          onChange={handleFilterChange} />}

        columns={columns} data={items} popups={feesPopUp}
        actions={
          adminFeeActions
        }

      ></GenericSection>

    </>
  );
}


export default FeeSection;