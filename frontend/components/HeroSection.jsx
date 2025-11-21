import React from "react";
import FoodCarousel from "./FoodCarousel";
import video from "../src/assets/video.mp4";

const HeroSection = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section - Optimized Spacing */}
      <div className="h-screen max-h-screen w-full flex items-center px-2 sm:px-4 lg:px-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-[45%_55%] gap-4 lg:gap-6 items-center h-full py-6">
          {/* Left Side - Content (More to the left) */}
          <div className="space-y-4 lg:space-y-5 pl-2 lg:pl-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-orange-600 font-semibold text-sm">
                Fast & Fresh Delivery
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[0.95]">
                Order
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-600">
                  Delicious
                </span>
                <span className="block flex items-center gap-3">
                  Food
                  <span className="text-5xl lg:text-6xl">🍔</span>
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
                Get your favorite meals delivered hot and fresh to your doorstep
                in just{" "}
                <span className="font-bold text-orange-600">30 minutes</span> or
                less!
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="group px-7 py-3.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl font-bold text-base shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2">
                Start Ordering
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </button>
              <button className="px-7 py-3.5 bg-gray-900 text-white rounded-2xl font-bold text-base hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 shadow-xl">
                Browse Menu
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-6 pt-1">
              <div>
                <p className="text-3xl lg:text-4xl font-black text-gray-900">
                  500+
                </p>
                <p className="text-xs text-gray-500 font-medium">Restaurants</p>
              </div>
              <div className="w-px bg-gray-200"></div>
              <div>
                <p className="text-3xl lg:text-4xl font-black text-gray-900">
                  15K+
                </p>
                <p className="text-xs text-gray-500 font-medium">Customers</p>
              </div>
              <div className="w-px bg-gray-200"></div>
              <div>
                <p className="text-3xl lg:text-4xl font-black text-gray-900 flex items-center gap-1">
                  4.9 <span className="text-2xl">⭐</span>
                </p>
                <p className="text-xs text-gray-500 font-medium">Rating</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-pink-600 border-2 border-white"></div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-white"></div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-teal-600 border-2 border-white"></div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 border-2 border-white"></div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">2,000+</span> orders
                delivered today
              </p>
            </div>
          </div>

          {/* Right Side - Video Container (Wider & Shorter) */}
          <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center pr-2 lg:pr-4">
            {/* Decorative Background Circles */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div
              className="absolute bottom-0 left-0 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Main Card Container - Wider */}
            <div className="relative z-10 w-full h-full">
              {/* Tilted Background Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-pink-100 rounded-[2.5rem] transform rotate-6"></div>

              {/* Main Card with Video */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-[2.5rem] shadow-2xl overflow-hidden">
                {/* Video Element */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={video} type="video/mp4" />
                </video>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 pointer-events-none"></div>

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-xl shadow-xl backdrop-blur-sm z-10">
                  <p className="text-xs text-gray-600 font-semibold flex items-center gap-1">
                    🔥 Hot Deals
                  </p>
                </div>

                <div className="absolute bottom-6 right-6 bg-white px-5 py-2.5 rounded-xl shadow-xl backdrop-blur-sm z-10">
                  <p className="text-sm font-bold text-orange-600">30% OFF</p>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-4 bg-pink-100 px-3 py-2.5 rounded-xl shadow-xl border-2 border-pink-200 backdrop-blur-sm z-10">
                  <p className="text-xs text-pink-600 font-medium flex items-center gap-1">
                    ⚡ Fast
                  </p>
                  <p className="text-base font-black text-pink-700">30min</p>
                </div>
              </div>
            </div>

            {/* Floating Delivery Card */}
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 z-20 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center text-xl">
                  🚚
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Delivery Status
                  </p>
                  <p className="text-sm font-bold text-gray-900">On the way!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white ">
        <FoodCarousel />
      </div>
    </div>
  );
};

export default HeroSection;
