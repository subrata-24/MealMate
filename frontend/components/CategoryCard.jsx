import React from "react";

const CategoryCard = ({ name, image }) => {
  return (
    <article
      className="w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] rounded-2xl overflow-hidden bg-white shadow-2xl hover:shadow-2xl hover:border-orange-300 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer relative group shrink-0 focus-within:ring-2 focus-within:ring-orange-400 focus-within:ring-offset-2"
      tabIndex="0"
      role="button"
      aria-label={`View ${name} category`}
    >
      {/* Image with zoom effect */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* Enhanced gradient overlay with category name */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 w-full px-3 py-3 text-center bg-gradient-to-t from-black/90 via-black/80">
        <p className="text-sm sm:text-base font-bold text-white drop-shadow-lg tracking-wide truncate group-hover:scale-105 transition-transform duration-300">
          {name}
        </p>
      </div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/2 via-black/5 to-black/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </article>
  );
};

export default CategoryCard;
