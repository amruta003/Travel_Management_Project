import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/AuthService";
import { toast } from "react-toastify";

function AdminLogin() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await login({ email, password, role: "ADMIN" });

      if (response && response.id) {
        toast.success("Admin Login successful");
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error(error?.response?.data || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          Admin Login
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-1">
          Secure Access Panel
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>

          {/* Email */}
          <div className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin Email"
              className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Password */}
          <div className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 flex items-center">
            <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent outline-none text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}


export default AdminLogin