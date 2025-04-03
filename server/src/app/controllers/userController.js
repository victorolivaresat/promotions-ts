const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { name, email, userName, nationalId, password, role } = req.body;
    if (!["admin", "user", "supervisor"].includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      userName,
      nationalId,
      password: hashedPassword,
      role,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, userName, nationalId, password, role } = req.body;
    if (role && !["admin", "user", "supervisor"].includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const updatedData = { name, email, userName, nationalId, role };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    await user.update(updatedData);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id === "1") {
      return res.status(403).json({ message: "No se puede eliminar al usuario con ID 1" });
    }
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cambiar el estado de un usuario
const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (id === "1") {
      return res.status(403).json({ message: "No se puede cambiar el estado del usuario con ID 1" });
    }
    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    user.isActive = !user.isActive;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
};
