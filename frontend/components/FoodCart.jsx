import React, { useState } from "react";
import {
  FaDrumstickBite,
  FaLeaf,
  FaMinus,
  FaPlus,
  FaRegStar,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { addToCart } from "../src/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const FoodCart = ({ data }) => {
  const { cartItems } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const isInCart = cartItems.some((i) => i.id === data._id);

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

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 0 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(
        addToCart({
          id: data._id,
          name: data.name,
          price: data.price,
          image: data.image,
          shop: data.shop,
          quantity,
          foodType: data.foodType,
        })
      );
    }
  };

  return (
    <article
      className="w-full max-w-[280px] rounded-2xl border-2 border-orange-100 bg-white overflow-hidden shadow-2xl hover:shadow-2xl hover:border-orange-300 hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
      aria-label={`${data.name} food item`}
    >
      {/* Image section with type badge */}
      <div className="w-full h-[180px] flex justify-center relative items-center bg-gradient-to-br from-orange-50 to-white overflow-hidden">
        {/* Food type badge */}
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md z-10 border border-gray-100 group-hover:scale-110 transition-transform duration-300">
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

        {/* Food image with zoom effect */}
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content section */}
      <div className="flex flex-col p-4 flex-1 gap-2">
        <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
          {data.name}
        </h3>

        {/* Rating section */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {renderStars(data.rating?.average || 0)}
          </div>
          <span className="text-xs text-gray-500 font-medium">
            ({data.rating?.count || 0})
          </span>
        </div>
      </div>

      {/* Footer with price and controls */}
      <div className="flex items-center justify-between px-4 pb-4 pt-2 border-t border-gray-100 bg-gradient-to-br from-orange-50 to-white gap-3">
        {/* Price */}
        <div className="flex flex-col">
          <p className="text-2xl font-extrabold text-gray-900 tracking-tight">
            ৳{data.price}
          </p>
        </div>

        {/* Quantity and cart controls */}
        <div className="flex items-center border-2 border-orange-200 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
          {/* Decrement button */}
          <button
            className="px-2.5 py-2 hover:bg-orange-50 active:bg-orange-100 transition-colors  cursor-pointer duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
            onClick={handleDecrement}
            disabled={quantity === 0}
            aria-label="Decrease quantity"
          >
            <FaMinus size={12} className="text-gray-700" />
          </button>

          {/* Quantity display */}
          <span className="px-3 py-1.5 font-bold text-gray-900 min-w-[2.5rem] text-center border-x border-orange-100">
            {quantity}
          </span>

          {/* Increment button */}
          <button
            className="px-2.5 py-2 hover:bg-orange-50 active:bg-orange-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer"
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            <FaPlus size={12} className="text-gray-700" />
          </button>

          {/* Add to cart button */}
          <button
            className={`${
              isInCart
                ? "bg-gray-900 cursor-default"
                : quantity > 0
                ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 active:scale-95 cursor-pointer"
                : "bg-gray-500 cursor-not-allowed"
            } text-white px-3 py-2.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1`}
            onClick={handleAddToCart}
            disabled={quantity === 0 || isInCart}
            aria-label={isInCart ? "Already in cart" : "Add to cart"}
          >
            <FaShoppingCart size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default FoodCart;
