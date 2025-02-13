import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Call your signup handler here
    // handleSignup({ name, email, password });
    console.log("Signup data:", { name, email, password });
  };
  const goToLogin = () => {
    navigate("/");
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5010/api/signup", {
        username,
        email,
        password,
      });
      console.log("Signup successful:", res.data);
      navigate("/dashboard"); // Redirect to login page
      alert("Signup successful! Please login.");
      setIsSignup(false);
    } catch (error) {
      console.error("Signup failed:", error.response.data);
      alert(error.response.data.message || "Signup failed");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="absolute top-0 right-0 transform translate-x-10 -translate-y-10">
    <div className="relative w-80 h-80">
      <div className="absolute inset-0 bg-indigo-500 opacity-30 rounded-full"></div>
      <div className="absolute top-2 right-2 w-50 h-50 bg-indigo-400 opacity-50 rounded-full"></div>
      <div className="absolute top-4 right-4 w-25 h-25 bg-indigo-300 opacity-70 rounded-full"></div>
    </div>
  </div>
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
    <div className="flex justify-center text-center  "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6 text-center justify-center text-indigo-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
</svg></div>
      <h1 className="text-sm font-bold text-gray-600 text-center mb-6 mt-6">
         Signup to PharmacyApp
      </h1>
      <form onSubmit={handleSignup} className="space-y-4">
        {/* Full Name Field */}
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={username}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {/* Email Field */}
        <div className="w-full relative">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Password Field */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute p-2.5 rounded-3xl m-1.5 inset-y-0 right-3 flex items-center text-gray-500 hover:bg-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}
          </button>
        </div>
        {/* Confirm Password Field */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end text-gray-500 text-sm">
          <button type="button" className="hover:text-indigo-700" 
            onClick={goToLogin}
          >
            Already have an account?
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">
        By signing in, you agree to our{" "}
        <a href="/terms" className="underline text-indigo-500">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline text-indigo-500">
          Privacy Policy
        </a>.
      </p>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-700"
        >
          Signup
        </button>
      </form>
    </div>
    </div>
  );
};

export default Signup;
