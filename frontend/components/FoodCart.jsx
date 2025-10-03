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
import { TbCurrencyTaka } from "react-icons/tb";
import { addToCart } from "../src/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const FoodCart = ({ data }) => {
  const { cartItems } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

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

  return (
    <div className="w-[240px] rounded-2xl border-2 border-orange-400 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
      {/* Image section */}
      <div className="w-full h-[160px] flex justify-center relative items-center bg-gray-50">
        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md">
          {data.foodType === "Veg" ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content section */}
      <div className="flex flex-col p-4 flex-1">
        <h1 className="font-semibold text-gray-900 text-base truncate">
          {data.name}
        </h1>
        <div className="flex items-center gap-1 mt-1">
          {renderStars(data.rating?.average || 0)}
          <span className="text-xs text-gray-600 ml-1">
            ({data.rating?.count || 0})
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto p-3">
        <p className="text-lg font-bold text-gray-800">
          <span className="text-sm font-extrabold">৳</span> {data.price}
        </p>

        <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
          <button
            className="px-2 py-1 hover:bg-gray-100 transition cursor-pointer"
            onClick={handleDecrement}
          >
            <FaMinus size={12} />
          </button>
          <span className="px-2">{quantity}</span>
          <button
            className="px-2 py-1 hover:bg-gray-100 transition cursor-pointer"
            onClick={handleIncrement}
          >
            <FaPlus size={12} />
          </button>
          <button
            className={`${
              cartItems.some((i) => i.id == data._id)
                ? "bg-gray-900"
                : "bg-[#ff4d2d]"
            } text-white px-3 py-2 cursor-pointer transition-colors`}
            onClick={() => {
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
            }}
          >
            <FaShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCart;
