import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layout/Layout';
import ProtectedRoute from './auth/ProtectedRoute.jsx';

import { HomePage } from './pages/HomeSection/HomePage.jsx';
import LoginSection from './pages/LoginSection/LoginSection.jsx';
import RegisterSection from './pages/RegisterSection/RegisterSection.jsx';
import NotFound from './components/common/notfound/notfound.jsx';

import EmployeeSection from './pages/OptionSection/EmployeeSection/EmployeeSection.jsx';
import OptionSection from './pages/OptionSection/OptionSection.jsx';
import PartnerCategorySection from './pages/OptionSection/PartnerCategory/PartnerCategorySection.jsx';
import RemovePartnerReasonSection from './pages/OptionSection/RemovePartnerReason/RemovePartnerReasonSection.jsx';
import LoanAmountSection from './pages/OptionSection/LoanAmount/LoanAmountSection.jsx';
import LoanMaterialSection from './pages/OptionSection/LoanMaterial/LoanMaterialSection.jsx';

import LoanSection from './pages/LoanSection/LoanSection.jsx';
import BookSection from './pages/BookSection/BookSection.jsx';
import PartnerSection from './pages/PartnerSection/PartnerSection.jsx';
import AuthorSection from './pages/AuthorSection/AuthorSection.jsx';
import FeeSection from './pages/FeeSection/FeeSection.jsx';
import ReaderSection from "./pages/ReaderSection/ReaderSection.jsx";
import { routePermissions } from "./auth/permissions.js";
import BookAuthors from "./components/book-components/BooksAuthor/BookAuthors.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='login' element={<LoginSection />} />
          <Route path='register' element={<RegisterSection />} />

          <Route element={<ProtectedRoute requiredRoles={routePermissions.employees} />}>
            <Route path='employees' element={<EmployeeSection />} />

            <Route path='options/partner-categories' element={<PartnerCategorySection />} />
            <Route path='options/remove-partner-reasons' element={<RemovePartnerReasonSection chooseMode={false} />} />

            <Route path='partners' element={<PartnerSection />} />
            <Route path='fees' element={<FeeSection />} />
            <Route path='readers' element={<ReaderSection />} />

          </Route>

          <Route element={<ProtectedRoute requiredRoles={routePermissions.loggedAccess} />}>
            <Route path='loans' element={<LoanSection openRenewes={false} />} />
            <Route path='loans/renewes' element={<LoanSection openRenewes={true} />} />
            <Route path='loans/filters/partner' element={<LoanSection openRenewes={false} pendientBooks={true} />} />

            <Route path='options' element={<OptionSection />} />
            <Route path='options/loan-amount-group' element={<LoanAmountSection />} />
            <Route path='options/loan-materials' element={<LoanMaterialSection />} />
          </Route>

          <Route element={<ProtectedRoute requiredRoles={routePermissions.allAccess} />}>
            <Route path='books' element={<BookSection />} />
            <Route path='authors' element={<AuthorSection />} />
            <Route path='books-authors' element={<BookAuthors />} />
          </Route>


          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
