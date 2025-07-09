import RegisterEmployee from './pages/RegisterEmployee/RegisterEmployee';
import Layout from './layout/Layout';
// import Header from './components/header/Header';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoanSection from './pages/LoanSection/LoanSection';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}> 
            <Route path='/register' element={<RegisterEmployee/>}/>
            <Route path='/loans' element={<LoanSection/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
