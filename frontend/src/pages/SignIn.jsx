import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-green-50 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow w-full max-w-md p-8 border border-orange-100">
        {/* Logo / Title */}
        <h1 className="text-4xl font-extrabold mb-2 text-orange-600 text-center tracking-tight">
          MealMate
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Fresh, fast & delicious meals delivered to your door 🍴
        </p>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
            />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-gray-400 hover:text-orange-700 transition-colors"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Forget Password */}
        <div className="flex justify-end mt-2">
          <button
            className="text-orange-600 font-semibold cursor-pointer hover:text-orange-700 hover:underline transition-colors"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>

        {/* Sign In Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSignIn}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 w-full rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 cursor-pointer"
          >
            Sign In
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Button */}
        <button
          className="w-full flex items-center justify-center gap-2 border border-gray-300 px-4 py-3 rounded-lg text-gray-700 font-medium shadow-sm hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        {/* Sign Up Link */}
        <p className="text-gray-600 text-center mt-6">
          Don't have an account?
          <span
            onClick={() => navigate("/signup")}
            className="text-orange-600 font-semibold ml-2 cursor-pointer hover:underline hover:text-orange-700 transition-colors"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
