import { AuthContext } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as authApi from "../api/auth";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import cookie from "js-cookie";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const data = await authApi.login(email, password);
      console.log("Datos recibidos del backend:", data);

      if (data) {
        const { userId, userName, email, role, token } = data;
        setCurrentUser({ userId, userName, email, role });
        setIsAuthenticated(true);
        cookie.set("token", token);
        toast.success("¡Bienvenido!");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Credenciales incorrectas");
      } else if (error.response && error.response.status === 500) {
        toast.error("Error en el servidor");
      } else {
        toast.error("Error desconocido");
      }
      console.error("Error durante login", error);
    }
  };

  const logoutUser = async () => {
    try {
      await authApi.logout();
      setCurrentUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  const hasRole = (role) => {
    if (!currentUser || !currentUser.role) return false;
    return currentUser.role === role;
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const cookies = cookie.get();

      console.log("Cookies:", cookies.token);
      if (!cookies.token) {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await authApi.verifyToken();
        if (!res.success) {
          setIsAuthenticated(false);
          return;
        }

        const { userId, userName, email, role } = res;
        console.log("Usuario verificado:", { userId, userName, email, role });

        setCurrentUser({ userId, userName, email, role });
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        loading,
        logoutUser,
        loginUser,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
