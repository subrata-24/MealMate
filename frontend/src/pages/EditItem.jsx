import React, { useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaUtensils } from "react-icons/fa6";
import axios from "axios";
import { serverUrl } from "../App";
import { setShopData } from "../redux/ownerSlice";
import { useEffect } from "react";

const EditItem = () => {
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState(null);
  const { shopData } = useSelector((state) => state.owner);
  const [name, setName] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const dispatch = useDispatch();
  const { itemID } = useParams();
  const categories = [
    "Snacks",
    "Hilsa Curry",
    "Kacchi Biryani",
    "Bhuna Khichuri",
    "Beef Rezala",
    "Shutki Maach",
    "Chingri Malai Curry",
    "Fuchka",
    "Chotpoti",
    "Beguni",
    "Piyaju",
    "Morog Polao",
    "Patla Khichuri",
    "Misti Doi",
    "Rasgulla",
    "Chomchom",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burgers",
    "Sandwitches",
    "Others",
  ];

  const handleOnChange = (e) => {
    const file = e.target.files[0]; // Get the selected image file
    setBackendImage(file); // Save original file (for sending to backend)
    setFrontendImage(URL.createObjectURL(file)); // Create a temporary local URL (for previewing in frontend)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); // Used for file + text upload(If file is included the must send the to backend like this)
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("foodType", foodType);
      if (backendImage) {
        formData.append("image", backendImage); // attach the actual image file
      }
      const result = await axios.post(
        `${serverUrl}/api/item/edit-item/${itemID}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setShopData(result.data)); // save shop data in Redux
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleGetItemByID = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/item/get-item-by-id/${itemID}`,
          { withCredentials: true }
        );

        // console.log(result);
        setCurrentItem(result.data);
      } catch (error) {
        // console.log(itemID);
        console.log(error);
      }
    };
    handleGetItemByID();
  }, [itemID]);

  useEffect(() => {
    setName(currentItem?.name || "");
    setFrontendImage(currentItem?.image || null);
    setCategory(currentItem?.category || "");
    setFoodType(currentItem?.foodType || "veg");
    setPrice(currentItem?.price || 0);
  }, [currentItem]);

  return (
    <div className="flex items-center justify-center flex-col bg-gradient-to-br from-orange-50 via-white to-green-50 relative p-6 min-h-screen">
      <div className="absolute top-[20px] left-[20px] z-[10]">
        <IoArrowBackOutline
          size={35}
          className="text-orange-500 hover:text-red-500 hover:scale-110 transition-transform cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col mb-6 items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-md mb-4">
            <FaUtensils className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Edit Food
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Add information about your food item
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Food Name
            </label>
            <input
              type="text"
              placeholder="Enter food name"
              className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Food Image
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              accept="image/*"
              onChange={handleOnChange}
            />

            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  alt="Shop Preview"
                  className="w-full h-48 object-cover rounded-xl shadow-md border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price
            </label>
            <input
              type="Number"
              placeholder="Enter food price"
              className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Category
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select Category</option>
              {categories.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Food Type
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
            >
              <option value="Veg">Veg</option>
              <option value="Non veg"> Non veg</option>
            </select>
          </div>

          <button
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 w-full rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Edit Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
