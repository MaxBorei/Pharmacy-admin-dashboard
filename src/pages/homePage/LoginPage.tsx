import { Navigate } from "react-router-dom";
import { Hero } from "../../components/Hero/Hero";

export const LoginPage = () => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Hero />;
};
