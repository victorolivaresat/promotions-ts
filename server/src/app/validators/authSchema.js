const zod = require("zod");

const loginSchema = zod.object({
  identifier: zod
    .string({
      required_error: "Username or Email is required",
    })
    .min(3, {
      message: "Identifier must be at least 3 characters",
    }),
  password: zod
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

module.exports = { loginSchema };