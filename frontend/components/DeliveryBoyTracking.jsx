import React, { useState } from "react";
import scooter from "../src/assets/scooter.png";
import home from "../src/assets/home.png";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

const deliveryBoyIcon = new L.Icon({
  iconUrl: scooter,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const customerIcon = new L.Icon({
  iconUrl: home,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const DeliveryBoyTracking = ({ data }) => {
  const deliveryBoyLat = data.deliveryBoyLocation.lat;
  const deliveryBoyLon = data.deliveryBoyLocation.lon;
  const customerLat = data.customerLocation.lat;
  const customerLon = data.customerLocation.lon;

  const path = [
    [deliveryBoyLat, deliveryBoyLon],
    [customerLat, customerLon],
  ];

  const center = [deliveryBoyLat, deliveryBoyLon];

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-2xl border border-orange-100 transition-all duration-300 hover:shadow-2xl hover:border-orange-300">
      <div className="relative h-64 w-full rounded-b-2xl overflow-hidden">
        <MapContainer
          className="w-full h-full"
          center={center}
          zoom={16}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Delivery Boy Marker */}
          <Marker
            position={[deliveryBoyLat, deliveryBoyLon]}
            icon={deliveryBoyIcon}
          >
            <Popup>Delivery Boy Location</Popup>
          </Marker>

          {/* Customer Marker */}
          <Marker position={[customerLat, customerLon]} icon={customerIcon}>
            <Popup>Customer Location</Popup>
          </Marker>

          {/* Path line */}
          <Polyline positions={path} color="orange" weight={4} />
        </MapContainer>
      </div>
    </div>
  );
};

export default DeliveryBoyTracking;
