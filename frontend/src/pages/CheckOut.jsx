import React, { useRef, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ImLocation2 } from "react-icons/im";
import {
  FaCreditCard,
  FaMagnifyingGlassLocation,
  FaMobileScreenButton,
  FaMoneyBillWave,
  FaTruck,
  FaUtensils,
} from "react-icons/fa6";
import { BiCurrentLocation } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../redux/mapSlice";
import axios from "axios";
import { MdDeliveryDining } from "react-icons/md";
import locationIcon from "../assets/marker.png";

// custom icon
const customMarker = L.icon({
  iconUrl: locationIcon,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -45],
});

// Auto popup
function AutoOpenPopup({ position, address }) {
  const map = useMap();

  useEffect(() => {
    if (!position || !map) return;
    map.closePopup();
    const content = document.createElement("div");
    content.className = "p-2";
    content.innerHTML = `
      <div class="text-sm">
        <div class="font-semibold text-orange-600 mb-1">📍 Delivery Point</div>
        <div class="text-gray-600">${
          address ? address : "Your selected location"
        }</div>
      </div>
    `;
    const popup = L.popup({
      closeButton: true,
      autoClose: false,
      closeOnClick: false,
      offset: L.point(0, -45),
      className: "leaflet-custom-popup",
    })
      .setLatLng(position)
      .setContent(content);
    const t = setTimeout(() => popup.openOn(map), 120);
    return () => {
      clearTimeout(t);
      try {
        map.removeLayer(popup);
      } catch {}
    };
  }, [map, position, address]);

  return null;
}

// recenter
function RecenterMap({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location?.lat && location?.lon && map) {
      map.flyTo([location.lat, location.lon], 16, { animate: true });
    }
  }, [location, map]);
  return null;
}

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const apiKey = import.meta.env.VITE_GEOAPIKEY;
  const { cartItems, totalAmount } = useSelector((state) => state.user);
  const delivaryFee = totalAmount > 1000 ? 0 : 40;
  const amountWithDelivaryFee = totalAmount + delivaryFee;

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const { location, address } = useSelector((state) => state.map);

  const onDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`
      );
      dispatch(setAddress(result?.data?.results?.[0]?.address_line2 || ""));
    } catch (error) {
      console.log(error);
    }
  };

  const getLatLngByAddress = async () => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&apiKey=${apiKey}`
      );
      const { lat, lon } = result.data.features[0].properties;
      dispatch(setLocation({ lat, lon }));
      getAddressByLatLng(lat, lon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  const resetLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        dispatch(setLocation({ lat: latitude, lon: longitude }));
        getAddressByLatLng(latitude, longitude);
        if (mapRef.current) {
          mapRef.current.flyTo([latitude, longitude], 16, { animate: true });
        }
      },
      (err) => {
        console.log("geolocation error", err);
      }
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 to-red-50 font-[Inter] relative">
      {/* Back Button */}
      <button
        className="absolute top-6 left-6 flex items-center justify-center rounded-full bg-white shadow-md p-2 hover:shadow-lg hover:scale-105 transition cursor-pointer z-50"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack className="text-orange-500" size={30} />
      </button>

      {/* Container with two columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-10 px-6">
        {/* Left Section (Map + Payment) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <ImLocation2 className="text-orange-500" /> Delivery Location
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
                placeholder="Enter your delivery location..."
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
              />
              <button
                className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition"
                onClick={getLatLngByAddress}
              >
                <FaMagnifyingGlassLocation size={18} />
              </button>
              <button
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:scale-105 transition"
                onClick={resetLocation}
              >
                <BiCurrentLocation size={20} />
              </button>
            </div>

            {/* Map */}
            <div className="mt-6 h-80 rounded-2xl overflow-hidden border shadow-md">
              <MapContainer
                whenCreated={(mapInstance) => {
                  mapRef.current = mapInstance;
                }}
                className="w-full h-full"
                center={[location?.lat || 23.8103, location?.lon || 90.4125]}
                zoom={5}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location} />
                <Marker
                  ref={markerRef}
                  position={[
                    location?.lat || 23.8103,
                    location?.lon || 90.4125,
                  ]}
                  icon={customMarker}
                  draggable
                  eventHandlers={{ dragend: onDragEnd }}
                />
                <AutoOpenPopup
                  position={[
                    location?.lat || 23.8103,
                    location?.lon || 90.4125,
                  ]}
                  address={address}
                />
              </MapContainer>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* COD */}
              <div
                className={`flex items-center gap-4 p-3 rounded-xl border-2 transition cursor-pointer ${
                  paymentMethod === "cod"
                    ? "border-orange-500 bg-orange-50 shadow-md"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/30"
                }`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <MdDeliveryDining className="text-green-600 text-2xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Cash on Delivery
                  </p>
                  <p className="text-sm text-gray-500">
                    Pay in cash when food arrives
                  </p>
                </div>
              </div>
              {/* Online */}
              <div
                className={`flex items-center gap-4 p-3 rounded-xl border-2 transition cursor-pointer ${
                  paymentMethod === "online"
                    ? "border-orange-500 bg-orange-50 shadow-md"
                    : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/30"
                }`}
                onClick={() => setPaymentMethod("online")}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
                    <FaMobileScreenButton className="text-purple-700 text-xl" />
                  </div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                    <FaCreditCard className="text-blue-700 text-xl" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    bKash / Nagad / Card
                  </p>
                  <p className="text-sm text-gray-500">Pay securely online</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (Order Summary Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm text-gray-700"
                >
                  <span className="font-medium">
                    {item.name}{" "}
                    <span className="text-gray-500">× {item.quantity}</span>
                  </span>
                  <span className="font-semibold text-gray-900">
                    ৳{item.quantity * item.price}
                  </span>
                </div>
              ))}

              <div className="border-t border-dashed border-gray-300 my-3"></div>

              <div className="flex justify-between text-sm font-medium text-gray-800">
                <span className="flex items-center gap-2">
                  <FaUtensils className="text-orange-500" /> Subtotal
                </span>
                <span>৳{totalAmount}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-700">
                <span className="flex items-center gap-2">
                  <FaTruck className="text-blue-500" /> Delivery Fee
                </span>
                <span className="font-medium">
                  {delivaryFee === 0 ? (
                    <span className="text-green-600 font-semibold">Free</span>
                  ) : (
                    `৳${delivaryFee}`
                  )}
                </span>
              </div>

              <div className="border-t border-dashed border-gray-300 my-3"></div>

              <div className="flex justify-between items-center text-lg font-bold text-orange-600">
                <span className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-600" /> Total
                </span>
                <span>৳{amountWithDelivaryFee}</span>
              </div>
            </div>

            {/* Button */}
            <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3.5 font-semibold rounded-xl shadow-md hover:scale-[1.02] hover:shadow-lg transition-transform text-lg">
              {paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
