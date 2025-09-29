import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";

const OwnerDashboard = () => {
  const { shopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();
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
              <button
                className="px-6 py-3 rounded-xl font-semibold text-white shadow-md bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
                onClick={() => navigate("/create-edit-shop")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
      {shopData && (
        <div className="w-full flex flex-col items-center gap-6 px-4 sm:px-6">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl flex items-center text-gray-900 gap-3 mt-8 text-center font-bold">
            <FaUtensils className="text-orange-500 w-8 h-8 sm:w-10 sm:h-10" />
            Welcome to {shopData.name}
          </h1>

          {/* Card */}
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative">
            {/* Edit Button */}
            <div
              className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-2 rounded-full shadow-md hover:scale-105 transform transition-all cursor-pointer"
              onClick={() => navigate("/create-edit-shop")}
            >
              <FaPencilAlt size={18} />
            </div>

            {/* Banner Image */}
            <img
              src={shopData.image}
              alt={shopData.name}
              className="w-full h-48 sm:h-64 object-cover"
            />

            {/* Info Section */}
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
                {shopData.name}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {shopData.city}, {shopData.state}
              </p>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                {shopData.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
