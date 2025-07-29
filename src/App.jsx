import RegisterEmployee from './pages/options/RegisterEmployee/RegisterEmployee.jsx';
import BookSection from './pages/BookSection/BookSection.jsx';
import Layout from './layout/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoanSection from './pages/LoanSection/LoanSection';
import Content from './components/content/Content.jsx';
import ShowDetails from './components/generic/ShowDetails/ShowDetails.jsx';
import Listing from './components/loan-components/listing/Listing.jsx';
import GenericForm from './components/generic/GenericForm/GenericForm.jsx';
//rutas importadas para evitar llenar todo de rutas similares
import { loanFormRoutes, detailsRoutes, listingRoutes } from './data/Routes.js'; 
import PartnerMemo from './components/loan-components/partnermemo/PartnerMemo.jsx';
import UnpaidQuotes from './components/loan-components/unpaidquotes/UnpaidQuotes.jsx';
import PendientBooks from './components/loan-components/pendientbooks/PendientBooks.jsx';
import Renewe from './components/loan-components/renewe/Renewe.jsx';
import AuthorSection from './pages/AuthorSection/AuthorSection.jsx';
import PartnerCategorySection from './pages/options/PartnerCategory/PartnerCategorySection.jsx';
import LoanMaterialSection from './pages/options/LoanMaterial/LoanMaterialSection.jsx';
import RemovePartnerReasonSection from './pages/options/RemovePartnerReason/RemovePartnerReasonSection.jsx';
import LoanAmountSection from './pages/options/LoanAmount/LoanAmountSection.jsx';
import EmployeeSection from './pages/options/EmployeeSection/EmployeeSection.jsx';
import BooksAuthor from './components/author-components/BooksAuthor/BooksAuthor.jsx';
import Signature from './components/signature/Signature.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}> 
            <Route path='/employee' element={<EmployeeSection/>}/>
            <Route path='/employee/register' element={<RegisterEmployee mode={'add'}/>}/>
            <Route path='/employee/edit-employee' element={<RegisterEmployee mode={'edit'}/>}/>
            <Route path='/loans' element={<LoanSection openRenewes={false}/>}/>
            <Route path='/loans/renewes' element={<LoanSection openRenewes={true}/>}/>
            <Route path='/books' element={<BookSection/>}/>
            <Route path='/authors' element={<AuthorSection/>}/>
            <Route path='/options/partner-categories' element={<PartnerCategorySection/>}/>
            <Route path='/options/loan-materials' element={<LoanMaterialSection/>}/>
            <Route path='/options/remove-partner-reasons' element={<RemovePartnerReasonSection chooseMode={false}/>}/>
            <Route path='/options/loan-amount' element={<LoanAmountSection/>}/> 

            <Route path='/books/add-book' element={<Content>
              {/* <FormEditBook /> */}
            </Content>}/>

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

            <Route path='/loans/partner/pendient-books' element={<Content>
              <PendientBooks />
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
