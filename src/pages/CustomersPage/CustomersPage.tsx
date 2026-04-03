import { Navigate } from "react-router-dom";
import { RootLayout } from "../../components/Layout/Layout";

export const CustomersPage = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <RootLayout />;
};
