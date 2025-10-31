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
import { serverUrl } from "../App";
import { addOrders } from "../redux/userSlice";

//Custom Marker
const customMarker = L.icon({
  iconUrl: locationIcon,
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -45],
});

//Auto Open popup
function AutoOpenPopup({ position, address }) {
  const map = useMap();

  useEffect(() => {
    if (!position || !map) return;

    map.closePopup();

    const content = document.createElement("div");
    content.className = "p-2";
    content.innerHTML = `
      <div class="text-sm">
        <div class="font-semibold text-orange-600" style="margin-bottom:4px">📍 Delivery Point</div>
        <div class="text-gray-600">${address || "Your selected location"}</div>
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

    const timer = setTimeout(() => {
      popup.openOn(map);
    }, 120);

    return () => {
      clearTimeout(timer);
      try {
        map.removeLayer(popup);
      } catch (err) {}
    };
  }, [map, position, address]);

  return null;
}

//Recenter Map
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
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { cartItems, totalAmount, userData } = useSelector(
    (state) => state.user
  );
  const { location, address } = useSelector((state) => state.map);
  const mapRef = useRef(null);
  const deliveryFee = totalAmount > 1000 ? 0 : 40;
  const totalWithDelivery = totalAmount + deliveryFee;

  // Reverse Geocoding: Get address from coordinates
  const getAddressByLatLng = async (lat, lng) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`
      );
      dispatch(setAddress(result?.data?.results?.[0]?.address_line2 || ""));
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
    }
  };

  // Forward Geocoding: Get coordinates from address
  const getLatLngByAddress = async () => {
    if (!addressInput.trim()) return;

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
      console.error("Forward geocoding failed:", error);
    }
  };

  // Handle marker drag
  const onMarkerDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  // Reset to current location
  const resetToCurrentLocation = () => {
    const lat = userData.location.coordinates[1];
    const lon = userData.location.coordinates[0];

    dispatch(setLocation({ lat, lon }));
    getAddressByLatLng(lat, lon);

    if (mapRef.current) {
      mapRef.current.flyTo([lat, lon], 16, { animate: true });
    }
  };

  //Handle order placement
  const handlePlaceOrder = async () => {
    if (!addressInput.trim()) {
      alert("Please enter a delivery address");
      return;
    }

    try {
      const result = await axios.post(
        `${serverUrl}/api/order/create-order`,
        {
          paymentMethod,
          totalAmount,
          cartItems,
          deliveryAddress: {
            text: addressInput,
            latitude: location.lat,
            longitude: location.lon,
          },
        },
        { withCredentials: true }
      );

      dispatch(addOrders(result.data));
      navigate("/place-order");
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-orange-50 to-red-50 font-[Inter] relative">
      {/* Back Button */}
      <button
        className="absolute top-6 left-6 flex items-center justify-center rounded-full bg-white shadow-md p-2 hover:shadow-lg hover:scale-105 transition cursor-pointer"
        onClick={() => navigate("/")}
        aria-label="Go back to home"
      >
        <IoIosArrowRoundBack className="text-orange-500" size={30} />
      </button>

      {/* Main Checkout Card */}
      <div className="w-full max-w-[800px] bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>

        {/* Delivery location */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
            <ImLocation2 className="text-orange-500" />
            Delivery Location
          </h2>

          {/* Address Input with Search Buttons */}
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
              placeholder="Enter your delivery location..."
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && getLatLngByAddress()}
            />

            <button
              className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition flex items-center justify-center cursor-pointer"
              onClick={getLatLngByAddress}
              title="Search address"
            >
              <FaMagnifyingGlassLocation size={18} />
            </button>

            <button
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:scale-105 transition flex items-center justify-center cursor-pointer"
              onClick={resetToCurrentLocation}
              title="Use current location"
            >
              <BiCurrentLocation size={20} />
            </button>
          </div>

          {/* Map Container */}
          <div className="mt-6 bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden transition hover:shadow-2xl">
            <div className="relative h-80 w-full">
              <MapContainer
                whenCreated={(mapInstance) => {
                  mapRef.current = mapInstance;
                }}
                className="w-full h-full rounded-3xl z-0"
                center={[location?.lat || 23.8103, location?.lon || 90.4125]}
                zoom={location?.lat ? 16 : 5}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <RecenterMap location={location} />

                <Marker
                  position={[
                    location?.lat || 23.8103,
                    location?.lon || 90.4125,
                  ]}
                  icon={customMarker}
                  draggable
                  eventHandlers={{ dragend: onMarkerDragEnd }}
                />

                <AutoOpenPopup
                  position={[
                    location?.lat || 23.8103,
                    location?.lon || 90.4125,
                  ]}
                  address={address}
                />
              </MapContainer>

              <div className="absolute inset-0 rounded-3xl ring-1 ring-orange-200 pointer-events-none z-10"></div>
            </div>
          </div>
        </section>

        {/* Payment method */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Payment Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Cash on Delivery */}
            <div
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                paymentMethod === "cod"
                  ? "border-orange-500 bg-orange-50 shadow-md"
                  : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/30"
              }`}
              onClick={() => setPaymentMethod("cod")}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 flex-shrink-0">
                <MdDeliveryDining className="text-green-600 text-2xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Cash on Delivery</p>
                <p className="text-sm text-gray-500">
                  Pay when your food arrives
                </p>
              </div>
            </div>

            {/* Online Payment */}
            <div
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                paymentMethod === "online"
                  ? "border-orange-500 bg-orange-50 shadow-md"
                  : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/30"
              }`}
              onClick={() => setPaymentMethod("online")}
            >
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100">
                  <FaMobileScreenButton className="text-purple-700 text-xl" />
                </div>
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <FaCreditCard className="text-blue-700 text-xl" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Online Payment</p>
                <p className="text-sm text-gray-500">bKash / Nagad / Card</p>
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Order Summary
          </h2>

          <div className="relative rounded-2xl border bg-white shadow-md p-6 overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>

            <div className="relative space-y-3">
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
              <div className="flex justify-between items-center text-sm font-medium text-gray-800">
                <span className="flex items-center gap-2">
                  <FaUtensils className="text-orange-500" /> Subtotal
                </span>
                <span>৳{totalAmount}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-700">
                <span className="flex items-center gap-2">
                  <FaTruck className="text-blue-500" /> Delivery Fee
                </span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-semibold">Free</span>
                  ) : (
                    `৳${deliveryFee}`
                  )}
                </span>
              </div>

              <div className="border-t border-dashed border-gray-300 my-3"></div>
              <div className="flex justify-between items-center text-lg font-bold text-orange-600">
                <span className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-600" /> Total Amount
                </span>
                <span>৳{totalWithDelivery}</span>
              </div>
            </div>
          </div>
        </section>
        <button
          className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3.5 font-semibold rounded-xl shadow-md hover:scale-[1.02] hover:shadow-lg transition-transform text-lg cursor-pointer"
          onClick={handlePlaceOrder}
        >
          {paymentMethod === "cod" ? "Place Order" : "Pay & Place Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
