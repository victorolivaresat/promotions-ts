import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router";
import "./Routes.css";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [loadingPage, setLoadingPage] = useState(true);

  console.log("Estado de autenticación:", isAuthenticated);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingPage(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loadingPage ? (
        <>
          <div className="bg-gray-900 flex items-center justify-center h-screen">
            <span className="loader"></span>
          </div>
        </>
      ) : isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoute;
