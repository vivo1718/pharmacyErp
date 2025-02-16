import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!password) {
      setPasswordError("Password is required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5010/api/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      if (error.response?.data) {
        const message = error.response.data.message || "Invalid credentials";
        setError(message);
        if (message.toLowerCase().includes("email")) {
          setEmailError(message);
        } else if (message.toLowerCase().includes("password")) {
          setPasswordError(message);
        }
      } else {
        setError("Connection error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => navigate("/signup");
  const goToForgetPass = () => navigate("/forgot-password");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-100 to-purple-200 rounded-full mix-blend-multiply opacity-40 animate-blob-1"></div>
        <div className="absolute w-[450px] h-[450px] bg-gradient-to-r from-blue-100 to-cyan-200 rounded-full mix-blend-multiply opacity-40 animate-blob-2"></div>
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-100 to-pink-200 rounded-full mix-blend-multiply opacity-40 animate-blob-3"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYwIDBIMHY2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9zdmc+')]"></div>
      </div>

      {/* Login card */}
      <div className="relative z-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-sm transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to continue to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-3 rounded-lg bg-gray-50 border focus:border-indigo-500 focus:bg-white focus:outline-none ${
                emailError ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border focus:border-indigo-500 focus:bg-white focus:outline-none ${
                  passwordError ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-indigo-500"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goToForgetPass}
              className="text-sm text-indigo-500 hover:text-indigo-700 font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={goToSignup}
              className="text-indigo-500 hover:text-indigo-700 font-medium"
            >
              Create account
            </button>
          </p>
        </form>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -30px) scale(1.05); }
        }
        @keyframes blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 20px) scale(1.03); }
        }
        @keyframes blob-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.02); }
        }
        .animate-blob-1 {
          animation: blob-1 25s ease-in-out infinite;
          top: 20%;
          left: 10%;
        }
        .animate-blob-2 {
          animation: blob-2 30s ease-in-out infinite;
          top: 60%;
          right: 10%;
        }
        .animate-blob-3 {
          animation: blob-3 35s ease-in-out infinite;
          bottom: 20%;
          left: 40%;
        }
      `}</style>
    </div>
  );
}