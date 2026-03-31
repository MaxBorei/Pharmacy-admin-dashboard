import { Navigate } from "react-router-dom";

export const DashboardPage = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <h1>DashboardPage</h1>;
};
