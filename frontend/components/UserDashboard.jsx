import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { categories } from "../src/category";
import CategoryCard from "./CategoryCard";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import FoodCart from "./FoodCart";

const UserDashboard = () => {
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const { currentCity, shopInMyCity, itemsInMyCity } = useSelector(
    (state) => state.user
  );

  const [showCateLeftButton, setShowCateLeftButton] = useState(false);
  const [showCateRightButton, setShowCateRightButton] = useState(false);
  const [showShopLeftButton, setShowShopLeftButton] = useState(false);
  const [showShopRightButton, setShowShopRightButton] = useState(false);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      // console.log("How much you’ve scrolled from left ", element.scrollLeft);
      // console.log("How much total content exists: ", element.scrollWidth);
      // console.log("How much is visible at once: ", element.clientWidth);
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
  // -  The attached listener then calls updateButton(), which checks the current scroll position (scrollLeft)/(scrollRight) and updates state (setShowCateLeftButton, setShowCateRightButton).
  // - Because state changes, React re-renders, showing or hiding the left/right scroll buttons.

  useEffect(() => {
    const element = cateScrollRef.current;
    const shopElement = shopScrollRef.current;
    if (element) {
      updateButton(
        cateScrollRef,
        setShowCateLeftButton,
        setShowCateRightButton
      );
      element.addEventListener("scroll", handleCateScroll);
    }
    if (shopElement) {
      updateButton(
        shopScrollRef,
        setShowShopLeftButton,
        setShowShopRightButton
      );
      shopElement.addEventListener("scroll", handleShopScroll);
    }
    function handleCateScroll() {
      updateButton(
        cateScrollRef,
        setShowCateLeftButton,
        setShowCateRightButton
      );
    }
    function handleShopScroll() {
      updateButton(
        shopScrollRef,
        setShowShopLeftButton,
        setShowShopRightButton
      );
    }
    return () => {
      if (element) element.removeEventListener("scroll", handleCateScroll);
      if (shopElement)
        shopElement.removeEventListener("scroll", handleShopScroll);
    };
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
    <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-y-auto">
      {/* Navbar */}
      <Navbar />

      {/* Page Body */}
      {/* Category */}
      <div className="w-full max-w-6xl flex flex-col gap-6 items-start px-4 sm:px-6 py-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Inspiration for your first order
        </h1>

        {/* Categories Section */}
        <div className="w-full relative">
          {/* Left Scroll Button */}
          {showCateLeftButton && (
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
              <CategoryCard
                name={cate.category}
                image={cate.image}
                key={index}
              />
            ))}
          </div>

          {/* Right Scroll Button */}
          {showCateRightButton && (
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaArrowAltCircleRight size={28} />
            </button>
          )}
        </div>
      </div>

      {/* Shop */}
      <div className="w-full max-w-6xl flex flex-col gap-6 items-start px-4 sm:px-6 py-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {`Best Shop in ${currentCity}`}
        </h1>

        <div className="w-full relative">
          {showShopLeftButton && (
            <button
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
              onClick={() => scrollHandler(shopScrollRef, "left")}
            >
              <FaArrowAltCircleLeft size={28} />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 pb-3 px-10 scrollbar-hide scroll-smooth"
            ref={shopScrollRef}
          >
            {shopInMyCity.map((shop, index) => (
              <CategoryCard name={shop.name} image={shop.image} key={index} />
            ))}
          </div>

          {showShopRightButton && (
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
              onClick={() => scrollHandler(shopScrollRef, "right")}
            >
              <FaArrowAltCircleRight size={28} />
            </button>
          )}
        </div>
      </div>

      {/* Item */}
      <div className="w-full max-w-6xl flex flex-col gap-6 items-start px-4 sm:px-6 py-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Suggested food for you
        </h1>
        <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center ">
          {itemsInMyCity.map((item, index) => (
            <FoodCart data={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
