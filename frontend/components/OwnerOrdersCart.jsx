import React from "react";
import { FaPhoneFlip } from "react-icons/fa6";

const OwnerOrdersCart = ({ data }) => {
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
    </div>
  );
};

export default OwnerOrdersCart;
