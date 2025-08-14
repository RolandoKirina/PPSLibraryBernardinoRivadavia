import './Return.css';
import SearchPartner from '../searchpartner/SearchPartner';
import BackviewBtn from '../../backviewbtn/BackviewBtn';
import UnpaidQuotes from '../unpaidquotes/UnpaidQuotes';
import ShowDetails from '../../generic/ShowDetails/ShowDetails';
import { lendBooksReturnDetails } from '../../../data/loan/LoanDetails';
import { useState } from 'react';
import GenericForm from '../../generic/GenericForm/GenericForm';
import { editPendingQuoteFields } from '../../../data/loan/LoanForms';
import { useEntityManager } from '../../../hooks/useEntityManager';
import { mockBooksLoans } from '../../../data/mocks/loans';
import { Table } from '../../table/Table';
import DetailsIcon from '../../../assets/img/details-icon.svg';
import ReturnIcon from '../../../assets/img/return-icon.svg';
import ReneweIcon from '../../../assets/img/renewe-icon.svg';
import PopUp from '../../popup-table/PopUp2';
import SaveIcon from '../../../assets/img/save-icon.svg';
import ConfirmMessage from '../../confirmMessage/ConfirmMessage';
import Btn from '../../btn/Btn';

export default function Return() {
    //cuando se usan los inputs de partner se filtran las devoluciones y se pueden renovar, devolver o devolver todos

    const [confirmReturnPopup, setConfirmReturnPopup] = useState(false);
    const [confirmRenewePopup, setConfirmRenewePopup] = useState(false);
    const [confirmReturnAllPopup, setConfirmReturnAllPopup] = useState(false);
    const [confirmSaveChangesPopup, setConfirmSaveChangesPopup] = useState(false);
    const [selected, setSelected] = useState(null);

    const [popupView, setPopupView] = useState("default");
    const [partnerData, setPartnerData] = useState({
    partnerName: '',
    partnerNumber: '',
    });

  const { items, getItem, createItem, updateItem, deleteItem } = useEntityManager(mockBooksLoans, 'booksLoans');

  const returnBooksPopups = [
                  {
                      key: 'confirmReturnPopup',
                      title: 'Confirmar devolucion',
                      className: '',
                      content: <ConfirmMessage text={'¿Esta seguro de realizar la devolución?'} closePopup={() => setConfirmReturnPopup(false)} onConfirm={() => {
                        deleteItem(selected.id)
                        setConfirmReturnPopup(false)
                      }}/>,
                      close: () => setConfirmReturnPopup(false),
                      condition: confirmReturnPopup
                  },
                  {
                      key: 'confirmRenewePopup',
                      title: 'Confirmar Renovación',
                      className: '',
                      content: <ConfirmMessage text={'¿Esta seguro de realizar la renovación?'} closePopup={() => setConfirmRenewePopup(false)} onConfirm={() => {
                        updateItem(selected.id, {
                            ...selected,
                            renewes: (Number(selected.renewes) + 1)
                        })
                        setConfirmRenewePopup(false)
                      }}/>,
                      close: () => setConfirmRenewePopup(false),
                      condition: confirmRenewePopup
                  },
                  {
                      key: 'confirmReturnAllPopup',
                      title: 'Confirmar Devolución de todos los libros',
                      className: 'return-all-size',
                      content: <ConfirmMessage text={'¿Esta seguro de devolver todos los libros?'} closePopup={() => setConfirmReturnAllPopup(false)} onConfirm={() => {
                        items.map(item => {
                            deleteItem(item.id)
                        })
                        setConfirmReturnAllPopup(false)
                      }}/>,
                      close: () => setConfirmReturnAllPopup(false),
                      condition: confirmReturnAllPopup
                  },
                  {
                      key: 'confirmSaveChangesPopup',
                      title: 'Confirmar Cambios',
                      className: '',
                      content: <ConfirmMessage text={'¿Esta seguro de confirmar los cambios?'} closePopup={() => setConfirmSaveChangesPopup(false)} onConfirm={() => {

                      }}/>,
                      close: () => setConfirmSaveChangesPopup(false),
                      condition: confirmSaveChangesPopup
                  }
      ];

  const columnsReturnForm = [
          { header: 'Código del libro', accessor: 'bookCode' },
          { header: 'Título', accessor: 'bookTitle' },
          { header: 'Renovado', accessor: 'renewes' },
          {
              header: 'Detalles',
              accessor: 'details',
              render: (_, row) => (
              <button type='button' className="button-table" onClick={() => {
                setPopupView('details')
                setSelected(row)
                }}>
                  <img src={DetailsIcon} alt="Detalles" />
              </button>
              )
          },
          {
              header: 'Devolver',
              accessor: 'return',
              render: (_, row) => (
              <button type='button' className="button-table" onClick={() => {
                setConfirmReturnPopup(true)
                setSelected(row)
                }}>
                  <img src={ReturnIcon} alt="Devolver" />
              </button>
              )
          },
          {
              header: 'Renovar',
              accessor: 'renewe',
              render: (_, row) => (
              <button type='button' className="button-table" onClick={() => {
                setConfirmRenewePopup(true)
                setSelected(row)
                }}>
                  <img src={ReneweIcon} alt="Renovar" />
              </button>
              )
          }
      ];

    const handleExtraData = (newData) => {
    setPartnerData(prev => {
        const updated = { ...prev, ...newData };
        console.log("devolucion actualizado con datos externos:", updated);
        return updated;
    });
    };

    return (
        <>
            <div className='return-form-content'>
                {popupView === 'default' && (
                    <>
                    <form>
                        <SearchPartner menu={setPopupView} partnerData={
                            {
                            partnerName: partnerData.partnerName,
                            partnerNumber: partnerData.partnerNumber,
                            memoSearch: partnerData.memoSearch 
                            }
                        } onDataChange={handleExtraData}/>

                        <div className='lend-books-container'>
                            <h2 className='lend-books-title'>Libros Prestados</h2>
            
                            <Table columns={columnsReturnForm} data={items}/>

                            <div className='add-book-to-lend'>
                                <Btn text={'Devolver todos'} onClick={() => setConfirmReturnAllPopup(true)} /> 
                            </div>

                            <div className='save-changes-lend-books'>
                                <Btn text={'Guardar'} onClick={() => {
                                    setConfirmSaveChangesPopup(true)
                
                                    }} icon={<img src={SaveIcon} alt='saveIconButton'/> }/>
                            </div>

                            {returnBooksPopups.map(({ condition, title, className, content, close, variant }, idx) => (
                                                    condition && (
                                                        <PopUp key={idx} title={title} className={className || ''} onClick={close} {...(variant === 'delete' && { variant: 'delete' })}>
                                                        {content}
                                                        </PopUp>
                                                    )
                            ))}
                        </div>
                    </form> 
                    </>


                    
                )}
                {popupView === 'details' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <ShowDetails insidePopup={true} titleText={'Detalles de libro préstado'} isPopup={false} data={selected} detailsData={lendBooksReturnDetails} />
                    </>
                )}
                {popupView === 'unpaidQuotes' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <UnpaidQuotes changeView={setPopupView}/>
                    </>
                )}
                {popupView === 'editUnpaidQuote' && (
                    <>
                        <BackviewBtn menu={'unpaidQuotes'} changeView={setPopupView} />
                        <GenericForm title={'Editar cuota pendiente'} fields={editPendingQuoteFields} onSubmit={(data) => console.log('Formulario enviado:', data)} />
                    </>
                )}
                    
                </div> 
        </>
    )
}