import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading from "../extra/Loading";

export const ProtectedRoutes = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();
  console.log("gjhg" )

  if (loading) return <Loading />;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return element;
};

export const ProtectedRoot = () => {
  const { isAuthenticated, loading, isAdmin } = useAuth();

  console.log("isAuthenticated", isAuthenticated);

  if (loading) return <Loading />;

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (isAdmin) return <Navigate to="/admin" />;

  return <Navigate to="/student" />;
};