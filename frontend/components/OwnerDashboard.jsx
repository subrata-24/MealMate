import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { FaUtensils, FaStore, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import OwnerItemCard from "./OwnerItemCard";
import Footer from "./Footer";

const OwnerDashboard = () => {
  const { shopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50">
      <Navbar />

      {!shopData && (
        <div className="flex justify-center items-center p-6 min-h-[calc(100vh-80px)]">
          <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-12 border border-orange-100 hover:shadow-3xl transition-all duration-300">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 shadow-lg">
                <FaUtensils className="text-white w-12 h-12" />
              </div>

              <h2 className="text-4xl font-bold text-gray-900">
                Bring Your Restaurant Online 🍽️
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                Partner with{" "}
                <span className="font-semibold text-orange-600">MealMate</span>{" "}
                to reach more customers and grow your food business every day.
              </p>

              <button
                className="px-8 py-4 rounded-xl font-semibold text-white text-lg shadow-lg bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                onClick={() => navigate("/create-edit-shop")}
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      )}

      {shopData && (
        <div className="w-full pb-16">
          {/* Hero Restaurant Showcase - Full Width */}
          <div className="relative w-full">
            {/* Large Banner Image */}
            <div className="relative w-full h-[65vh] min-h-[450px] max-h-[650px]">
              <img
                src={shopData.image}
                alt={shopData.name}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>

              {/* Restaurant Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-10">
                <div className="max-w-7xl mx-auto">
                  {/* Restaurant Badge */}
                  <div className="inline-block px-4 py-2 bg-orange-500/90 backdrop-blur-sm rounded-lg mb-4">
                    <span className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
                      <FaStore className="w-4 h-4" />
                      Restaurant Dashboard
                    </span>
                  </div>

                  {/* Restaurant Name */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
                    {shopData.name}
                  </h1>

                  {/* Location & Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                    {/* Location Card */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/80 flex items-center justify-center flex-shrink-0">
                          <FaMapMarkerAlt className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white/70 text-xs font-medium mb-1 uppercase tracking-wide">
                            Location
                          </p>
                          <p className="text-white font-semibold text-sm">
                            {shopData.address}
                          </p>
                          <p className="text-white/90 text-xs mt-0.5">
                            {shopData.city}, {shopData.state}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Total Items Card */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/80 flex items-center justify-center flex-shrink-0">
                          <MdRestaurantMenu className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white/70 text-xs font-medium mb-1 uppercase tracking-wide">
                            Menu Items
                          </p>
                          <p className="text-white font-bold text-2xl">
                            {shopData.items.length}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status Card */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/80 flex items-center justify-center flex-shrink-0">
                          <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                        </div>
                        <div>
                          <p className="text-white/70 text-xs font-medium mb-1 uppercase tracking-wide">
                            Status
                          </p>
                          <p className="text-white font-semibold text-sm">
                            Active & Online
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                className="absolute top-6 right-6 px-5 py-3 rounded-xl font-semibold text-white shadow-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                onClick={() => navigate("/create-edit-shop")}
              >
                <FaPencilAlt size={16} />
                Edit Restaurant
              </button>
            </div>
          </div>

          {/* Menu Items Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                  <MdRestaurantMenu className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Menu Items
                  </h2>
                  <p className="text-gray-600 text-sm mt-0.5">
                    Manage your delicious offerings
                  </p>
                </div>
              </div>

              <button
                className="px-6 py-3 rounded-xl font-semibold text-white shadow-lg bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                onClick={() => navigate("/add-item")}
              >
                <FaPlus size={16} />
                Add Item
              </button>
            </div>

            {shopData.items.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-orange-100 mb-6">
                  <FaUtensils className="text-orange-500 w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  No Menu Items Yet
                </h3>
                <p className="text-gray-600 text-center text-lg mb-8 max-w-md">
                  Start building your menu by adding delicious items that your
                  customers will love.
                </p>
                <button
                  className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                  onClick={() => navigate("/add-item")}
                >
                  <FaPlus size={18} />
                  Add Your First Item
                </button>
              </div>
            )}

            {shopData.items.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shopData.items.map((data, index) => (
                  <OwnerItemCard data={data} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
