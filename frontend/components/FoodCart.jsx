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
          <FaStar key={i} className=" text-yellow-500" />
        ) : (
          <FaRegStar key={i} className=" text-yellow-500" />
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

      {/* Content section */}
      <div className="flex flex-col p-4 flex-1 gap-2">
        <h3 className="text-xl font-black text-gray-900 line-clamp-2 min-h-[3.5rem] group-hover:text-orange-600 transition-colors">
          {data.name}
        </h3>

        {/* Rating section */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1 text-lg">
            {renderStars(data.rating?.average || 0)}
          </div>
          <span className="text-sm text-gray-500 font-bold">
            ({data.rating?.count || 0})
          </span>
        </div>
      </div>

      {/* Footer with price and controls */}
      <div className="flex items-center justify-between px-4 pb-4 pt-2 border-t border-gray-100 bg-gradient-to-br from-orange-50 to-white gap-3">
        {/* Price */}
        <div className="flex flex-col">
          <p className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
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
