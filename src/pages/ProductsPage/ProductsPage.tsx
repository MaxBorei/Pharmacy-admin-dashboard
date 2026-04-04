import { Navigate } from "react-router-dom";

export const ProductsPage = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <h1>Hello</h1>;
};
