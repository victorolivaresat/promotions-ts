const config = require("../../config/app.json");
const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRES_IN,
      },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { createToken };