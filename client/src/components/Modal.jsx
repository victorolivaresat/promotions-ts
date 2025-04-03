import { FaTimes } from "react-icons/fa";

const Modal = ({ title, children, onClose, onSave, onCancel }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50"
    >
      <div className="relative w-11/12 max-w-xl p-4 max-h-full"> {/* Tamaño reducido */}
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={onClose}
            >
              <FaTimes className="w-4 h-4" />
              <span className="sr-only">Cerrar modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
          {/* Modal footer */}
          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onCancel || onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="px-4 py-2 ml-2 text-white bg-blue-500 rounded"
              onClick={onSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;