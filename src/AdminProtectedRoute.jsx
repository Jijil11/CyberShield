import { Navigate } from "react-router-dom";
import { isAdmin } from "./utils/planUtils";

const AdminProtectedRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/login" replace />;
};

export default AdminProtectedRoute;
