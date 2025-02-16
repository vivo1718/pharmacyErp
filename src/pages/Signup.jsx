import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userNameError, setuserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!username) {
      setuserNameError("Name is required.");
      return;
    }

    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!password) {
      setPasswordError("Password is required.");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5010/api/signup", {
        username,
        email,
        password,
      });
      console.log("Signup successful:", res.data);
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error.response?.data);
      const message = error.response?.data?.message || "Signup failed";
      if (message.toLowerCase().includes("email")) {
        setEmailError(message);
      } else if (message.toLowerCase().includes("password")) {
        setPasswordError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => navigate("/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-100 to-purple-200 rounded-full mix-blend-multiply opacity-40 animate-blob-1"></div>
        <div className="absolute w-[450px] h-[450px] bg-gradient-to-r from-blue-100 to-cyan-200 rounded-full mix-blend-multiply opacity-40 animate-blob-2"></div>
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-purple-100 to-pink-200 rounded-full mix-blend-multiply opacity-40 animate-blob-3"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYwIDBIMHY2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9zdmc+')]"></div>
      </div>

      {/* Signup Card with increased width and two input rows */}
      <div className="relative z-10 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h1>
          <p className="text-gray-500">Get started with PharmacyApp</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Row 1: Full Name & Email */}
          <div className="md:flex md:space-x-8">
            <div className="mb-4 md:mb-0 md:flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border focus:border-indigo-500 focus:bg-white focus:outline-none ${
                  userNameError ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter your full name"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {userNameError && <p className="text-red-500 text-sm mt-1">{userNameError}</p>}
            </div>
            <div className="mb-4 md:mb-0 md:flex-1">
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
          </div>

          {/* Row 2: Password & Confirm Password */}
          <div className="md:flex md:space-x-4">
            <div className="mb-4 md:mb-0 md:flex-1">
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <div className="mb-4 md:mb-0 md:flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 border focus:border-indigo-500 focus:bg-white focus:outline-none ${
                    confirmPasswordError ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={goToLogin}
              className="text-indigo-500 hover:text-indigo-700 font-medium"
            >
              Already have an account? Login
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
          <p className="text-sm text-gray-500 text-center">
            By signing up, you agree to our{" "}
            <a href="/terms" className="underline text-indigo-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline text-indigo-500">
              Privacy Policy
            </a>
          </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              "Create Account"
            )}
          </button>
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
};

export default Signup;
