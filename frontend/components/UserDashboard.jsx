import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { categories } from "../src/category";
import CategoryCard from "./CategoryCard";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const UserDashboard = () => {
  const cateScrollRef = useRef();
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      console.log("How much you’ve scrolled from left ", element.scrollLeft);
      console.log("How much total content exists: ", element.scrollWidth);
      console.log("How much is visible at once: ", element.clientWidth);
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth
      );
    }
  };

  // Working and flow of useEfect()
  // -  After the component mounts, useEffect runs.
  // - It checks if cateScrollRef.current exists (the scrollable div).
  // - If it exists, it attaches a scroll event listener to that element.
  // -  Whenever the user scrolls that div (manually or by button click), the browser automatically fires a scroll event.
  // -  The attached listener then calls updateButton(), which checks the current scroll position (scrollLeft)/(scrollRight) and updates state (setShowLeftButton, setShowRightButton).
  // - Because state changes, React re-renders, showing or hiding the left/right scroll buttons.

  useEffect(() => {
    const element = cateScrollRef.current;
    if (element) {
      // Check when first render
      updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
      const handleScroll = () => {
        updateButton(cateScrollRef, setShowLeftButton, setShowRightButton);
      };
      element.addEventListener("scroll", handleScroll);

      // cleanup on unmount
      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -220 : 220,
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
          {showLeftButton && (
            <button
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaArrowAltCircleLeft size={28} />
            </button>
          )}

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
          {showRightButton && (
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaArrowAltCircleRight size={28} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
