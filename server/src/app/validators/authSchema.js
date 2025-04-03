const zod = require("zod");

const loginSchema = zod.object({
  email: zod
    .string({
      required_error: "Email is required",
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