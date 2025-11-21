import React from "react";
import { FaDrumstickBite, FaLeaf, FaRegStar, FaStar } from "react-icons/fa";

const LandingPageFoodCart = ({ data }) => {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-sm text-yellow-500" />
        ) : (
          <FaRegStar key={i} className="text-sm text-yellow-500" />
        )
      );
    }
    return stars;
  };

  return (
    <article
      className="group/card w-full max-w-[280px] rounded-2xl border-2 border-orange-100 bg-white shadow-lg hover:shadow-2xl p-6 sm:p-8 transition-all duration-500 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-2 hover:scale-[1.05] ease-out"
      aria-label={`${data.name} food item`}
    >
      {/* Decorative Gradient Orb */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Image section with type badge */}
      <div className="relative w-full h-[180px] overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        {/* Food type badge */}
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md z-10 border border-gray-100 group-hover/card:scale-110 transform transition-transform duration-300">
          {data.foodType === "Veg" ? (
            <FaLeaf
              className="text-green-600 text-lg"
              aria-label="Vegetarian"
            />
          ) : (
            <FaDrumstickBite
              className="text-red-600 text-lg"
              aria-label="Non-vegetarian"
            />
          )}
        </div>

        {/* Food image with zoom effect on group hover */}
        <img
          src={data.image}
          alt={data.name}
          loading="lazy"
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover/card:scale-125 group-hover/card:rotate-2"
        />

        {/* Subtle dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="flex flex-col flex-1 ">
        {/* Food name */}
        <h3 className="text-xl font-bold text-gray-900 tracking-tight line-clamp-2 min-h-[3.5rem]">
          {data.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {renderStars(data.rating?.average || 0)}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            ({data.rating?.count || 0})
          </span>
        </div>
      </div>

      {/* Footer with price */}
      <div
        className="flex items-center justify-between px-4 py-3 border-t border-orange-100 
        bg-gradient-to-br from-orange-50 to-white gap-3"
      >
        <p className="text-2xl font-extrabold text-gray-900 tracking-tight">
          ৳{data.price}
        </p>
      </div>
    </article>
  );
};

export default LandingPageFoodCart;
