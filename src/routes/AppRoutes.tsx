import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/homePage/LoginPage";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import { OrderPage } from "../pages/OrdersPage/OrdersPage";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";
import { SuppliersPage } from "../pages/SuppliersPage/SuppliersPage";
import { CustomersPage } from "../pages/CustomersPage/CustomersPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { PrivateRoute } from "./PrivateRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/customers" element={<CustomersPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
