import React, { useState } from "react";
import { IoLocation } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

const UserDashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full h-20 flex items-center justify-between md:justify-center px-4 md:px-8 z-[9999] bg-gradient-to-r from-orange-50 via-white to-green-50 shadow-md">
      {showSearch && (
        <div className="w-[90%] h-[70px] flex items-center fixed top-[80px] left[5%]  bg-white gap-[20px] shadow-xl rounded-lg px-4 border border-orange-100">
          {/* Location */}
          <div className="flex items-center gap-2 w-1/3 pr-3 border-r-2 border-gray-400">
            <IoLocation size={22} className="text-orange-500" />
            <span className="truncate text-gray-600 font-medium">Barishal</span>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 w-2/3">
            <FaSearch size={20} className="text-orange-500" />
            <input
              type="text"
              placeholder="Search for food..."
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      )}

      {/* Logo */}
      <h1 className="text-3xl font-extrabold text-orange-600 tracking-tight mr-4">
        MealMate
      </h1>

      {/* Search Bar */}
      <div className="hidden md:flex items-center w-full md:w-2/3 lg:w-2/5 h-14 bg-white gap-4 shadow-lg rounded-xl px-4 border border-orange-100">
        {/* Location */}
        <div className="flex items-center gap-2 w-1/3 pr-3 border-r-2 border-gray-400">
          <IoLocation size={22} className="text-orange-500" />
          <span className="truncate text-gray-600 font-medium">Barishal</span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 w-2/3">
          <FaSearch size={20} className="text-orange-500" />
          <input
            type="text"
            placeholder="Search for food..."
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>
      <div className="flex items-center gap-5 ml-4">
        {/* Search (mobile only) */}
        {showSearch ? (
          <RxCross2
            size={20}
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
        <div className="relative cursor-pointer">
          <FaCartArrowDown
            size={26}
            className="text-orange-500 hover:scale-110 transition-transform"
          />
          <span className="absolute -right-2 -top-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
            0
          </span>
        </div>

        {/* My Orders button (desktop only) */}
        <button className="hidden md:block px-4 py-2 rounded-lg bg-orange-100 text-orange-600 text-sm font-semibold hover:bg-orange-200 transition-colors shadow-sm">
          My Orders
        </button>

        {/* User Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold shadow-md cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullname?.slice(0, 1)}
        </div>

        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] shadow-2xl rounded-xl flex flex-col p-[20px] gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">{userData.fullname}</div>
            <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
              My Orders
            </div>
            <div className="text-[#ff4d2d] font-semibold cursor-pointer">
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
