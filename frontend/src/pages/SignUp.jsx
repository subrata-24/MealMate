import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    let newErrors = {};

    if (!fullname) newErrors.fullname = "Full name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";
    if (!mobileNo) newErrors.mobileNo = "Mobile number is required";
    else if (mobileNo.length < 11)
      newErrors.mobileNo = "Mobile No must be 11 characters";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          fullname,
          email,
          mobileNo,
          password,
          role,
        },
        { withCredentials: true }
      );
      setErrors("");

      console.log(result);
    } catch (error) {
      setErrors({ global: error?.response?.data?.message });
    }
  };

  const handleGoogleSignUp = async () => {
    let newErrors = {};
    if (!mobileNo) {
      newErrors.mobileNo = "Mobile No is required";
      setErrors(newErrors);
      return;
    }

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullname: result.user.displayName,
          email: result.user.email,
          role,
          mobileNo,
        },
        {
          withCredentials: true,
        }
      );
      setErrors("");
      console.log(data);
    } catch (error) {
      setErrors(error?.response?.data?.message);
    }
  };

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [err, setErr] = useState("");
  const [errors, setErrors] = useState({});

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

        {/* Full Name */}
        <div className="mb-4">
          <label
            htmlFor="fullname"
            className="block text-gray-700 font-medium mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
            placeholder="Enter your full name"
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            value={fullname}
            required
          />
          {errors.fullname && (
            <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-md bg-red-50 border border-red-200">
              <svg
                className="w-4 h-4 text-red-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-600 text-sm font-medium">
                {errors.fullname}
              </p>
            </div>
          )}
        </div>

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
            required
          />
          {errors.email && (
            <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-md bg-red-50 border border-red-200">
              <svg
                className="w-4 h-4 text-red-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-600 text-sm font-medium">{errors.email}</p>
            </div>
          )}
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label
            htmlFor="mobileNo"
            className="block text-gray-700 font-medium mb-2"
          >
            Mobile Number
          </label>
          <input
            type="number"
            className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
            placeholder="Enter your mobile number"
            onChange={(e) => {
              setMobileNo(e.target.value);
            }}
            value={mobileNo}
            required
          />
          {errors.mobileNo && (
            <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-md bg-red-50 border border-red-200">
              <svg
                className="w-4 h-4 text-red-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-600 text-sm font-medium">
                {errors.mobileNo}
              </p>
            </div>
          )}
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
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-gray-400 hover:text-orange-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-md bg-red-50 border border-red-200">
              <svg
                className="w-4 h-4 text-red-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-600 text-sm font-medium">
                {errors.password}
              </p>
            </div>
          )}
        </div>

        {/* Role Selection */}
        <div className="mb-4">
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
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                      : "border-orange-400 text-orange-500 hover:bg-orange-50"
                  }`}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {errors.global && (
          <div className="flex items-center gap-2 my-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200">
            <svg
              className="w-5 h-5 text-red-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-600 text-sm font-medium">{errors.global}</p>
          </div>
        )}

        {/* Sign Up Button */}
        <div className="flex justify-center">
          <button
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 w-full rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            onClick={() => {
              handleSignUp();
            }}
          >
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
        <button
          className="w-full flex items-center justify-center gap-2 border border-gray-300 px-4 py-3 rounded-lg text-gray-700 font-medium shadow-sm hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer"
          onClick={handleGoogleSignUp}
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        {/* Sign In Link */}
        <p className="text-gray-600 text-center mt-6">
          Already have an account?
          <span
            className="text-orange-600 font-semibold ml-2 cursor-pointer hover:underline"
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
