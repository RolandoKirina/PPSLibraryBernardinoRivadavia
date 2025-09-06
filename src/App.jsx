import BookSection from './pages/BookSection/BookSection.jsx';
import Layout from './layout/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoanSection from './pages/LoanSection/LoanSection';
import Content from './components/common/content/Content.jsx';
import ShowDetails from './components/generic/ShowDetails/ShowDetails.jsx';
import Listing from './components/loan-components/listing/Listing.jsx';
import GenericForm from './components/generic/GenericForm/GenericForm.jsx';
//rutas importadas para evitar llenar todo de rutas similares
import { loanFormRoutes, detailsRoutes, listingRoutes } from './data/Routes.js'; 
import UnpaidQuotes from './components/loan-components/unpaidquotes/UnpaidQuotes.jsx';
import Renewe from './components/loan-components/renewe/Renewe.jsx';
import AuthorSection from './pages/AuthorSection/AuthorSection.jsx';
import PartnerCategorySection from './pages/OptionSection/PartnerCategory/PartnerCategorySection.jsx';
import LoanMaterialSection from './pages/OptionSection/LoanMaterial/LoanMaterialSection.jsx';
import RemovePartnerReasonSection from './pages/OptionSection/RemovePartnerReason/RemovePartnerReasonSection.jsx';
import LoanAmountSection from './pages/OptionSection/LoanAmount/LoanAmountSection.jsx';
import EmployeeSection from './pages/OptionSection/EmployeeSection/EmployeeSection.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import BooksAuthor from './components/author-components/BooksAuthor/BooksAuthor.jsx';
import Signature from './components/book-components/signature/Signature.jsx';
import PartnerSection from './pages/PartnerSection/PartnerSection.jsx';
import OptionSection from './pages/OptionSection/OptionSection.jsx';
import FeeSection from './pages/FeeSection/FeeSection.jsx';
import LoginSection from './pages/LoginSection/LoginSection.jsx';
import RegisterSection from './pages/RegisterSection/RegisterSection.jsx';
import { HomePage } from './pages/HomeSection/HomePage.jsx';

// import PartnerListSection from './pages/options/PartnerListSection/PartnerListSection.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}> 
          <Route index element={<HomePage />} /> 
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/employees' element={<EmployeeSection/>}/>
            <Route path='/login' element={<LoginSection/>}/>
            <Route path='/register' element={<RegisterSection/>}/>
            <Route path='/loans' element={<LoanSection openRenewes={false}/>}/>
            <Route path='/loans/renewes' element={<LoanSection openRenewes={true}/>}/>
            <Route path='/loans/filters/partner' element={<LoanSection openRenewes={false} pendientBooks={true}/>}/>
            <Route path='/books' element={<BookSection/>}/>
            <Route path='/partners' element={<PartnerSection/>}/>
            <Route path='/authors' element={<AuthorSection/>}/>
            <Route path='/options' element={<OptionSection />}/>
            <Route path='/options/partner-categories' element={<PartnerCategorySection/>}/>
            <Route path='/options/loan-materials' element={<LoanMaterialSection/>}/>
            <Route path='/options/remove-partner-reasons' element={<RemovePartnerReasonSection chooseMode={false}/>}/>
            <Route path='/options/loan-amount-group' element={<LoanAmountSection/>}/> 
            {/* <Route path='/options/partner-lists' element={<PartnerListSection/>}/>  */}
            <Route path='/fees' element={<FeeSection/>}/>

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

            <Route path='/loans/partner/quotes' element={<Content>
              <UnpaidQuotes />
            </Content>}/>

            <Route path='/books/renewes' element={<Content>
              <Renewe isPopup={false} title="Listado de reservas" />
            </Content>}/> 

            <Route path='/books/authors' element={<Content>
              <AuthorSection/>
            </Content>}/> 

              
            <Route path='/books/booksauthor' element={<Content>
              <BooksAuthor />
            </Content>}/> 


            <Route path='/books/signature' element={<Content>
              <Signature  />
            </Content>}/> 

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
