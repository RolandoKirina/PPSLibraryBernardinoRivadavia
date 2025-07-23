import RegisterEmployee from './pages/RegisterEmployee/RegisterEmployee';
import BookSection from './pages/BookSection/BookSection.jsx';
import Layout from './layout/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoanSection from './pages/LoanSection/LoanSection';
import Content from './components/content/Content.jsx';
import ShowDetails from './components/generic/ShowDetails/ShowDetails.jsx';
import Listing from './components/loan-components/listing/Listing.jsx';
import GenericForm from './components/generic/GenericForm/GenericForm.jsx';

//rutas importadas para evitar llenar todo de rutas similares
import { loanFormRoutes, detailsRoutes, listingRoutes } from './data/loan/LoanRoutes.js'; 

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}> 
            <Route path='/register' element={<RegisterEmployee/>}/>
            <Route path='/loans' element={<LoanSection/>}/>
            <Route path='/books' element={<BookSection/>}/>

            {loanFormRoutes.map(({ path, title, fields }, idx) => ( //rutas de formularios independientes(no son popup) de préstamo(u otras secciones
              <Route
                key={idx}
                path={path}
                element={
                  <Content>
                    <GenericForm
                      title={title}
                      fields={fields}
                      onSubmit={(data) => console.log('Formulario enviado:', data)}
                    />
                  </Content>
                }
              />
            ))}

            {detailsRoutes.map(({ path, titleText, data }, idx) => ( //rutas de ver detalles independientes(no son popup) de tablas en préstamo(u otras secciones)
              <Route
                key={idx}
                path={path}
                element={
                  <Content>
                    <ShowDetails titleText={titleText} isPopup={false} detailsData={data} />
                  </Content>
                }
              />
            ))}

            {listingRoutes.map((type, idx) => ( //rutas de listados de informacion independientes(no son popup) de préstamo
              <Route
                key={idx}
                path={`/loans/listening/${type}`}
                element={
                  <Content>
                    <Listing type={type} />
                  </Content>
                }
              />
            ))}

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
