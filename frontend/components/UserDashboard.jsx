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
  const [showFoodByCategory, setShowFoodByCategory] = useState([]);

  const filterFoodByCategory = (category) => {
    if (category == "All") {
      setShowFoodByCategory(itemsInMyCity);
    } else {
      const filteredItems = itemsInMyCity.filter(
        (item) => item.category == category
      );
      setShowFoodByCategory(filteredItems);
    }
  };

  useEffect(() => {
    setShowFoodByCategory(itemsInMyCity);
  }, [itemsInMyCity]);

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth - 5
      );
    }
  };

  useEffect(() => {
    const element = cateScrollRef.current;
    const shopElement = shopScrollRef.current;

    const handleCateScroll = () => {
      updateButton(
        cateScrollRef,
        setShowCateLeftButton,
        setShowCateRightButton
      );
    };

    const handleShopScroll = () => {
      updateButton(
        shopScrollRef,
        setShowShopLeftButton,
        setShowShopRightButton
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

    if (shopElement) {
      updateButton(
        shopScrollRef,
        setShowShopLeftButton,
        setShowShopRightButton
      );
      shopElement.addEventListener("scroll", handleShopScroll);
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
        left: direction === "left" ? -280 : 280,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col gap-8 items-center bg-gradient-to-br from-orange-50 via-white to-green-50 overflow-y-auto pb-12">
      {/* Navbar */}
      <Navbar />

      {/* Page Body - Maximum width container */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-9">
        {/* Categories Section */}
        <section
          className="w-full flex flex-col gap-6 shadow-2xl"
          aria-label="Food Categories"
        >
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
                aria-label="Scroll categories left"
              >
                <FaArrowAltCircleLeft size={24} />
              </button>
            )}

            {/* Scrollable Categories */}
            <div
              className="w-full flex overflow-x-auto gap-4 sm:gap-6 pb-5 px-4 scrollbar-hide scroll-smooth shadow-2xl"
              ref={cateScrollRef}
              role="list"
              aria-label="Category list"
            >
              {categories.map((cate, index) => (
                <div role="listitem" key={index}>
                  <CategoryCard
                    name={cate.category}
                    image={cate.image}
                    clickInCategory={() => filterFoodByCategory(cate.category)}
                  />
                </div>
              ))}
            </div>

            {/* Right Scroll Button */}
            {showCateRightButton && (
              <button
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white text-orange-600 p-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transform hover:scale-110 active:scale-95 transition-all duration-300 z-20 border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                onClick={() => scrollHandler(cateScrollRef, "right")}
                aria-label="Scroll categories right"
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

        {/* Shops Section */}
        <section
          className="w-full flex flex-col gap-6 shadow-2xl"
          aria-label="Local Shops"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pl-4">
              🏬 Best Shops in{" "}
              <span className="text-orange-600">{currentCity}</span>
            </h2>
            <span className="text-sm text-gray-500 font-medium pr-4">
              {shopInMyCity.length} shops
            </span>
          </div>

          <div className="w-full relative group">
            {showShopLeftButton && (
              <button
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white text-orange-600 p-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transform hover:scale-110 active:scale-95 transition-all duration-300 z-20 border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                onClick={() => scrollHandler(shopScrollRef, "left")}
                aria-label="Scroll shops left"
              >
                <FaArrowAltCircleLeft size={24} />
              </button>
            )}

            <div
              className="w-full flex overflow-x-auto gap-4 sm:gap-6 pb-5 px-4 scrollbar-hide scroll-smooth shadow-2xl"
              ref={shopScrollRef}
              role="list"
              aria-label="Shop list"
            >
              {shopInMyCity.map((shop, index) => (
                <div role="listitem" key={index}>
                  <CategoryCard name={shop.name} image={shop.image} />
                </div>
              ))}
            </div>

            {showShopRightButton && (
              <button
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white text-orange-600 p-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transform hover:scale-110 active:scale-95 transition-all duration-300 z-20 border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                onClick={() => scrollHandler(shopScrollRef, "right")}
                aria-label="Scroll shops right"
              >
                <FaArrowAltCircleRight size={24} />
              </button>
            )}

            {showShopLeftButton && (
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            )}
            {showShopRightButton && (
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            )}
          </div>
        </section>

        {/* Food Items Section */}
        <section
          className="w-full flex flex-col gap-6 shadow-2xl"
          aria-label="Suggested Food Items"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight pl-4">
              🍜 Suggested for You
            </h2>
            <span className="text-sm text-gray-500 font-medium pr-4">
              {showFoodByCategory.length} items
            </span>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 px-4 pb-5 shadow-2xl">
            {showFoodByCategory.map((item, index) => (
              <FoodCart data={item} key={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
