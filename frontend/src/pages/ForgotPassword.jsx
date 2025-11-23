import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { setCurrentPage, setOpenAuthModal } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendOtp = async () => {
    setLoading(true);
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return setErrors(newErrors);
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      setLoading(false);
      console.log(result);
      setErrors({});
      setStep(2);
    } catch (error) {
      setLoading(false);
      setErrors({ global: error?.response?.data?.message });
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    let newErrors = {};
    if (!otp) newErrors.otp = "OTP is required";

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return setErrors(newErrors);
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      setLoading(false);
      console.log(result);
      setErrors({});
      setStep(3);
    } catch (error) {
      setLoading(false);
      setErrors({ global: error?.response?.data?.message });
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    let newErrors = {};
    if (!newPassword) newErrors.newPassword = "New password is required";
    else if (newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";

    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return setErrors(newErrors);
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      setLoading(false);
      console.log(result);
      setErrors({});
      dispatch(setCurrentPage("login"));
    } catch (error) {
      setLoading(false);
      setErrors({ global: error?.response?.data?.message });
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
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
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
                <p className="text-red-600 text-sm font-medium">
                  {errors.email}
                </p>
              </div>
            )}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSendOtp}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ClipLoader size={18} color="white" />
                    <span className="text-sm font-medium">Processing...</span>
                  </>
                ) : (
                  "Send OTP"
                )}
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
              required
              onChange={(e) => setOTP(e.target.value)}
              className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
            />
            {errors.otp && (
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
                <p className="text-red-600 text-sm font-medium">{errors.otp}</p>
              </div>
            )}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleVerifyOtp}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ClipLoader size={18} color="white" />
                    <span className="text-sm font-medium">Processing...</span>
                  </>
                ) : (
                  "Verify OTP"
                )}
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
              required
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all mb-2"
            />
            {errors.newPassword && (
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
                  {errors.newPassword}
                </p>
              </div>
            )}
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
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg px-4 py-3 border border-gray-200 bg-white text-gray-800 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-300 transition-all"
            />
            {errors.confirmPassword && (
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
                  {errors.confirmPassword}
                </p>
              </div>
            )}
            <div className="flex justify-center mt-6">
              <button
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300"
                onClick={handleResetPassword}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ClipLoader size={18} color="white" />
                    <span className="text-sm font-medium">Processing...</span>
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </div>
        )}
        {/* Global error */}
        {errors.global && (
          <div className="flex items-center gap-2 my-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200">
            <span className="text-red-600 text-lg font-bold">⚠️</span>
            <p className="text-red-600 text-sm font-medium">{errors.global}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
