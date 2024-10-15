import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading from "../extra/Loading";
import Home from "../pages/Home";


export const ProtectedRoutes = ({ element }) => {

    const {isAuthenticated, loading} = useAuth();

    if(loading)
        return <Loading />

    if (!isAuthenticated)
        return <Navigate to="/login" />;

    return element;
}
export const ProtectedRoot = () => {

    const {isAuthenticated, loading} = useAuth();

    if(loading)
        return <Loading />

    if (!isAuthenticated)
        return <Navigate to="/login" />;

    return <Home />;
}
