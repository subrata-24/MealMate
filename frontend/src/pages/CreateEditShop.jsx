import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa6";
import axios from "axios";
import { serverUrl } from "../App";
import { setShopData } from "../redux/ownerSlice";

const CreateEditShop = () => {
  const navigate = useNavigate();
  const { shopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState(shopData?.name || "");
  const [city, setCity] = useState(shopData?.city || currentCity);
  const [state, setState] = useState(shopData?.state || currentState);
  const [address, setAddress] = useState(shopData?.address || currentAddress); // Fixed: was shopData?.name
  const [frontendImage, setFrontendImage] = useState(shopData?.image || null);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Cleanup blob URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (frontendImage && frontendImage.startsWith("blob:")) {
        URL.revokeObjectURL(frontendImage);
      }
    };
  }, [frontendImage]);

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous URL before creating a new one
      if (frontendImage && frontendImage.startsWith("blob:")) {
        URL.revokeObjectURL(frontendImage);
      }
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError("Shop name is required");
      return;
    }
    if (!city.trim() || !state.trim() || !address.trim()) {
      setError("All location fields are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("city", city.trim());
      formData.append("state", state.trim());
      formData.append("address", address.trim());
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/shop/create-edit`,
        formData,
        { withCredentials: true }
      );

      dispatch(setShopData(result.data));
      // Navigate only after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error saving shop:", error);
      setError(
        error.response?.data?.message ||
          "Failed to save shop. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
            {shopData ? "Edit Shop" : "Add Shop"}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Fill in your shop details to get started.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Shop Name *
            </label>
            <input
              type="text"
              placeholder="Enter shop name"
              className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Shop Image
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              accept="image/*"
              onChange={handleOnChange}
              disabled={loading}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                placeholder="Enter state"
                className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                onChange={(e) => setState(e.target.value)}
                value={state}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              placeholder="Enter shop address"
              className="w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 w-full rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditShop;
