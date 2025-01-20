import { Outlet } from "react-router-dom";
import Header from "./../components/Header/Header";
import Footer from "./../components/Footer/Footer";

const DefaultPage = () => {
  return (
    <div className="main-page-container body-medium tg-surface">
      <Header />
      <div className="wrapper-main">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default DefaultPage;