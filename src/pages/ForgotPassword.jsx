import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5010/api/forgot-password", { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };
  const goToLogin = () => {
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Forgot Password?</h2>
        <p className="text-gray-600 text-center mt-2">Enter your email to reset your password.</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Reset Password
          </button>
        </form>
        {message && <p className="text-center mt-4 text-green-600">{message}</p>}
        <p className=" justify-center align-middle text-center mt-2 text-gray-700 hover:bg-blue-200 p-2 rounded-xl" onClick={goToLogin}>Back to Login</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
