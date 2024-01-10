import { Route, Routes } from "react-router-dom";
import { SupplierProvider } from "../Context/supplier.context";
import NotFoundPage from "../pages/404";
import { ToastContainer } from "react-toastify";
import RenderHome from "../pages/home/home";
export default function MainRoutes(): JSX.Element {
  return (
    <SupplierProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<RenderHome />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </SupplierProvider>
  );
}
