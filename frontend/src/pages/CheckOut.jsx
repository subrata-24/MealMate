import React, { useRef, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ImLocation2 } from "react-icons/im";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { BiCurrentLocation } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../redux/mapSlice";
import axios from "axios";
import locationIcon from "../assets/marker.png"; // ensure this file exists

// custom icon (popupAnchor pushes popup above the marker)
const customMarker = L.icon({
  iconUrl: locationIcon,
  iconSize: [40, 50],
  iconAnchor: [20, 50], // bottom-center of icon is the coordinate
  popupAnchor: [0, -45], // shift popup up so it doesn't overlap the marker
});

// small helper component: creates & opens a Leaflet popup reliably
function AutoOpenPopup({ position, address }) {
  const map = useMap();

  useEffect(() => {
    if (!position || !map) return;

    // close any previous popups
    map.closePopup();

    // create popup content as a DOM node so tailwind classes work
    const content = document.createElement("div");
    content.className = "p-2";
    content.innerHTML = `
      <div class="text-sm">
        <div class="font-semibold text-orange-600" style="margin-bottom:4px">📍 Delivery Point</div>
        <div class="text-gray-600">${
          address ? address : "Your selected location"
        }</div>
      </div>
    `;

    const popup = L.popup({
      closeButton: true,
      autoClose: false,
      closeOnClick: false,
      offset: L.point(0, -45), // keep popup above the marker
      className: "leaflet-custom-popup",
    })
      .setLatLng(position)
      .setContent(content);

    // small timeout to ensure underlying layers are ready (safe and reliable)
    const t = setTimeout(() => {
      popup.openOn(map);
    }, 120);

    return () => {
      clearTimeout(t);
      try {
        map.removeLayer(popup);
      } catch (err) {}
    };
  }, [map, position, address]);

  return null;
}

//helper to recenter the map whenever location changes
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
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  // real Leaflet map instance will be stored here via whenCreated
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const { location, address } = useSelector((state) => state.map);

  // update location when marker drag ends
  const onDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  // reverse geocoding
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

  //Forward Geocoding
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

  // reset to user's current location (and pan/zoom the map to center)
  const resetLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        dispatch(setLocation({ lat: latitude, lon: longitude }));
        getAddressByLatLng(latitude, longitude);

        // ensure we have the real Leaflet map instance and flyTo it
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
        <h1 className="text-3xl font-extrabold text-gray-900">Checkout</h1>

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
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            />

            <button
              className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition flex items-center justify-center cursor-pointer"
              onClick={getLatLngByAddress}
            >
              <FaMagnifyingGlassLocation size={18} />
            </button>

            <button
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:scale-105 transition flex items-center justify-center cursor-pointer"
              onClick={resetLocation}
            >
              <BiCurrentLocation size={20} />
            </button>
          </div>

          {/* Map Section */}
          <div className="mt-6 bg-white rounded-3xl shadow-lg border border-gray-200 overflow-visible transition hover:shadow-2xl">
            <div className="relative h-80 w-full">
              <MapContainer
                // save the real Leaflet map instance
                whenCreated={(mapInstance) => {
                  mapRef.current = mapInstance;
                }}
                className="w-full h-full rounded-3xl"
                center={[location?.lat || 23.8103, location?.lon || 90.4125]}
                zoom={5}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* recenter smoothly on state change */}
                <RecenterMap location={location} />

                {/* Draggable marker (no internal Popup here) */}
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

              {/* decorative ring */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-orange-200 pointer-events-none"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckOut;
