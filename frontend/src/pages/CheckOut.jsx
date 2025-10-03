import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ImLocation2 } from "react-icons/im";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useRef, useEffect } from "react";
import { setAddress, setLocation } from "../redux/mapSlice";
import axios from "axios";

function RecenterMap({ location }) {
  const map = useMap();
  if (location.lat && location.lon) {
    map.setView([location.lat, location.lon], 16, { animate: true });
  }
  return null;
}

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { location, address } = useSelector((state) => state.map);

  const markerRef = useRef();

  const ondragend = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const apiKey = import.meta.env.VITE_GEOAPIKEY;
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`
      );
      dispatch(setAddress(result?.data?.results[0].address_line2));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-orange-50 to-red-50 font-[Inter] relative">
      {/* Back Button */}
      <button
        className="absolute top-6 left-6 flex items-center justify-center rounded-full bg-white shadow-md p-2 hover:shadow-lg hover:scale-105 transition cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack className="text-orange-500" size={30} />
      </button>

      {/* Checkout Card */}
      <div className="w-full max-w-[800px] bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>

        {/* Delivery Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
            <ImLocation2 className="text-orange-500" />
            Delivery Location
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
              placeholder="Enter your delivery location..."
              value={address}
            />

            {/* Search Button */}
            <button className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition flex items-center justify-center cursor-pointer">
              <FaMagnifyingGlassLocation size={18} />
            </button>

            {/* Current Location Button */}
            <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:scale-105 transition flex items-center justify-center cursor-pointer">
              <BiCurrentLocation size={20} />
            </button>
          </div>
          <div className="mt-6">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-600 overflow-hidden transition hover:shadow-2xl">
              <div className="relative h-80 w-full">
                <MapContainer
                  className="w-full h-full rounded-3xl"
                  center={[location?.lat || 23.8103, location?.lon || 90.4125]} // Dhaka fallback
                  zoom={14}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {/* Recenter Map */}
                  <RecenterMap location={location} />

                  {/* Marker */}
                  <Marker
                    ref={markerRef}
                    position={[
                      location?.lat || 23.8103,
                      location?.lon || 90.4125,
                    ]}
                    draggable
                    eventHandlers={{ dragend: ondragend }}
                  >
                    <Popup>
                      <div className="p-2 text-sm text-gray-800">
                        <p className="font-semibold text-orange-600">
                          📍 Delivery Point
                        </p>
                        <p className="text-gray-600">
                          {address || "Your selected location"}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>

                {/* Decorative overlay (optional) */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-orange-200 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckOut;
