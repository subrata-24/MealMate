import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa6";

const OwnerDashboard = () => {
  const { shopData } = useSelector((state) => state.owner);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {!shopData && (
        <div className="flex justify-center items-center p-6">
          <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Icon inside gradient circle */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-md">
                <FaUtensils className="text-white w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Bring Your Restaurant Online 🍽️
              </h2>

              {/* Subtext (shortened) */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Partner with{" "}
                <span className="font-semibold text-orange-600">MealMate </span>
                to reach more customers and grow your food business every day.
              </p>

              {/* CTA Button */}
              <button className="px-6 py-3 rounded-xl font-semibold text-white shadow-md bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:scale-105 transition-transform cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
