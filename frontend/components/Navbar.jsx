import React, { useState } from "react";
import { IoLocation } from "react-icons/io5";
import { FaSearch, FaCartArrowDown } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../src/App";
import { setSearchItems, setUserData } from "../src/redux/userSlice";
import { FaPlus } from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const { userData, currentCity, cartItems } = useSelector(
    (state) => state.user
  );
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [name, setName] = useState("");
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

  const handleSearchItems = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/search-items/?name=${name}&city=${currentCity}`,
        { withCredentials: true }
      );

      console.log(result.data);
      dispatch(setSearchItems(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (name) {
      handleSearchItems();
    } else {
      dispatch(setSearchItems(null));
    }
  }, [name]);

  return (
    <div className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-4 md:px-8 z-50 bg-gradient-to-r from-orange-50 via-white to-green-100 shadow-lg border-b-2 border-green-200">
      {/* Mobile search dropdown */}
      {showSearch && userData && userData.role === "user" && (
        <div className="w-[90%] h-[70px] flex items-center fixed top-[85px] left-[5%] bg-white gap-5 shadow-2xl rounded-2xl px-6 border-2 border-orange-100 z-40 animate-fadeIn">
          {/* Location */}
          <div className="flex items-center gap-2 w-1/3 pr-3 border-r-2 border-gray-200">
            <IoLocation size={22} className="text-orange-500 flex-shrink-0" />
            <span className="truncate text-sm text-gray-700 font-semibold">
              {currentCity || "Detecting..."}
            </span>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 w-2/3">
            <FaSearch size={18} className="text-orange-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for food..."
              className="w-full bg-transparent outline-none text-base text-gray-900 placeholder-gray-400 font-medium focus:ring-0"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </div>
      )}

      {/* LEFT: Logo */}
      <div className="flex-shrink-0">
        <h1
          className="text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent tracking-tight cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => navigate("/")}
        >
          MealMate
        </h1>
      </div>

      {/* Search Bar (desktop only) */}
      {userData && userData.role === "user" ? (
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8 h-14 bg-white gap-4 shadow-md hover:shadow-xl rounded-2xl px-6 border-2 border-orange-100 transition-all duration-300">
          <div className="flex items-center gap-2 w-1/3 pr-4 border-r-2 border-gray-200">
            <IoLocation size={22} className="text-orange-500 flex-shrink-0" />
            <span className="truncate text-sm text-gray-700 font-semibold">
              {currentCity || "Detecting..."}
            </span>
          </div>
          <div className="flex items-center gap-3 w-2/3">
            <FaSearch size={20} className="text-orange-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for food..."
              className="w-full bg-transparent outline-none text-base text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-0"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </div>
      ) : (
        <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8 h-14 bg-white gap-4 shadow-md hover:shadow-xl rounded-2xl px-6 border-2 border-orange-100 transition-all duration-300">
          <div className="flex items-center gap-3 w-full">
            <FaSearch size={20} className="text-orange-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for food..."
              className="w-full bg-transparent outline-none text-base text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-0"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </div>
      )}

      {/*User Controls */}
      {userData ? (
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Search (mobile toggle) and only for user*/}
          {userData.role === "user" &&
            (showSearch ? (
              <RxCross2
                size={24}
                className="text-red-500 md:hidden cursor-pointer hover:scale-110 hover:rotate-90 transition-all duration-300"
                onClick={() => setShowSearch(false)}
              />
            ) : (
              <FaSearch
                size={22}
                className="text-orange-500 md:hidden cursor-pointer hover:scale-110 transition-transform duration-300"
                onClick={() => setShowSearch(true)}
              />
            ))}

          {/* Cart with badge */}
          {userData.role === "user" && (
            <div
              className="relative cursor-pointer group"
              onClick={() => navigate("/cart")}
            >
              <FaCartArrowDown
                size={26}
                className="text-orange-500 group-hover:text-red-500 transform group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300"
              />
              {cartItems.length > 0 && (
                <span className="absolute -right-2 -top-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </div>
          )}

          {userData.role === "owner" ? (
            <>
              {shopData && (
                <>
                  {/* Desktop Add Item */}
                  <button
                    className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                    onClick={() => navigate("/add-item")}
                  >
                    <FaPlus size={16} />
                    <span>Add Item</span>
                  </button>

                  {/* Mobile Add Item */}
                  <button
                    className="md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300"
                    onClick={() => navigate("/add-item")}
                  >
                    <FaPlus size={18} />
                  </button>
                </>
              )}

              {/* Desktop Show pending orders */}
              <div
                className="relative hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/my-orders")}
              >
                <IoReceiptSharp size={18} />
                <span>Pending Orders</span>
                <span className="absolute -right-2 -top-2 bg-white text-orange-600 text-xs font-extrabold px-2 py-0.5 rounded-full shadow-md border-2 border-orange-200">
                  0
                </span>
              </div>

              {/* Mobile Show pending orders */}
              <div
                className="relative md:hidden w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/my-orders")}
              >
                <IoReceiptSharp size={20} />
                <span className="absolute -right-1 -top-1 bg-white text-orange-600 text-xs font-extrabold px-1.5 py-0.5 rounded-full shadow-md border-2 border-orange-200">
                  0
                </span>
              </div>
            </>
          ) : (
            <>
              <button
                className="hidden md:block px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                onClick={() => navigate("/my-orders")}
              >
                My Orders
              </button>
            </>
          )}

          {/* User Avatar */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg font-extrabold shadow-lg cursor-pointer transform hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            onClick={() => setShowInfo((prev) => !prev)}
          >
            {userData?.fullname?.slice(0, 1).toUpperCase()}
          </div>

          {/* Dropdown Info */}
          {showInfo && (
            <div
              className={`fixed top-[85px] right-[10px] ${
                userData.role === "deliveryBoy"
                  ? "md:right-[20%] lg:right-[34%]"
                  : "md:right-[10%] lg:right-[25%]"
              } w-[220px] bg-white shadow-2xl rounded-2xl flex flex-col p-6 gap-4 border-2 border-orange-100 z-40`}
            >
              <div className="text-lg font-bold text-gray-900 border-b-2 border-gray-100 pb-3">
                {userData.fullname}
              </div>
              {userData.role === "user" && (
                <div
                  className="md:hidden text-orange-600 font-semibold cursor-pointer hover:text-red-500 hover:translate-x-1 transition-all duration-200"
                  onClick={() => {
                    navigate("/my-orders");
                    setShowInfo(false);
                  }}
                >
                  My Orders
                </div>
              )}
              <div
                className="text-red-500 font-bold cursor-pointer hover:text-red-700 hover:translate-x-1 transition-all duration-200"
                onClick={handleSignOut}
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-shrink-0">
          <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 hover:from-orange-400 hover:via-red-500 hover:to-orange-600 text-white font-bold shadow-2xl hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 corsor-pointer">
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
