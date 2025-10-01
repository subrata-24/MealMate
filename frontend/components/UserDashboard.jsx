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
        left: direction == "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col gap-6 items-center bg-[#fff9f6] overflow-y-auto">
      {/* Navbar */}
      <Navbar />

      {/* Page Body */}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start px-4 sm:px-6 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Inspiration for your first order
        </h1>

        {/* Categories Grid */}
        <div className="w-full relative">
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 "
            onClick={() => scrollHandler(cateScrollRef, "left")}
          >
            <FaArrowAltCircleLeft />
          </button>
          <div
            className="w-full flex overflow-x-auto gap-4 pb-2"
            ref={cateScrollRef}
          >
            {categories.map((cate, index) => (
              <CategoryCard data={cate} key={index} />
            ))}
          </div>
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10 "
            onClick={() => scrollHandler(cateScrollRef, "right")}
          >
            <FaArrowAltCircleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
