import React, { useState } from "react";
import { IoLocation } from "react-icons/io5";
import { FaSearch, FaCartArrowDown } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { userData, city } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full h-20 flex items-center justify-between md:justify-center px-4 md:px-8 z-[9999] bg-gradient-to-r from-orange-50 via-white to-green-100 shadow-md">
      {/* Mobile search dropdown */}
      {showSearch && (
        <div className="w-[90%] h-[70px] flex items-center fixed top-[80px] left-[5%] bg-white gap-5 shadow-2xl rounded-xl px-4 border border-orange-100 animate-fadeIn">
          {/* Location */}
          <div className="flex items-center gap-2 w-1/3 pr-3 border-r-2 border-gray-200">
            <IoLocation size={22} className="text-orange-500" />
            <span className="truncate text-gray-600 font-medium">
              {city || "Detecting..."}
            </span>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 w-2/3">
            <FaSearch size={20} className="text-orange-500" />
            <input
              type="text"
              placeholder="Search for food..."
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-orange-300 rounded-md"
            />
          </div>
        </div>
      )}

      {/* Logo */}
      <h1 className="text-3xl font-extrabold text-orange-600 tracking-tight mr-4">
        MealMate
      </h1>

      {/* Search Bar (desktop only) */}
      <div className="hidden md:flex items-center w-full md:w-2/3 lg:w-2/5 h-14 bg-white gap-4 shadow-lg rounded-xl px-4 border border-orange-100">
        <div className="flex items-center gap-2 w-1/3 pr-3 border-r-2 border-gray-200">
          <IoLocation size={22} className="text-orange-500" />
          <span className="truncate text-gray-600 font-medium">
            {city || "Detecting..."}
          </span>
        </div>
        <div className="flex items-center gap-3 w-2/3">
          <FaSearch size={20} className="text-orange-500" />
          <input
            type="text"
            placeholder="Search for food..."
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-orange-300 rounded-md"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-5 ml-4">
        {/* Search (mobile toggle) */}
        {showSearch ? (
          <RxCross2
            size={22}
            className="text-orange-500 md:hidden cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setShowSearch(false)}
          />
        ) : (
          <FaSearch
            size={20}
            className="text-orange-500 md:hidden cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setShowSearch(true)}
          />
        )}

        {/* Cart with badge */}
        <div className="relative cursor-pointer hover:scale-110 transition-transform">
          <FaCartArrowDown size={26} className="text-orange-500" />
          <span className="absolute -right-2 -top-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
            0
          </span>
        </div>

        {/* My Orders button (desktop only) */}
        <button className="hidden md:block px-4 py-2 rounded-lg bg-gradient-to-r from-orange-200 to-green-200 text-orange-700 text-sm font-semibold hover:from-orange-300 hover:to-green-300 transition-colors shadow-sm">
          My Orders
        </button>

        {/* User Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold shadow-md cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullname?.slice(0, 1)}
        </div>

        {/* Dropdown Info */}
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[200px] bg-white shadow-2xl rounded-xl flex flex-col p-4 gap-3 border border-gray-100 animate-fadeIn">
            <div className="text-lg font-semibold text-gray-900">
              {userData.fullname}
            </div>
            <div className="md:hidden text-orange-600 font-semibold cursor-pointer hover:text-red-500 transition-colors">
              My Orders
            </div>
            <div className="text-orange-600 font-semibold cursor-pointer hover:text-red-500 transition-colors">
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
