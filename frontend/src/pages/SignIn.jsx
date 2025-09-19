import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-green-50 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-orange-100 transition-all">
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
            className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-gray-400 hover:text-orange-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Sign Up Button */}
        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            onClick={() => {
              handleSignIn();
            }}
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
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 px-4 py-3 rounded-lg text-gray-700 font-medium shadow-sm hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer">
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        {/* Sign In Link */}
        <p className="text-gray-600 text-center mt-6">
          Don't have an account?
          <span
            className="text-orange-600 font-semibold ml-2 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
