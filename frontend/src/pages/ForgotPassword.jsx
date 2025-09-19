import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(2);
  const [email, setEmail] = useState(" ");
  const [otp, setOTP] = useState();
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#fff9f6] p-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <IoMdArrowRoundBack
            size={25}
            className="text-[#ff4d2d] font-bold cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-[#ff4d2d] text-center">
            Forgot Password
          </h1>
        </div>

        {step === 1 && (
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
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
            />
            <div className="flex justify-center mt-4">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 w-full rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 cursor-pointer">
                Send OTP
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mb-4">
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
            <div className="flex justify-center mt-4">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 w-full rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 cursor-pointer">
                Verify
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
