import { FaExclamationCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

const NotFound = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <p className="text-center text-2xl">
            Cargando...
            <span className="animate-ping text-blue-500">...</span>
        </p>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-9xl font-bold">404</h1>
            <p className="text-2xl">
              <span className="text-red-600">
                <FaExclamationCircle /> Opps!
              </span>{" "}
              Página no encontrada.
            </p>
            <p className="text-lg">La página que estás buscando no existe.</p>
            <a
              href="/"
              className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Ir a Inicio
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default NotFound;