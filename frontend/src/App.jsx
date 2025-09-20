import BookSection from './pages/BookSection/BookSection.jsx';
import Layout from './layout/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoanSection from './pages/LoanSection/LoanSection';
import AuthorSection from './pages/AuthorSection/AuthorSection.jsx';
import PartnerCategorySection from './pages/OptionSection/PartnerCategory/PartnerCategorySection.jsx';
import LoanMaterialSection from './pages/OptionSection/LoanMaterial/LoanMaterialSection.jsx';
import RemovePartnerReasonSection from './pages/OptionSection/RemovePartnerReason/RemovePartnerReasonSection.jsx';
import LoanAmountSection from './pages/OptionSection/LoanAmount/LoanAmountSection.jsx';
import EmployeeSection from './pages/OptionSection/EmployeeSection/EmployeeSection.jsx';
import PartnerSection from './pages/PartnerSection/PartnerSection.jsx';
import OptionSection from './pages/OptionSection/OptionSection.jsx';
import FeeSection from './pages/FeeSection/FeeSection.jsx';
import LoginSection from './pages/LoginSection/LoginSection.jsx';
import RegisterSection from './pages/RegisterSection/RegisterSection.jsx';
import { HomePage } from './pages/HomeSection/HomePage.jsx';
import NotFound from './components/common/notfound/notfound.jsx';

// import PartnerListSection from './pages/options/PartnerListSection/PartnerListSection.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='employees' element={<EmployeeSection />} />
            <Route path='login' element={<LoginSection />} />
            <Route path='register' element={<RegisterSection />} />
            <Route path='loans' element={<LoanSection openRenewes={false} />} />
            <Route path='loans/renewes' element={<LoanSection openRenewes={true} />} />
            {/* <Route path='loans/listening/LoanListingReturnDate' element={} />
            <Route path='loans/listening/LoanListingPhone' element={} />
            <Route path='loans/listening/LoanListingPerPartner' element={} /> */}
            <Route path='loans/filters/partner' element={<LoanSection openRenewes={false} pendientBooks={true} />} />
            <Route path='books' element={<BookSection />} />
            <Route path='partners' element={<PartnerSection />} />
            <Route path='authors' element={<AuthorSection />} />
            <Route path='options' element={<OptionSection />} />
            <Route path='options/partner-categories' element={<PartnerCategorySection />} />
            <Route path='options/loan-materials' element={<LoanMaterialSection />} />
            <Route path='options/remove-partner-reasons' element={<RemovePartnerReasonSection chooseMode={false} />} />
            <Route path='options/loan-amount-group' element={<LoanAmountSection />} />
            <Route path='fees' element={<FeeSection />} />

            {/* catch all dentro de Layout */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
