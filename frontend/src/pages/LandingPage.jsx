import React, { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "../../components/Navbar";
import FoodCarousel from "../../components/FoodCarousel";
import { categories } from "../category";
import CategoryCardLanding from "../../components/CategoryCardLanding";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { allFoodItems } from "../reactQuery/AllFoodItems";
import { allShops } from "../reactQuery/AllShops";
import LandingPageFoodCart from "../../components/LandingPageFoodCart";
import HeroSection from "../../components/HeroSection";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setOpenAuthModal } from "../redux/userSlice";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Modal from "../../components/Modal";

const LandingPage = () => {
  const cateScrollRef = useRef(null);
  const shopScrollRef = useRef(null);

  const [showCateLeftButton, setShowCateLeftButton] = useState(false);
  const [showCateRightButton, setShowCateRightButton] = useState(false);
  const [showShopLeftButton, setShowShopLeftButton] = useState(false);
  const [showShopRightButton, setShowShopRightButton] = useState(false);
  const { userData, openAuthModal, currentPage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const { data: foods = [] } = allFoodItems();
  const { data: shops = [] } = allShops();

  // Memoized scroll button updater
  const updateButton = useCallback((ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth - 5
      );
    }
  }, []);

  // Scroll handler with smooth behavior
  const scrollHandler = useCallback((ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -280 : 280,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const cateElement = cateScrollRef.current;
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

    if (cateElement) {
      updateButton(
        cateScrollRef,
        setShowCateLeftButton,
        setShowCateRightButton
      );
      cateElement.addEventListener("scroll", handleCateScroll);
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
      if (cateElement)
        cateElement.removeEventListener("scroll", handleCateScroll);
      if (shopElement)
        shopElement.removeEventListener("scroll", handleShopScroll);
    };
  }, [updateButton]);

  // Reusable scroll button component
  const ScrollButton = ({ direction, show, onClick }) => {
    if (!show) return null;

    const Icon =
      direction === "left" ? FaArrowAltCircleLeft : FaArrowAltCircleRight;
    const position = direction === "left" ? "left-2" : "right-2";

    return (
      <button
        className={`absolute top-1/2 ${position} -translate-y-1/2 bg-white text-orange-600 p-3 rounded-full shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transform hover:scale-110 active:scale-95 transition-all duration-300 z-20 border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2`}
        onClick={onClick}
        aria-label={`Scroll ${direction}`}
      >
        <Icon size={24} />
      </button>
    );
  };

  // Reusable gradient fade component
  const GradientFade = ({ direction, show }) => {
    if (!show) return null;

    const position = direction === "left" ? "left-0" : "right-0";
    const gradient =
      direction === "left"
        ? "bg-gradient-to-r from-white to-transparent"
        : "bg-gradient-to-l from-white to-transparent";

    return (
      <div
        className={`absolute ${position} top-0 bottom-0 w-16 ${gradient} pointer-events-none z-10`}
      />
    );
  };

  // Reusable section header
  const SectionHeader = ({ emoji, title, count, label }) => (
    <div className="flex items-center justify-between px-4 pt-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
        {emoji} {title}
      </h2>
      <span className="text-sm text-gray-500 font-medium">
        {count} {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50/30">
      <Navbar />
      {/* Modal section */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          dispatch(setOpenAuthModal(false));
          dispatch(setCurrentPage("login"));
        }}
      >
        <div>
          {currentPage === "login" && <SignIn />}
          {currentPage === "signup" && <SignUp />}
        </div>
      </Modal>
      <HeroSection />
      <FoodCarousel />

      {/* Categories Section */}
      <section className="w-full py-8" aria-label="Categories">
        <SectionHeader
          emoji="🍴"
          title="Explore Categories"
          count={categories.length}
          label="categories"
        />

        <div className="w-full relative mt-6">
          <ScrollButton
            direction="left"
            show={showCateLeftButton}
            onClick={() => scrollHandler(cateScrollRef, "left")}
          />

          <div
            className="w-full flex overflow-x-auto gap-4 sm:gap-6 pb-5 px-4 scrollbar-hide scroll-smooth"
            ref={cateScrollRef}
            role="list"
          >
            {categories.map((cate, index) => (
              <div role="listitem" key={`category-${index}`}>
                <CategoryCardLanding name={cate.category} image={cate.image} />
              </div>
            ))}
          </div>

          <ScrollButton
            direction="right"
            show={showCateRightButton}
            onClick={() => scrollHandler(cateScrollRef, "right")}
          />

          <GradientFade direction="left" show={showCateLeftButton} />
          <GradientFade direction="right" show={showCateRightButton} />
        </div>
      </section>

      {/* Shops Section */}
      <section className="w-full py-8" aria-label="Shops">
        <SectionHeader
          emoji="🏪"
          title="Top Restaurants"
          count={shops.length}
          label="shops"
        />

        <div className="w-full relative mt-6">
          <ScrollButton
            direction="left"
            show={showShopLeftButton}
            onClick={() => scrollHandler(shopScrollRef, "left")}
          />

          <div
            className="w-full flex overflow-x-auto gap-4 sm:gap-6 pb-5 px-4 scrollbar-hide scroll-smooth"
            ref={shopScrollRef}
            role="list"
          >
            {shops.map((shop, index) => (
              <div role="listitem" key={`shop-${shop.id || index}`}>
                <CategoryCardLanding name={shop.name} image={shop.image} />
              </div>
            ))}
          </div>

          <ScrollButton
            direction="right"
            show={showShopRightButton}
            onClick={() => scrollHandler(shopScrollRef, "right")}
          />

          <GradientFade direction="left" show={showShopLeftButton} />
          <GradientFade direction="right" show={showShopRightButton} />
        </div>
      </section>

      {/* Food Items Section */}
      <section className="w-full py-8" aria-label="Food Items">
        <SectionHeader
          emoji="🍜"
          title="Tasty Treats for You"
          count={foods.length}
          label="items"
        />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6 px-4 mt-6 pb-8">
          {foods.map((food, index) => (
            <LandingPageFoodCart data={food} key={food.id || `food-${index}`} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
