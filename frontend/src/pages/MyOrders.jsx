import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserOrdersCart from "../../components/UserOrdersCart";
import OwnerOrdersCart from "../../components/OwnerOrdersCart";

const MyOrders = () => {
  const { myOrders, userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 flex justify-center py-8 px-3 sm:px-6">
      <div className="w-full max-w-[850px] relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute -top-2 left-0 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-orange-100 shadow hover:shadow-md p-2 transition hover:scale-105"
        >
          <IoIosArrowRoundBack size={30} className="text-orange-500" />
        </button>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          My{" "}
          <span className="bg-gradient-to-r from-orange-500 via-red-500 to-red-400 bg-clip-text text-transparent">
            Orders
          </span>
        </h1>

        {/* Orders List */}
        {myOrders.length ? (
          <div className="space-y-6">
            {myOrders.map((order, index) =>
              userData.role === "user" ? (
                <UserOrdersCart key={index} data={order} />
              ) : (
                <OwnerOrdersCart key={index} data={order} />
              )
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-16 text-lg">
            You don’t have any orders yet 🍽️
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
