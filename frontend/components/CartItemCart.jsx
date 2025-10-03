import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../src/redux/userSlice";

const CartItemCart = ({ data }) => {
  const dispatch = useDispatch();

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border border-orange-100">
      {/* Left Section: Image + Info */}
      <div className="flex items-center gap-4">
        <img
          src={data.image}
          alt={data.name}
          className="w-20 h-20 object-cover rounded-xl border border-gray-200"
        />
        <div>
          <h2 className="font-semibold text-gray-900 text-lg">{data.name}</h2>
          <p className="text-sm text-gray-500 mt-1">
            ৳{data.price} × {data.quantity}
          </p>
          <p className="font-bold text-orange-600 text-lg mt-1">
            ৳{data.price * data.quantity}
          </p>
        </div>
      </div>

      {/* Right Section: Controls */}
      <div className="flex items-center gap-3">
        {/* Quantity Controls */}
        <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 shadow-inner">
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
            onClick={() => handleDecrease(data.id, data.quantity)}
          >
            <FaMinus size={12} className="text-gray-600" />
          </button>
          <span className="px-3 font-medium">{data.quantity}</span>
          <button
            className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
            onClick={() => handleIncrease(data.id, data.quantity)}
          >
            <FaPlus size={12} className="text-gray-600" />
          </button>
        </div>

        {/* Remove Button */}
        <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition cursor-pointer">
          <IoTrashBin size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItemCart;
