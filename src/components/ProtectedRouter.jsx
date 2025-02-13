import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if user is logged in

  return token ? children : <Navigate to="/" />;
};

export default ProtectedRouter;
