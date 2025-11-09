import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../src/App";
import { useState } from "react";

const UserOrdersCart = ({ data }) => {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState({}); //itemId:rating

  const formateDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  //Rating change handler
  const handleRating = async ({ itemId, rating }) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/item/change-rating`,
        {
          rating,
          itemId,
        },
        {
          withCredentials: true,
        }
      );
      setSelectedRating((prev) => ({
        ...prev,
        [itemId]: rating,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-orange-100 text-orange-800 border-orange-200",
      preparing: "bg-orange-100 text-orange-800 border-orange-200",
      "Out of Delivered": "bg-blue-100 text-blue-800 border-blue-200",
      Delivered: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handlePayment = async (shopOrd) => {
    try {
      const userId = data.user;
      const orderId = data._id;
      const deliveryAddress = data.deliveryAddress;
      const { data: result } = await axios.post(
        `${serverUrl}/api/order/online-payment`,
        { shopOrd, userId, deliveryAddress, orderId },
        { withCredentials: true }
      );

      if (result.success) {
        window.location.replace(result.url);
      } else {
        alert("Payment initialization failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        error.response?.data?.message || "Payment failed. Please try again."
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 ease-out overflow-hidden">
      <div className="flex justify-between items-start p-6 sm:p-8 border-b border-gray-100 bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="space-y-1">
          <p className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Order #{data._id.slice(-6)}
          </p>
          <p className="text-sm text-gray-500 font-medium">
            {formateDate(data.createdAt)}
          </p>
        </div>
        <div className="text-right space-y-2">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
            <span className="text-sm text-gray-700">via</span>
            <p className="uppercase text-sm text-gray-900 font-bold tracking-wide">
              {data.paymentMethod}
            </p>
          </div>
          <div className="flex justify-end">
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm ${getStatusColor(
                data.shopOrder?.[0]?.status
              )}`}
            >
              {data.shopOrder?.[0]?.status}
            </span>
          </div>
        </div>
      </div>

      {/* Shops */}
      <div className="p-6 sm:p-8 space-y-6">
        {data.shopOrder.map((shopOrd, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-orange-50 via-white to-green-50 rounded-2xl border border-orange-100 p-6 shadow-2xl hover:shadow-lg transition-all duration-300"
          >
            {/* Shop Header with Payment Status */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-orange-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-500 shadow-md text-white text-xl">
                  🍴
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {shopOrd.shop?.name || "Shop"}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {shopOrd.shopOrderItems.length} items
                  </p>
                </div>
              </div>

              {/* Payment Status Badge */}
              {data.paymentMethod === "online" && (
                <div>
                  {shopOrd.payment === false ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-semibold shadow-sm">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      Payment Pending
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-bold shadow-sm">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Payment Confirmed
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {shopOrd.shopOrderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-xl border border-orange-100 shadow-2xl hover:shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div className="relative overflow-hidden h-32 bg-gray-100">
                    <img
                      src={item.item.image}
                      alt={item.item.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow-md">
                      <p className="text-xs font-bold text-gray-900">
                        ×{item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      ৳{item.price} each
                    </p>
                    <p className="text-sm font-bold text-orange-600">
                      ৳{item.price * item.quantity}
                    </p>

                    {/* Rating change logic */}
                    {shopOrd.status == "Delivered" && (
                      <div className="flex space-x-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            className={`${
                              selectedRating[item.item._id] >= star
                                ? "text-yellow-500"
                                : "text-gray-500 hover:text-yellow-400"
                            } text-lg cursor-pointer`}
                            onClick={() =>
                              handleRating({
                                itemId: item.item._id,
                                rating: star,
                              })
                            }
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Shop Order Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-orange-100">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="text-left">
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Subtotal
                  </p>
                  <p className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    ৳{shopOrd.subTotal}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center text-sm font-bold capitalize px-4 py-2 rounded-full border shadow-sm ${getStatusColor(
                    shopOrd.status
                  )}`}
                >
                  {shopOrd.status}
                </span>
              </div>

              {/* Payment Action Button */}
              {data.paymentMethod === "online" && shopOrd.payment === false && (
                <button
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                  onClick={() => handlePayment(shopOrd)}
                >
                  💳 Pay Now - ৳{shopOrd.subTotal}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200 p-6 sm:p-8 bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">Grand Total</p>
          <p className="text-3xl font-extrabold text-gray-900 tracking-tight">
            ৳{data.totalAmount}
          </p>
        </div>
        <button
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          onClick={() => navigate(`/track-order/${data._id}`)}
        >
          🚚 Track Order
        </button>
      </div>
    </div>
  );
};

export default UserOrdersCart;
