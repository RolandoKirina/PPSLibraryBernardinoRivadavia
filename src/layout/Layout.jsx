import { Outlet } from "react-router-dom";
import Header from '../components/common/header/Header';
import Footer from "../components/common/footer/Footer";

export default function Layout() {
    return (
      <>
      <div className="wrapper">
        <Header/>
        <Outlet />
        <Footer/>
      </div>
      
      </>
    )
}
