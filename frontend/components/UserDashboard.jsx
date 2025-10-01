import React, { useRef } from "react";
import Navbar from "./Navbar";
import { categories } from "../src/category";
import CategoryCard from "./CategoryCard";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const UserDashboard = () => {
  const cateScrollRef = useRef();

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -220 : 220, // matches card width + gap
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col gap-8 items-center bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-y-auto">
      {/* Navbar */}
      <Navbar />

      {/* Page Body */}
      <div className="w-full max-w-6xl flex flex-col gap-6 items-start px-4 sm:px-6 py-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Inspiration for your first order
        </h1>

        {/* Categories Section */}
        <div className="w-full relative">
          {/* Left Scroll Button */}
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
            onClick={() => scrollHandler(cateScrollRef, "left")}
          >
            <FaArrowAltCircleLeft size={28} />
          </button>

          {/* Scrollable Categories */}
          <div
            className="w-full flex overflow-x-auto gap-4 pb-3 px-10 scrollbar-hide scroll-smooth"
            ref={cateScrollRef}
          >
            {categories.map((cate, index) => (
              <CategoryCard data={cate} key={index} />
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
            onClick={() => scrollHandler(cateScrollRef, "right")}
          >
            <FaArrowAltCircleRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
