import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#fff9f6] p-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <IoMdArrowRoundBack
            size={25}
            className="text-[#ff4d2d] font-bold cursor-pointer"
          />
          <h1 className="text-2xl font-bold text-[#ff4d2d] text-center">
            Forgot Password
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
