import React, { useState } from "react";
import { IoLocation } from "react-icons/io5";
import { FaSearch, FaCartArrowDown } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../src/App";
import { setUserData } from "../src/redux/userSlice";
import { FaPlus } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { userData, currentCity, cartItems } = useSelector(
    (state) => state.user
  );
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const { shopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-20 flex items-center justify-between md:justify-center px-4 md:px-8 z-[9999] bg-gradient-to-r from-orange-50 via-white to-green-100 shadow-md">
      {/* Mobile search dropdown */}
      {showSearch && userData.role === "user" && (
        <div className="w-[90%] h-[70px] flex items-center fixed top-[80px] left-[5%] bg-white gap-5 shadow-2xl rounded-xl px-4 border border-orange-100 animate-fadeIn">
          {/* Location */}
          <div className="flex items-center gap-2 w-1/3 pr-3 border-r-2 border-gray-200">
            <IoLocation size={22} className="text-orange-500" />
            <span className="truncate text-gray-600 font-medium">
              {currentCity || "Detecting..."}
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

      {/* Search Bar (desktop only) and only for user */}
      {userData.role === "user" && (
        <div className="hidden md:flex items-center w-full md:w-2/3 lg:w-2/5 h-14 bg-white gap-4 shadow-lg rounded-xl px-4 border border-orange-100">
          <div className="flex items-center gap-2 w-1/3 pr-3 border-r-2 border-gray-200">
            <IoLocation size={22} className="text-orange-500" />
            <span className="truncate text-gray-600 font-medium">
              {currentCity || "Detecting..."}
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
      )}

      {/* Right section */}
      <div className="flex items-center gap-5 ml-4">
        {/* Search (mobile toggle) and only for user*/}
        {userData.role === "user" &&
          (showSearch ? (
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
          ))}

        {/* Cart with badge */}
        {userData.role === "user" && (
          <div className="relative cursor-pointer hover:scale-110 transition-transform">
            <FaCartArrowDown
              size={26}
              className="text-orange-500 cursor-pointer"
              onClick={() => navigate("/cart")}
            />
            <span className="absolute -right-2 -top-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
              {cartItems.length}
            </span>
          </div>
        )}

        {userData.role === "owner" ? (
          <>
            {shopData && (
              <>
                {/* Desktop Add Item */}
                <button
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-200 to-green-200  font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => navigate("/add-item")}
                >
                  <FaPlus size={16} />
                  <span>Add Item</span>
                </button>

                {/* Mobile Add Item */}
                <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <FaPlus size={18} />
                </button>
              </>
            )}

            {/* Desktop Show pending item */}
            <div
              className="relative hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-200 to-green-200 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate("/my-orders")}
            >
              <IoReceiptSharp size={16} />
              <span>Pending Orders</span>
              <span className="absolute -right-2 -top-2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                0
              </span>
            </div>

            {/* Mobile Show pending item */}
            <div
              className="relative md:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate("/my-orders")}
            >
              <IoReceiptSharp size={16} />
              <span className="absolute -right-2 -top-2 bg-gradient-to-r from-orange-200 to-green-200 text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                0
              </span>
            </div>
          </>
        ) : (
          <>
            <button
              className="hidden md:block px-4 py-2 rounded-lg bg-gradient-to-r from-orange-200 to-green-200 text-orange-700 text-sm font-semibold hover:from-orange-300 hover:to-green-300 transition-colors shadow-sm cursor-pointer"
              onClick={() => navigate("/my-orders")}
            >
              My Orders
            </button>
          </>
        )}

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
            {userData.role === "user" && (
              <div
                className="md:hidden text-orange-600 font-semibold cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => navigate("/my-orders")}
              >
                My Orders
              </div>
            )}
            <div
              className="text-orange-600 font-semibold cursor-pointer hover:text-red-500 transition-colors"
              onClick={handleSignOut}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
