import RegisterEmployee from './pages/RegisterEmployee/RegisterEmployee';
import BookSection from './pages/BookSection/BookSection.jsx';
import Layout from './layout/Layout';
// import Header from './components/header/Header';

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}> 
            <Route path='/register' element={<RegisterEmployee/>}/>
          </Route>
          <Route path='/' element={<Layout />}> 
            <Route path='/books' element={<BookSection/>}/>
          </Route>
         
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
