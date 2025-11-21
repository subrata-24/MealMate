import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import FoodCarousel from "../../components/FoodCarousel";
import { categories } from "../category";
import CategoryCardLanding from "../../components/CategoryCardLanding";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { allFoodItems } from "../reactQuery/AllFoodItems";
import { allShops } from "../reactQuery/AllShops";
import LandingPageFoodCart from "../../components/LandingPageFoodCart";
import HeroSection from "../../components/HeroSection";

const LandingPage = () => {
  const cateScrollRef = useRef();
  const [showCateLeftButton, setShowCateLeftButton] = useState(false);
  const [showCateRightButton, setShowCateRightButton] = useState(false);

  const { data: foods } = allFoodItems();
  const { data: shops } = allShops();
  // console.log(foods);
  // console.log(shops);

  useEffect(() => {
    const element = cateScrollRef.current;

    const handleCateScroll = () => {
      updateButton(
        cateScrollRef,
        setShowCateLeftButton,
        setShowCateRightButton
      );
    };

    if (element) {
      updateButton(
        cateScrollRef,
        setShowCateLeftButton,
        setShowCateRightButton
      );
      element.addEventListener("scroll", handleCateScroll);
    }

    return () => {
      if (element) element.removeEventListener("scroll", handleCateScroll);
    };
  }, []);

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -280 : 280,
        behavior: "smooth",
      });
    }
  };

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth - 5
      );
    }
  };

  return (
    <div>
      <Navbar />
      <HeroSection />

      {/* Show all category */}
      <section className="w-full flex flex-col gap-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pl-4 pt-4">
            🍴 Explore Categories
          </h2>
          <span className="text-sm text-gray-500 font-medium pr-4 pt-4">
            {categories.length} categories
          </span>
        </div>

        <div className="w-full relative group">
          {/* Left Scroll Button */}
          {showCateLeftButton && (
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white text-orange-600 p-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transform hover:scale-110 active:scale-95 transition-all duration-300 z-20 border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaArrowAltCircleLeft size={24} />
            </button>
          )}

          {/* Scrollable Categories */}
          <div
            className="w-full flex overflow-x-auto gap-4 sm:gap-6 pb-5 px-4 scrollbar-hide scroll-smooth shadow-2xl"
            ref={cateScrollRef}
            role="list"
          >
            {categories.map((cate, index) => (
              <div role="listitem" key={index}>
                <CategoryCardLanding name={cate.category} image={cate.image} />
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          {showCateRightButton && (
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white text-orange-600 p-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transform hover:scale-110 active:scale-95 transition-all duration-300 z-20 border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaArrowAltCircleRight size={24} />
            </button>
          )}

          {/* Gradient fade indicators */}
          {showCateLeftButton && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-orange-50 to-transparent pointer-events-none z-10" />
          )}
          {showCateRightButton && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none z-10" />
          )}
        </div>
      </section>

      {/* Show all shops */}
      <section
        className="w-full flex flex-col gap-6 shadow-2xl"
        aria-label="Shops"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pl-4 pt-4">
            Restaurant at our page
          </h2>
          <span className="text-sm text-gray-500 font-medium pr-4 pt-4">
            {shops?.length} shops
          </span>
        </div>

        <div className="w-full relative group">
          {/* Left Scroll Button */}
          {showCateLeftButton && (
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white text-orange-600 p-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transform hover:scale-110 active:scale-95 transition-all duration-300 z-20 border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              onClick={() => scrollHandler(cateScrollRef, "left")}
            >
              <FaArrowAltCircleLeft size={24} />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 sm:gap-6 pb-5 px-4 scrollbar-hide scroll-smooth shadow-2xl"
            ref={cateScrollRef}
            role="list"
          >
            {shops?.length &&
              shops.map((shop, index) => (
                <div role="listitem" key={index}>
                  <CategoryCardLanding name={shop.name} image={shop.image} />
                </div>
              ))}
          </div>

          {/* Right Scroll Button */}
          {showCateRightButton && (
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white text-orange-600 p-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transform hover:scale-110 active:scale-95 transition-all duration-300 z-20 border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              onClick={() => scrollHandler(cateScrollRef, "right")}
            >
              <FaArrowAltCircleRight size={24} />
            </button>
          )}

          {/* Gradient fade indicators */}
          {showCateLeftButton && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-orange-50 to-transparent pointer-events-none z-10" />
          )}
          {showCateRightButton && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none z-10" />
          )}
        </div>
      </section>

      {/* Food Items Section */}
      <section className="w-full flex flex-col gap-6  shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pl-4 pt-4">
            🍜 Suggested foods for You
          </h2>
          <span className="text-sm text-gray-500 font-medium pr-4">
            {foods?.length} items
          </span>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 px-4 pb-5 shadow-2xl">
          {foods?.length &&
            foods.map((food, index) => (
              <LandingPageFoodCart data={food} key={index} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
