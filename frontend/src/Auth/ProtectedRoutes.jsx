import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading from "../extra/Loading";

export const ProtectedRoutes = ({ element }) => {

    const {isAuthenticated, loading} = useAuth();

    if(loading)
        return <Loading />

    if (!isAuthenticated)
        return <Navigate to="/login" />;

    return element;
}
export const ProtectedRoot = () => {

    const {isAuthenticated, loading, user} = useAuth();

    if(loading)
        return <Loading />

    if (!isAuthenticated)
        return <Navigate to="/login" />;

    if(user.role === "admin")
        return <Navigate to="/admin" />;

    return <Navigate to="/student" />;
}
