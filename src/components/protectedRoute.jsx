import { Navigate  } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";




export const ProtectedRoute = ({ children, enable }) => {
    const user = useAuth();


    if(!enable) return children;

    if (!user) {
      // user is not authenticated
      return <Navigate to="/login" />
    }
    return children;
};