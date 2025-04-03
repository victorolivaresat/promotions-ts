import { AuthContext } from "./client/src/contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as authApi from "./api/auth";
import cookie from "js-cookie";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (identifier, password) => {
    try {
      const data = await authApi.login(identifier, password);
      console.log("Datos recibidos del backend:", data);

      if (data) {
        const { userId, userName, email, token } = data;
        console.log("Usuario autenticado:", { userId, userName, email });

        setCurrentUser({ userId, userName, email });
        setIsAuthenticated(true);
        cookie.set("token", token);
      }
    } catch (error) {
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

  useEffect(() => {
    const checkLoginStatus = async () => {
      const cookies = cookie.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setCurrentUser(null);
        return;
      }

      try {
        const res = await authApi.verifyToken();
        if (!res.success) {
          setIsAuthenticated(false);
          return;
        }

        const { userId, userName, nationalId } = res;
        console.log("Usuario verificado:", { userId, userName, nationalId });

        setCurrentUser({ userId, userName, nationalId });
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    return () => {
      console.log("AuthProvider se ha desmontado");
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        logoutUser,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};