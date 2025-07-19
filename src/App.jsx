import RegisterEmployee from './pages/RegisterEmployee/RegisterEmployee';
import BookSection from './pages/BookSection/BookSection.jsx';
import Layout from './layout/Layout';
// import Header from './components/header/Header';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoanSection from './pages/loan-pages/LoanSection/LoanSection';
import AddLendBook from './pages/loan-pages/AddLendbook/AddLendBook.jsx';
import Content from './components/content/Content.jsx';
import ShowDetails from './components/showdetails/ShowDetails.jsx';
import { lendBooksDetails } from './data/LoanDetails.js';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}> 
            <Route path='/register' element={<RegisterEmployee/>}/>
            <Route path='/loans' element={<LoanSection/>}/>
            <Route path='/books' element={<BookSection/>}/>
            <Route path='/add-book-lend' element={<Content>
              <AddLendBook />
            </Content>}/>

            <Route path='/book-on-loan-details' element={<Content>
              <ShowDetails titleText={'Detalles de libro en préstamo'} isPopup={false} detailsData={lendBooksDetails}/>
            </Content>}/>

            <Route path='/book-on-loan-edit' element={<Content>
               {'HACER'}
            </Content>}/>

            <Route path='/book-on-loan-delete' element={<Content>
               {'HACER'}
            </Content>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
