import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from "../../api/user";
import UserTable from "../../components/UserTable";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import { FaPlus, FaUser, FaEnvelope, FaIdCard, FaLock, FaUserTag } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserPage = () => {
  const { hasRole } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Error al cargar los usuarios");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editingUser) {
        const { password, ...userData } = data;
        if (password) {
          userData.password = password;
        }
        await updateUser(editingUser.id, userData);
        toast.success("Usuario actualizado correctamente");
      } else {
        await createUser(data);
        toast.success("Usuario creado correctamente");
      }
      fetchUsers();
      setIsModalOpen(false);
      setEditingUser(null);
      reset();
    } catch (error) {
      toast.error("Error al guardar el usuario");
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id);
          toast.success("Usuario eliminado correctamente");
          fetchUsers();
        } catch (error) {
          toast.error("Error al eliminar el usuario");
          console.log(error);
        }
      }
    });
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleUserStatus(id);
      toast.success("Estado del usuario cambiado correctamente");
      fetchUsers();
    } catch (error) {
      toast.error("Error al cambiar el estado del usuario");
      console.log(error);
    }
  };

  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
    if (user) {
      reset(user);
    } else {
      reset({ name: "", email: "", userName: "", nationalId: "", password: "", role: "" }); 
    }
  };

  if (!hasRole("admin")) {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <div className="p-4">
      <button
        className="px-4 py-2 text-white bg-blue-500"
        onClick={() => openModal()}
      >
        <FaPlus className="inline mr-2" />
        Crear Usuario
      </button>
      <div className="mt-4 bg-white shadow-md rounded-lg">
        <UserTable
          users={users}
          onEdit={openModal}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      </div>
      {isModalOpen && (
        <Modal
          title={editingUser ? "Editar Usuario" : "Crear Usuario"}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSubmit(handleCreateOrUpdate)}
          onCancel={() => setIsModalOpen(false)}
        >
          <form className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <FaUser className="text-gray-500" />
              <input
                {...register("name", { required: true })}
                placeholder="Nombre"
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-gray-500" />
              <input
                {...register("email", { required: true })}
                placeholder="Email"
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaUser className="text-gray-500" />
              <input
                {...register("userName", { required: true })}
                placeholder="Usuario"
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <FaIdCard className="text-gray-500" />
              <input
                {...register("nationalId", { required: true })}
                placeholder="ID Nacional"
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            {!editingUser && (
              <div className="flex items-center gap-2">
                <FaLock className="text-gray-500" />
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Contraseña"
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>
            )}
            {editingUser && (
              <div className="flex items-center gap-2">
                <FaLock className="text-gray-500" />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Nueva Contraseña (opcional)"
                  className="p-2 border border-gray-300 rounded w-full"
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <FaUserTag className="text-gray-500" />
              <select
                {...register("role", { required: true })}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Seleccionar Rol</option>
                <option value="admin">Admin</option>
                <option value="user">Usuario</option>
                <option value="supervisor">Supervisor</option>
              </select>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UserPage;
