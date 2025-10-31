import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { FaArrowLeft, FaShopify } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import FoodCart from "../../components/FoodCart";
import { FaUtensils } from "react-icons/fa6";
import { BsShop } from "react-icons/bs";

const Shop = () => {
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { shopId } = useParams();
  const navigate = useNavigate();

  const getShop = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.get(
        `${serverUrl}/api/item/get-item-by-shop/${shopId}`,
        { withCredentials: true }
      );
      console.log(result.data);
      setShop(result.data.shop);
      setItems(result.data.items);
    } catch (error) {
      console.log(error);
      setError("Failed to load shop details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getShop();
  }, [shopId]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading delicious menu...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center border border-red-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Oops!</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {shop && (
        <div className="relative h-64 w-full md:h-80 lg:h-96">
          <button
            className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/80 hover:bg-white text-orange-600 hover:text-orange-700 px-4 py-2 rounded-full shadow-lg hover:shadow-xl border-2 border-orange-200 font-semibold transform hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            onClick={() => navigate("/")}
            aria-label="Go back to home"
          >
            <FaArrowLeft />
            <span className="hidden sm:inline">Back</span>
          </button>

          <img
            src={shop.image}
            alt={shop.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 flex items-center justify-center text-center px-4 flex-col">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg mb-4">
              <BsShop className="text-white text-3xl sm:text-4xl drop-shadow-md" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight mb-3">
              {shop.name}
            </h1>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <IoLocation size={20} className="text-red-400" />
              <p className="text-base font-medium text-white">{shop.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-md">
            <FaUtensils className="text-white text-lg" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Our Menu
          </h2>
        </div>

        {/* Food Items Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <FoodCart data={item} key={item._id || index} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center  text-center">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4 border-4 border-orange-100">
              <span className="text-5xl">🍽️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Menu Available Yet
            </h3>
            <p className="text-gray-500 max-w-md mb-6">
              This restaurant hasn't added any dishes yet. Check back soon for
              delicious options!
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Other Shops
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
