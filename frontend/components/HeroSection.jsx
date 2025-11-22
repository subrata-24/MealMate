import React from "react";
import FoodCarousel from "./FoodCarousel";
import video from "../src/assets/video.mp4";

const ArrowRight = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

const HeroSection = () => (
  <div className="relative min-h-screen pt-5 bg-gradient-to-br from-orange-50 via-white to-pink-50 overflow-hidden">
    {/* Animated Background Shapes */}
    <div className="absolute top-20 right-20 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
    <div
      className="absolute bottom-20 left-20 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: "1s" }}
    ></div>

    <div className="max-w-8xl px-15 mx-auto py-20 mt-5">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-orange-100 to-pink-100 border-2 border-orange-200 rounded-full shadow-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
            </span>
            <span className="text-orange-700 font-bold text-sm tracking-wide">
              🎉 Get 50% OFF on First Order!
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none">
              <span className="block text-gray-900">Cravings For</span>
              <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 bg-clip-text text-transparent">
                Delicious Food? <span className="text-gray-900">🍔</span>
                {/* <span className="block text-gray-900 flex items-center gap-4">
                  🍔
                </span> */}
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Discover amazing flavors from{" "}
              <span className="font-bold text-orange-600">
                500+ restaurants
              </span>{" "}
              delivered fresh to your doorstep in{" "}
              <span className="font-bold text-orange-600">
                under 30 minutes
              </span>
              !
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-orange-500/40 hover:shadow-3xl hover:shadow-orange-500/60 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 relative overflow-hidden">
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <span className="relative">Order Now</span>
              <span className="relative group-hover:translate-x-1 transition-transform">
                <ArrowRight />
              </span>
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-900 rounded-2xl font-bold text-lg hover:bg-gray-900 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-xl">
              Explore Menu
            </button>
          </div>

          <div className="flex gap-8 pt-4">
            <div className="space-y-1">
              <p className="text-4xl font-black text-gray-900">500+</p>
              <p className="text-sm text-gray-600 font-semibold">Restaurants</p>
            </div>
            <div className="w-px bg-gray-300"></div>
            <div className="space-y-1">
              <p className="text-4xl font-black text-gray-900">50K+</p>
              <p className="text-sm text-gray-600 font-semibold">
                Happy Customers
              </p>
            </div>
            <div className="w-px bg-gray-300"></div>
            <div className="space-y-1">
              <p className="text-4xl font-black text-gray-900 flex items-center gap-2">
                4.9 <span className="text-yellow-500">⭐</span>
              </p>
              <p className="text-sm text-gray-600 font-semibold">
                Average Rating
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 pt-2">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-600 border-4 border-white shadow-lg"
                ></div>
              ))}
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-black text-gray-900 text-lg">5,000+</span>{" "}
                orders delivered today
              </p>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative h-[600px] z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-[3rem] transform rotate-6 shadow-2xl"></div>
          <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=1000&fit=crop"
              alt="Delicious food"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Floating Cards */}
            <div
              className="absolute top-8 left-8 bg-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              <p className="text-sm text-gray-600 font-semibold">
                🔥 Trending Now
              </p>
              <p className="text-lg font-black text-gray-900">Hot Deals!</p>
            </div>

            <div className="absolute bottom-8 right-8 bg-gradient-to-br from-green-400 to-emerald-600 px-6 py-4 rounded-2xl shadow-2xl text-white">
              <p className="text-sm font-semibold">⚡ Fast Delivery</p>
              <p className="text-2xl font-black">30 min</p>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -right-4 bg-white px-5 py-3 rounded-2xl shadow-2xl border-4 border-orange-200">
              <p className="text-3xl font-black text-orange-600">50% OFF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;
