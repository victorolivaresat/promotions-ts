const { createToken } = require("../utils/jwt");
const { Sequelize } = require("sequelize");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Login
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ userName: identifier }, { email: identifier }], // Asegúrate de usar Sequelize.Op.or correctamente
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await createToken({ userId: user.id });

    res.cookie("token", token);

    res.status(200).json({
      success: true,
      userId: user.id,
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during login" });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during logout" });
  }
};

// Verify Token
const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, "secret", async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const user = await User.findByPk(decodedToken.userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        success: true,
        message: "Token is valid",
        userId: user.id,
        userName: user.userName,
        nationalId: user.nationalId,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login, logout, verifyToken };
