import { AuthContext } from "../contexts/AuthContext";
import { Route, Routes, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../layout/AuthLayout";
import AppLayout from "../layout/AppLayout";
import { useContext } from "react";

// Importar las páginas protegidas
import NotFound from "../pages/Error/NotFound";
import Dashboard from "../pages/Dashboard";
import Report from "../pages/Report";
import Bonus from "../pages/Bonus";
import Login from "../pages/Login";
import User from "../pages/User";

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {/* Componente para mostrar notificaciones */}
      <ToastContainer position="top-center" />

      <Routes>
        {/* Rutas públicas con AuthLayout */}
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />

        {/* Rutas protegidas con ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bonus" element={<Bonus />} />
            <Route path="/report" element={<Report />} />
            <Route path="/user" element={<User />} />

            {/* Rutas de error */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        {/* Ruta de redirección */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
