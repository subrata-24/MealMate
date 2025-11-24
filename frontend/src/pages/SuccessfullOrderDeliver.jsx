import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SuccessfullOrderDeliver = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-100 via-pink-50 to-yellow-100 relative overflow-hidden px-4">
      {/* Floating gradient circles */}
      <div className="absolute top-14 left-14 w-32 h-32 bg-gradient-to-tr from-orange-300 via-white to-orange-100 rounded-full opacity-50 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-24 right-14 w-40 h-40 bg-gradient-to-br from-pink-200 via-white to-pink-100 rounded-full opacity-40 blur-3xl animate-pulse"></div>

      {/* Success Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-white shadow-2xl rounded-3xl p-12 max-w-md w-full text-center border border-gray-100 relative z-10"
      >
        <motion.div
          initial={{ rotate: -8, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <FaCheckCircle className="text-green-500 text-7xl drop-shadow-lg" />
        </motion.div>

        <motion.h1
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-3xl font-extrabold text-gray-800 mb-3"
        >
          Delivery completed!
        </motion.h1>

        <motion.p
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-gray-600 mb-10 leading-relaxed"
        >
          Great job! The order was delivered successfully.
          <br />
          Keep up the good work and continue providing excellent service.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#fb7185" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/home")}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 rounded-xl text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          Back to Dashboard
        </motion.button>
      </motion.div>

      {/* Confetti animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3.5 h-3.5 rounded-full 
              ${
                i % 2 ? "bg-orange-400" : "bg-pink-400"
              } opacity-70 animate-bounce`}
            style={{
              top: `${Math.random() * 92 + 4}%`,
              left: `${Math.random() * 86 + 6}%`,
              animationDelay: `${i * 0.14}s`,
              animationDuration: `${2.2 + Math.random() * 1.4}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SuccessfullOrderDeliver;
