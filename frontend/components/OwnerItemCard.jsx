import axios from "axios";
import React from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { BiDish } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../src/App";
import { setShopData } from "../src/redux/ownerSlice";

const OwnerItemCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const result = await axios.delete(
        `${serverUrl}/api/item/delete/${data._id}`,
        { withCredentials: true }
      );
      dispatch(setShopData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-orange-400 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg text-xs font-bold text-orange-600 shadow-lg">
            <BiDish size={14} />
            {data.category}
          </span>
        </div>

        {/* Food Type Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/95 backdrop-blur-sm rounded-lg text-xs font-semibold text-white shadow-lg">
            <MdRestaurant size={14} />
            {data.foodType}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4">
          <div className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
            <span className="text-white text-xl font-bold bg-clip-text">
              {" "}
              ৳{data.price}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          {/* Item Name */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
            {data.name}
          </h3>

          {/* Description if exists */}
          {data.description && (
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100">
          <button
            className="flex-1 text-lg  py-3 rounded-xl font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            onClick={() => navigate(`/edit-item/${data._id}`)}
          >
            <FaPencilAlt size={15} />
            Edit
          </button>

          <button
            className="flex-1 py-3 rounded-xl font-bold text-lg text-red-600 bg-red-50 hover:bg-red-100 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
            onClick={handleDelete}
          >
            <FaTrashAlt size={15} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerItemCard;
