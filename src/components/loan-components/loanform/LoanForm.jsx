import './LoanForm.css';
import SearchPartner from '../searchpartner/SearchPartner';
import LendBooks from '../lendbooks/LendBooks';
import GenericForm from '../../generic/GenericForm/GenericForm';
import { updateLendBookFields } from '../../../data/loan/LoanForms';
import { addLendBookFields } from '../../../data/loan/LoanForms';
import { useState } from 'react';
import Btn from '../../btn/Btn';
import LeftArrow from '../../../assets/img/left-arrow.svg';
import BackviewBtn from '../../backviewbtn/BackviewBtn';
import { lendBooksDetails } from '../../../data/loan/LoanDetails';
import ShowDetails from '../../generic/ShowDetails/ShowDetails';
import UnpaidQuotes from '../unpaidquotes/UnpaidQuotes';
import Reader from '../reader/Reader';
import SearchBooks from '../searchBooks/searchBooks';

export default function LoanForm() {
    const [loanType, setLoanType] = useState('in_room');
    const [popupView, setPopupView] = useState("default");

    return (
        <>      
            <div className='add-loan-form-content'>
                {popupView === 'default' && (
                    <form>
                        <div className='type-loan-title'>
                            <h2>Datos del prestamo</h2>
                        </div>
                        <div className='add-loan-form-inputs'>
                            <div>
                                <h4>Tipo de Prestamo</h4>
                                <div>
                                    <label>
                                    <input type='radio' name='laon-type' value={'in_room'} checked={loanType === 'in_room'}  onChange={(e) => setLoanType(e.target.value)}/>
                                    En sala
                                    </label>
                                    <label>
                                        <input type='radio' name='laon-type' value={'retired'} checked={loanType === 'retired'} onChange={(e) => setLoanType(e.target.value)}/>
                                        Retirado
                                    </label>
                                </div>
                            </div>
                            <div className='add-loan-code-employee'>
                                <label>Codigo Empleado</label>
                                <input type='number'/>
                                <span className='found'>Fortunato, Jorge</span>
                            </div>
                            <div className='add-loan-retire-date'>
                                <label>Fecha de retiro</label>
                                <input type='date'/>
                            </div>
                            
                        </div>
                        {loanType === 'retired' ? (
                            <SearchPartner menu={setPopupView} />
                        ) : (
                            <Reader menu={setPopupView}  />
                        )} 
                        
                        <LendBooks menu={setPopupView} method={'add'}/>
                    </form>
                )}
                {popupView === 'editForm' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <GenericForm title={'Editar Libro en Prestamo'} fields={addLendBookFields} onSubmit={(data) => console.log('Formulario enviado:', data)}>
                            <Btn className='search-book-btn' text={'Buscar libro'} onClick={() => setPopupView('searchBook')}/>
                        </GenericForm>
                    </>
                )}
                {popupView === 'details' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <ShowDetails insidePopup={true} titleText={'Detalles de libro en préstamo'} isPopup={false} detailsData={lendBooksDetails} />
                    </>
                )}
                {popupView === 'addBook' && (
                    <>
                        
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <GenericForm title={'Agregar Libro en Prestamo'} fields={addLendBookFields} onSubmit={(data) => console.log('Formulario enviado:', data)}>
                            <Btn className='search-book-btn' text={'Buscar libro'} onClick={() => setPopupView('searchBook')}/>
                        </GenericForm>
                    </>
                )}
                {popupView === 'searchBook' && (
                    <>
                        <BackviewBtn menu={'addBook'} changeView={setPopupView} />
                        <SearchBooks />
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
                        <GenericForm title={'Editar cuota pendiente'} fields={addLendBookFields} onSubmit={(data) => console.log('Formulario enviado:', data)} />
                    </>
                )}
                


            </div> 
                     
        </>
    )
}