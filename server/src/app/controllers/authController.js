const { createToken } = require("../utils/jwt");
const config = require("../../config/app.json");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "User is not active" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await createToken({ userId: user.id });

    // res.cookie("token", token);

    res.status(200).json({
      success: true,
      userId: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      token,
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

    jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => { // Usar config.JWT_SECRET
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
        email: user.email,
        role: user.role,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login, logout, verifyToken };
