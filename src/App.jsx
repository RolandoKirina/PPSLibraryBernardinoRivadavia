import RegisterEmployee from './pages/RegisterEmployee/RegisterEmployee';
import Books from './components/sidebar/Sidebar.jsx';
import Author from './components/sidebar/Sidebar.jsx';
import Layout from './layout/Layout';
// import Header from './components/header/Header';

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {

  return (
    <>
      {/* <Header />
      <RegisterEmployee/> */}

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
