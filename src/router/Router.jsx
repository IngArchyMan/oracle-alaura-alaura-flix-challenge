import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./../pages/Home";
import DefaultPage from "../pages/DefaultPage";
import NewVideo from "./../pages/NewVideo";
/* import NotFound from "./Pages/NotFound/NotFound"; */

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />}>
          <Route index element={<Home />} />
          <Route path="/new-video" element={<NewVideo />} />
          {/* <Route path="*" element={<NotFound />}></Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;