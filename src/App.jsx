import RegisterEmployee from './pages/RegisterEmployee/RegisterEmployee';
import BookSection from './pages/BookSection/BookSection.jsx';
import Layout from './layout/Layout';
// import Header from './components/header/Header';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoanSection from './pages/LoanSection/LoanSection';
import AddLendBook from './pages/AddLendbook/AddLendBook.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}> 
            <Route path='/register' element={<RegisterEmployee/>}/>
            <Route path='/loans' element={<LoanSection/>}/>
             <Route path='/books' element={<BookSection/>}/>
            <Route path='/add-book-lend' element={<AddLendBook/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
