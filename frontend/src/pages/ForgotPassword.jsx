import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setStep(2);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50 p-4 font-sans">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white shadow-2xl hover:shadow-3xl transition-shadow">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <IoMdArrowRoundBack
            size={28}
            className="text-orange-600 cursor-pointer hover:text-orange-700 transition-colors"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-3xl font-extrabold text-orange-600 tracking-tight">
            Forgot Password
          </h1>
        </div>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div>
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
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
            />
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300"
              >
                Send OTP
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <div>
            <label
              htmlFor="otp"
              className="block text-gray-700 font-medium mb-2"
            >
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
            />
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setStep(3)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300"
              >
                Verify
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <div>
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all mb-4"
            />
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Enter password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
            />
            <div className="flex justify-center mt-6">
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300">
                Reset Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
