import RegisterEmployee from './pages/RegisterEmployee/RegisterEmployee';
import BookSection from './pages/BookSection/BookSection.jsx';
import Layout from './layout/Layout';
// import Header from './components/header/Header';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoanSection from './pages/loan-pages/LoanSection/LoanSection';
import AddLendBook from './pages/loan-pages/AddLendbook/AddLendBook.jsx';
import Content from './components/content/Content.jsx';
import ShowDetails from './components/showdetails/ShowDetails.jsx';
import { lendBooksDetails, lendBooksReturnDetails, reneweDetails } from './data/LoanDetails.js';
import LoanDelete from './components/loan-components/loandelete/LoanDelete.jsx';
import Listing from './components/loan-components/listing/Listing.jsx';
import AddReneweForm from './components/loan-components/addreneweform/AddReneweForm.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}> 
            <Route path='/register' element={<RegisterEmployee/>}/>
            <Route path='/loans' element={<LoanSection/>}/>
            <Route path='/books' element={<BookSection/>}/>
            <Route path='/loans/add-book-lend' element={<Content>
              <AddLendBook method={'add'}/>
            </Content>}/>

            <Route path='/loans/book-on-loan-edit' element={<Content>
              <AddLendBook method={'update'}/>
            </Content>}/>

            <Route path='/loans/book-on-loan-details' element={<Content>
              <ShowDetails titleText={'Detalles de libro en préstamo'} isPopup={false} detailsData={lendBooksDetails}/>
            </Content>}/>

            <Route path='/loans/book-on-loan-delete' element={<Content>
               <LoanDelete isPopup={false} />
            </Content>}/>

            <Route path='/loans/book-on-loan-returns-details' element={<Content>
              <ShowDetails titleText={'Detalles de libro prestado'} isPopup={false} detailsData={lendBooksReturnDetails}/>
            </Content>}/>

            <Route path='/loans/renewe-details' element={<Content>
              <ShowDetails titleText={'Detalles de reserva'} isPopup={false} detailsData={reneweDetails}/>
            </Content>}/>

            <Route path='/loans/add-renewe' element={<Content>
              <AddReneweForm />
            </Content>}/>

            <Route path='/loans/listening/return-date' element={<Content>
              <Listing type={'return-date'}/>
            </Content>}/>

            <Route path='/loans/listening/phone' element={<Content>
              <Listing type={'phone'}/>
            </Content>}/>

            <Route path='/loans/listening/loans-per-partner' element={<Content>
              <Listing type={'loans-per-partner'}/>
            </Content>}/>

            

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
