import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ImLocation2 } from "react-icons/im";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";

const CheckOut = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-orange-50 to-red-50 font-[Inter] relative">
      {/* Back Button */}
      <button
        className="absolute top-6 left-6 flex items-center justify-center rounded-full bg-white shadow-md p-2 hover:shadow-lg hover:scale-105 transition cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack className="text-orange-500" size={30} />
      </button>

      {/* Checkout Card */}
      <div className="w-full max-w-[800px] bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>

        {/* Delivery Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
            <ImLocation2 className="text-orange-500" />
            Delivery Location
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
              placeholder="Enter your delivery location..."
            />

            {/* Search Button */}
            <button className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition flex items-center justify-center cursor-pointer">
              <FaMagnifyingGlassLocation size={18} />
            </button>

            {/* Current Location Button */}
            <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:scale-105 transition flex items-center justify-center cursor-pointer">
              <BiCurrentLocation size={20} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckOut;
