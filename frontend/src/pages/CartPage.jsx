import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCart from "../../components/CartItemCart";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex justify-center p-6 bg-gray-50 font-[Inter]">
      <div className="w-full max-w-[900px]">
        {/* Header */}
        <div className="flex items-center mb-8 gap-3">
          <IoArrowBackOutline
            size={32}
            className="text-orange-500 hover:text-red-500 hover:scale-110 transition-transform cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="text-3xl font-extrabold text-gray-900">Your Cart</h1>
        </div>

        {/* Cart Items */}
        {cartItems?.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-lg text-gray-500">🛒 Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all"
            >
              Browse Foods
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {cartItems?.map((item, index) => (
              <CartItemCart data={item} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
