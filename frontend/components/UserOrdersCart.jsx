import React from "react";

const UserOrdersCart = ({ data }) => {
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

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
      preparing: "bg-orange-100 text-orange-700 border-orange-300",
      "Out of Delivered": "bg-blue-100 text-blue-700 border-blue-300",
      Delivered: "bg-green-100 text-green-700 border-green-300",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-orange-100 transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start p-4 sm:p-5 border-b border-gray-100 bg-gradient-to-r from-orange-50 via-white to-orange-50">
        <div>
          <p className="text-lg font-semibold text-gray-800">
            Order #{data._id.slice(-6)}
          </p>
          <p className="text-sm text-gray-500">{formateDate(data.createdAt)}</p>
        </div>
        <div className="text-right">
          <p className="uppercase text-xs sm:text-sm text-gray-600 font-medium">
            {data.paymentMethod}
          </p>
          <span
            className={`mt-1 inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
              data.shopOrder?.[0]?.status
            )}`}
          >
            {data.shopOrder?.[0]?.status}
          </span>
        </div>
      </div>

      {/* Shops */}
      <div className="p-4 sm:p-5 space-y-5">
        {data.shopOrder.map((shopOrd, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100 p-4 shadow-sm hover:shadow-md transition"
          >
            <p className="font-semibold text-gray-800 mb-2 flex items-center gap-1">
              <span className="text-orange-500 text-lg">🍴</span>
              {shopOrd.shop?.name || "Shop"}
            </p>

            {/* Items */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {shopOrd.shopOrderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-32 sm:w-36 bg-white rounded-xl border border-gray-100 shadow-2xl hover:shadow-lg transition hover:-translate-y-1"
                >
                  <img
                    src={item.item.image}
                    alt={item.item.name}
                    className="w-full h-24 object-cover rounded-t-xl"
                  />
                  <div className="p-2">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty {item.quantity} × ৳{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t border-orange-100 pt-3 mt-3">
              <p className="font-semibold text-gray-700 text-sm sm:text-base">
                Subtotal: ৳{shopOrd.subTotal}
              </p>
              <span
                className={`text-xs sm:text-sm font-semibold capitalize px-3 py-1 rounded-full border ${getStatusColor(
                  shopOrd.status
                )}`}
              >
                {shopOrd.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center border-t border-gray-100 p-4 sm:p-5 bg-gray-50/60">
        <p className="font-bold text-base sm:text-lg text-gray-800">
          Total: ৳{data.totalAmount}
        </p>
        <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-5 sm:px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition">
          Track Order
        </button>
      </div>
    </div>
  );
};

export default UserOrdersCart;
