import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../../../context/AuthModalContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { openLogin } = useAuthModal();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset email sent to:", email);
  };


  const goToLogin = () => {
    navigate("/");     // Move to landing
    setTimeout(() => {
      openLogin();     // Open login modal
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Forgot Password
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-sm">
          Enter your registered email to receive password reset instructions.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-600">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent outline-none text-gray-900 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-300">
          Remember your password?
          <button
            type="button"
            onClick={goToLogin}
            className="text-blue-600 font-medium hover:underline ml-1"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
