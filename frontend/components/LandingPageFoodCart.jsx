import React from "react";
import { FaDrumstickBite, FaLeaf, FaRegStar, FaStar } from "react-icons/fa";

const Star = ({ filled }) => (
  <svg
    className="w-5 h-5"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const Leaf = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
      clipRule="evenodd"
    />
  </svg>
);

const Drumstick = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M2.4 15.4c-.4.4-.4 1 0 1.4l4.8 4.8c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-4.8-4.8c-.4-.4-1-.4-1.4 0zm16.2-8.2c2.6-2.6 2.6-6.8 0-9.4-2.6-2.6-6.8-2.6-9.4 0-1.6 1.6-2.2 3.8-1.8 5.8l-5.8 5.8c-1.2 1.2-1.2 3.2 0 4.4 1.2 1.2 3.2 1.2 4.4 0l5.8-5.8c2 .4 4.2-.2 5.8-1.8z" />
  </svg>
);

const LandingPageFoodCart = ({ data }) => {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className="text-yellow-500">
          <Star filled={i <= rating} />
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border-2 border-transparent hover:border-orange-200">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="absolute top-4 right-4 z-10 bg-white rounded-full p-3 shadow-lg border-2 border-gray-100 group-hover:scale-125 transition-transform duration-300">
          {data.foodType === "Veg" ? (
            <span className="text-green-600">
              <Leaf />
            </span>
          ) : (
            <span className="text-red-600">
              <Drumstick />
            </span>
          )}
        </div>
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transform group-hover:scale-125 group-hover:rotate-3 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-black text-gray-900 line-clamp-2 min-h-[3.5rem] group-hover:text-orange-600 transition-colors">
          {data.name}
        </h3>

        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {renderStars(data.rating?.average || 0)}
          </div>
          <span className="text-sm text-gray-500 font-bold">
            ({data.rating?.count || 0})
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t-2 border-gray-100">
          <p className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            ৳{data.price}
          </p>
          <button className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageFoodCart;
