import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import UserOrdersCart from "../../components/UserOrdersCart";
import OwnerOrdersCart from "../../components/OwnerOrdersCart";

const MyOrders = () => {
  const { myOrders, userData } = useSelector((state) => state.user);
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex justify-center px-4">
      <div className="w-full max-w-[800px] p-4">
        <div>
          <button
            className="absolute top-6 left-6 flex items-center justify-center rounded-full bg-white shadow-md p-2 hover:shadow-lg hover:scale-105 transition cursor-pointer"
            onClick={() => navigate("/")}
          >
            <IoIosArrowRoundBack
              className="text-orange-500 font-extrabold"
              size={30}
            />
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
        </div>

        <div className="space-y-6">
          {myOrders.map((item, index) =>
            userData.role === "user" ? (
              <UserOrdersCart />
            ) : userData.role === "owner" ? (
              <OwnerOrdersCart />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
