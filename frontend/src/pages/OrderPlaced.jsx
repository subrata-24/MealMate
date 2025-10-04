import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-50 via-white to-pink-50 relative overflow-hidden px-4">
      {/* Floating circles background */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-orange-200 rounded-full opacity-40 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>

      {/* Success Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-white shadow-xl rounded-3xl p-10 max-w-md w-full text-center border border-gray-100 relative z-10"
      >
        <motion.div
          initial={{ rotate: -10, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex justify-center mb-4"
        >
          <FaCheckCircle className="text-green-500 text-6xl drop-shadow-md" />
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-gray-800 mb-2"
        >
          Order Successfully Placed!
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          Thank you for shopping with us 🎉. Your delicious food is being
          prepared. You can track your order anytime from{" "}
          <span className="font-semibold text-orange-600">“My Orders”</span>.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/my-orders")}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-xl text-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          Go to My Orders
        </motion.button>
      </motion.div>

      {/* Confetti animation (simple circles) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 rounded-full bg-orange-${
              (i % 3) * 200 + 300
            } opacity-70 animate-bounce`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default OrderPlaced;
