import { Navigate } from "react-router-dom";

export const CustomersPage = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <h1>CustomersPage</h1>;
};
