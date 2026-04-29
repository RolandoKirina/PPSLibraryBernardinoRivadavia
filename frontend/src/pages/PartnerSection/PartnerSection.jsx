import GenericSection from '../../components/generic/GenericSection/GenericSection.jsx';
import PartnerFilter from '../../components/filter/partner/PartnerFilter.jsx';
import DeleteIcon from '../../assets/img/delete-icon.svg';
import { useEffect, useState } from 'react';
import EditIcon from '../../assets/img/edit-icon.svg';
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
import FormEditPartner from '../../components/partner-components/formeditpartner/FormEditPartner.jsx';
import { useEntityManagerAPI } from '../../hooks/useEntityManagerAPI.js';
import { useAuth } from '../../auth/AuthContext.jsx';
import PendingBooks from '../../components/loan-components/pendingbooks/PendingBooks.jsx';
import UnpaidFees from '../../components/loan-components/unpaidfees/UnpaidFees.jsx';
export default function PartnerSection() {
  const { auth } = useAuth();
  const chunkSize = 100;
  const rowsPerPage = 5;
  const [offsetActual, setOffsetActual] = useState(0);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);

  const { items, loading, totalItems, getItems, createItem, updateItem, deleteItem } = useEntityManagerAPI("partners");
  const [selectedItem, setSelectedItem] = useState(null);
  const [PopUpDeletePartner, setPopUpDelete] = useState(false);
  const [PopUpEdit, setPopupEdit] = useState(false);
  const [printListPopup, setPrintListPopup] = useState(false);
  const [PopUpBooksPartners, setPopUpBooksPartners] = useState(false);
  const [PopUpDetail, setPopUpDetail] = useState(false);
  const [PopUpAdd, setPopUpAdd] = useState(false);
  const [filters, setFilters] = useState({});
  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [maritalStatuses, setMaritalStatuses] = useState([]);
  const [PopUpUnpaidFees, setPopupUnpaidFees] = useState(false);
  const [PopUpPendingBooks, setPopupPendingBooks] = useState(false);


  const [formData, setFormData] = useState({
    unpaidFees: "",
    pendingBooks: "",
    isActive: "all",
    partnerNumber: "",
    name: "",
    surname: "",
    sortBy: "name",
    direction: "asc"
  });

  useEffect(() => {
    async function loadCatalogs() {
      try {
        const fetchOptions = {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}` // Asegúrate de que 'auth.token' esté disponible
          }
        };

        const [catRes, stateRes, maritalRes] = await Promise.all([
          fetch("http://localhost:4000/api/v1/partner-categories", fetchOptions),
          fetch("http://localhost:4000/api/v1/state-partners", fetchOptions),
          fetch("http://localhost:4000/api/v1/marital-statuses", fetchOptions),
        ]);

        const catJson = await catRes.json();
        const stateJson = await stateRes.json();
        const maritalJson = await maritalRes.json();

        setCategories(catJson.rows);
        setStates(stateJson);
        setMaritalStatuses(maritalJson);

      } catch (err) {
        console.error("Error cargando catálogos", err);
      }
    }

    loadCatalogs();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      const activeFilters = Object.fromEntries(
        Object.entries(formData).filter(([_, v]) => v !== "")
      );

      setFilters(activeFilters);

      setOffsetActual(0);
      setResetPageTrigger(prev => prev + 1);

      getItems({
        ...activeFilters,
        sortBy: formData.sortBy,      
        direction: formData.direction,
        limit: chunkSize,
        offset: 0
      });
    }, 500);

    return () => clearTimeout(delay);
  }, [formData]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    let parsedValue = value;

    if (["idState", "unpaidFees", "pendingBooks"].includes(name)) {
      parsedValue = value === "" ? "" : Number(value);
    }

    const updated = { ...formData, [name]: parsedValue };
    setFormData(updated);
  };

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    if (items.length < totalItems && lastItemIndex > items.length) {
      const newOffset = items.length;
      await getItems({ ...formData, sortBy: 'id', direction: 'asc', limit: chunkSize, offset: newOffset }, true);
      setOffsetActual(newOffset);
    }
  }
  const columns = [
    { header: 'Numero de socio', accessor: 'partnerNumber' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Apellido', accessor: 'surname' },
    {
      header: 'Cuotas impagas',
      accessor: 'unpaidFees',
      render: (value, row) => (
        <button
          className="button-link" 
          onClick={() => {
            setSelectedItem(row);
            setPopupUnpaidFees(true);
          }}
        >
          {value} Cuotas Impagas
        </button>
      )
    },
    {
      header: 'Libros pendientes',
      accessor: 'pendingBooks',
      render: (value, row) => (
        <button
          className="button-link"
          onClick={() => {
            setSelectedItem(row);
            setPopupPendingBooks(true); 
          }}
        >
          {value} {value === 1 ? 'libro pendiente' : 'libros pendientes'}
        </button>
      )
    },
    { header: 'Estado', accessor: 'status' },
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
            setSelectedItem(row)
          }
          }
          />
        </button>
      )
    },
    {
      header: 'Borrar',
      accessor: 'delete',
      className: "action-buttons",
      render: (_, row) => (
        <button className="button-table"
          onClick={() => {
            setSelectedItem(row);
            setPopUpDelete(true);
          }}>
          <img src={DeleteIcon} alt="Borrar" />
        </button>
      )
    },
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
      content: <FormEditPartner selectedPartner={selectedItem} />,
      close: () => {
        getItems({
          ...filters,
          sortBy: 'id',
          direction: 'asc',
          limit: chunkSize,
          offset: 0
        });
        setPopupEdit(false);
      },
      condition: PopUpEdit
    },
    {
      key: 'AddPopup',
      title: 'Agregar Socio',
      className: 'popup-container add-edit-partner-size',
      content: <FormAddPartner
        onPartnerCreated={() => {
          getItems({
            ...filters,
            sortBy: 'id',
            direction: 'asc',
            limit: chunkSize,
            offset: 0
          });
          setPopUpAdd(false);
        }}
      />,
      close: () => {
        getItems({
          ...filters,
          sortBy: 'id',
          direction: 'asc',
          limit: chunkSize,
          offset: 0
        });
        setPopUpAdd(false)
      },
      condition: PopUpAdd
    }, 
    {
      key: 'detailsPopup',
      title: 'Detalles del socio',
      className: '',
      content: (
        <ShowDetails data={selectedItem} detailsData={DetailPartner}
          catalogs={{
            categories: categories || [],
            states: states || [],
            maritalStatuses: maritalStatuses || []
          }}
        />
      ),
      close: () => setPopUpDetail(false),
      condition: PopUpDetail
    },
    {
      key: 'printListPopup',
      title: 'Imprimir listado de socios',
      className: 'print-partners-size',
      content: <PrintPartnerPopup categoriespartner={categories} statespartner={states} />,
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
    },
    {
      key: 'unpaidFees',
      title: 'Cuotas Impagas',
      classname: 'unpaid-fees-content',
      content: <UnpaidFees item={selectedItem} section="Partner" />,
      close: () => setPopupUnpaidFees(false),
      condition: PopUpUnpaidFees
    },
    {
      key: 'pendingBooks',
      title: 'Libros pendientes',
      classname: 'books-partners-amount-size',
      content: <PendingBooks />,
      close: () => setPopupPendingBooks(false),
      condition: PopUpPendingBooks
    }
  ];

  return (
    <>
      <GenericSection title="Listado socios" filters={<PartnerFilter formData={formData} onChange={handleFilterChange} />}
        columns={columns} data={items} popups={partnersPopUp} totalItems={totalItems} showCount={true} handleChangePage={handleChangePage} loading={loading} resetPageTrigger={resetPageTrigger}
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