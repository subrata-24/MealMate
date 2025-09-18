import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-gray-50 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-100 transition-all">
        {/* Logo / Title */}
        <h1 className="text-4xl font-extrabold mb-2 text-gray-800 text-center">
          MealMate
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Create your account and start enjoying fast, fresh, and delicious
          meals.
        </p>

        {/* Full Name */}
        <div className="mb-5">
          <label
            htmlFor="fullName"
            className="block text-gray-700 font-medium mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
            placeholder="Enter your email"
          />
        </div>

        {/* Mobile Number */}
        <div className="mb-5">
          <label
            htmlFor="mobileNo"
            className="block text-gray-700 font-medium mb-2"
          >
            Mobile Number
          </label>
          <input
            type="number"
            className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
            placeholder="Enter your mobile number"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-2"
          >
            Choose Your Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                className={`flex-1 rounded-lg px-3 py-2 text-center font-medium transition-all border cursor-pointer
                  ${
                    role === r
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md"
                      : "border-indigo-500 text-indigo-500 hover:bg-indigo-50"
                  }`}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Up Button */}
        <div className="flex justify-center">
          <button className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-semibold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            Sign Up
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
        <p className="text-gray-500 text-center mt-6">
          Already have an account?
          <span
            className="text-indigo-600 font-semibold ml-2 cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
