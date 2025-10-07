import axios from "axios";
import React from "react";
import { FaPhoneFlip } from "react-icons/fa6";
import { serverUrl } from "../src/App";
import { useDispatch } from "react-redux";
import { upDateOrderStatus } from "../src/redux/userSlice";

const OwnerOrdersCart = ({ data }) => {
  const dispatch = useDispatch();
  const handleUpdateStatus = async (orderID, shopID, status) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/update-status/${orderID}/${shopID}`,
        { status },
        { withCredentials: true }
      );
      dispatch(upDateOrderStatus({ orderID, shopID, status }));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="rounded-lg shadow p-4 space-y-4 bg-white">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {data.user.fullname}
        </h2>
        <p className="text-sm text-gray-500">{data.user.email}</p>
        <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <FaPhoneFlip />
          <span>{data.user.mobileNo}</span>
        </p>
      </div>

      <div className="flex items-start flex-col gap-2 text-gray-600 text-sm">
        <p>{data.deliveryAddress.text}</p>
        <p>
          Latitude: {data.deliveryAddress.latitude}, Longitude:{" "}
          {data.deliveryAddress.longitude}
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {data.shopOrder.shopOrderItems.map((item, idx) => (
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

      <div className="flex justify-between items-center pt-3 mt-auto border-t border-orange-100">
        <span className="text-sm">
          Status:{" "}
          <span className="font-semibold capitalize text-[#ff4d2d] ">
            {data.shopOrder.status}
          </span>
        </span>

        <select
          className="rounded-md px-3 py-1 border focus:outline-none focus:ring-2 text-[#ff4d2d] font-semibold cursor-pointer"
          onChange={(e) =>
            handleUpdateStatus(
              data._id,
              data.shopOrder.shop._id,
              e.target.value
            )
          }
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="Out of Delivery">Out of Delivery</option>
        </select>
      </div>

      <div className="text-left font-semibold text-gray-900 text-sm">
        Total: {data.shopOrder.subTotal}
      </div>
    </div>
  );
};

export default OwnerOrdersCart;
