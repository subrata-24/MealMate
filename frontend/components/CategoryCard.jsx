import React from "react";

const CategoryCard = ({ data }) => {
  return (
    <div className="w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-2xl overflow-hidden bg-white border border-orange-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.05] cursor-pointer relative group shrink-0">
      {/* Image */}
      <img
        src={data.image}
        alt={data.category}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* Gradient Overlay with Category Name */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/80 to-transparent px-2 py-1 text-center">
        <p className="text-xs md:text-sm font-semibold text-white drop-shadow-md truncate">
          {data.category}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
