import { AuthContext } from "../../contexts/AuthContext";
import React, { useState, useContext } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border outline-gray-300 placeholder:text-gray-400 focus:outline-red-600 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <a
              href="#"
              className="text-sm font-semibold text-red-600 hover:text-red-500"
            >
              Forgot password?
            </a>
          </div>
          <div className="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border outline-gray-300 placeholder:text-gray-400 focus:outline-red-600 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-gray-500 focus:outline-gray-600"
          >
            Sign in
          </button>
        </div>
      </form>
      </div>

    </div>
  );
};

export default LoginForm;
