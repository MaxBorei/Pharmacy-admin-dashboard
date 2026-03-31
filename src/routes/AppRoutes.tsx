import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage/homePage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import OrderPage from "../pages/OrdersPage/OrdersPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SuppliersPage from "../pages/SuppliersPage/SuppliersPage";
import CustomersPage from "../pages/CustomersPage/CustomersPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/orders" element={<OrderPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/suppliers" element={<SuppliersPage />} />
      <Route path="/customers" element={<CustomersPage />} />
    </Routes>
  );
}
