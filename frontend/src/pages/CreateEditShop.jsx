import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa6";

const CreateEditShop = () => {
  const navigate = useNavigate();
  const { shopData } = useSelector((state) => state.owner);
  return (
    <div className="flex items-center justify-center flex-col bg-gradient-to-br from-orange-50 to-white relative p-6 min-h-screen">
      <div className="absolute top-[20px] left-[20px] z-[10] mb-20px">
        <IoArrowBackOutline
          size={35}
          className="text-[#ff4d2d]"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col mb-6 items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-md mb-4">
            <FaUtensils className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            {shopData ? "Edit Shop" : "Add Shop"}
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-md font-bold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter shop name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-md font-bold text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-md font-bold text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-md font-bold text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                placeholder="Enter state"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-md font-bold text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter shop address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 w-full rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 cursor-pointer">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditShop;
