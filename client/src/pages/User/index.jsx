import { useEffect, useState } from "react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from "../../api/user";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UserTable from "../../components/UserTable";
import Modal from "../../components/Modal";
import { FaPlus }   from "react-icons/fa";

const UserPage = () => {
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
        await updateUser(editingUser.id, data);
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
      reset();
    }
  };

  return (
    <div className="p-4">
      <button
        className="px-4 py-2 text-white bg-blue-500"
        onClick={() => openModal()}
      >
        <FaPlus className="inline mr-2" />
        Crear Usuario
      </button>
      <div className="mt-4">
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
            <input
              {...register("name", { required: true })}
              placeholder="Nombre"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              {...register("userName", { required: true })}
              placeholder="Usuario"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              {...register("nationalId", { required: true })}
              placeholder="ID Nacional"
              className="p-2 border border-gray-300 rounded"
            />
            {!editingUser && (
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Contraseña"
                className="p-2 border border-gray-300 rounded"
              />
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UserPage;
