import Logo from "../assets/img/logo.jpg";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={Logo}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Inicio de sesión
        </h2>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
