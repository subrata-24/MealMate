import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { IoIosArrowRoundBack } from "react-icons/io";
import DeliveryBoyTracking from "../../components/DeliveryBoyTracking";
import { useSelector } from "react-redux";

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState();
  const navigate = useNavigate();
  const { socket } = useSelector((state) => state.user);
  const [liveLocation, setLiveLocation] = useState({});
  const handleTrackOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/getorder-by-id/${orderId}`,
        { withCredentials: true }
      );

      setCurrentOrder(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Get the delivery boy live location from backend "socket.js"
  useEffect(() => {
    socket.on(
      "updateDeliveryBoyLocation",
      ({ latitude, longitude, deliveryBoyId }) => {
        setLiveLocation((prev) => ({
          ...prev,
          [deliveryBoyId]: { lat: latitude, lon: longitude },
        }));
        /*
        Its like map.How it stores:
        liveLocation = {
          "xyz789": { lat: 23.7515, lon: 90.3910 }, 
          "abc123": { lat: 23.8103, lon: 90.4125 } 
        }
        */
      }
    );
  }, [socket]);

  useEffect(() => {
    handleTrackOrder();
  }, [orderId]);
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-orange-50 via-white to-orange-100 text-gray-700">
      <div className="max-w-4xl mx-auto">
        {/* Back button + Title */}
        <div className="relative mb-6">
          <button
            onClick={() => navigate("/")}
            aria-label="Back"
            className="absolute left-0 -top-2 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-orange-100 shadow-lg p-2 hover:scale-105 transition-transform"
          >
            <IoIosArrowRoundBack size={26} className="text-orange-500" />
          </button>

          <h1 className="mx-auto text-center text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Track{" "}
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-red-400 bg-clip-text text-transparent">
              Orders
            </span>
          </h1>

          <p className="mt-3 text-center text-sm text-gray-600">
            Follow your deliveries in real time — see who’s on the way and where
            your food is.
          </p>
        </div>

        {/* Order cards */}
        <div className="flex flex-col gap-6">
          {currentOrder?.shopOrder?.map((orders, index) => (
            <div
              className="bg-white p-5 rounded-2xl shadow-lg border border-orange-100 space-y-4"
              key={index}
            >
              <div className="md:flex md:items-start md:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-lg md:text-xl font-bold text-[#ff4d2d] mb-1">
                    {orders.shop.name}
                  </p>

                  <div className="text-sm md:text-base text-gray-700">
                    <p className="truncate">
                      <span className="font-semibold">Items: </span>
                      {orders.shopOrderItems?.map((i) => i.name).join(", ")}
                    </p>
                    <p className="mt-2">
                      <span className="font-semibold">Subtotal: </span>
                      <span className="text-gray-900">৳ {orders.subTotal}</span>
                    </p>
                    <p className="mt-2">
                      <span className="font-semibold">Delivery Address: </span>
                      <span className="text-gray-700">
                        {currentOrder.deliveryAddress?.text}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-3 md:mt-0 flex flex-col items-start md:items-end gap-3">
                  {/* Status badge */}
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
                      orders.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    {orders.status === "Delivered"
                      ? "Delivered"
                      : orders.status}
                  </span>

                  {/* Delivery boy summary (if assigned) */}
                  {orders.assignedDeliveryBoy ? (
                    <div className="text-sm text-gray-700 text-right">
                      <p className="font-semibold">
                        <span className="text-gray-500">Rider: </span>
                        {orders.assignedDeliveryBoy.fullname}
                      </p>
                      <p className="mt-1 font-medium text-gray-700">
                        <span className="text-gray-500">Phone: </span>
                        {orders.assignedDeliveryBoy.mobileNo}
                      </p>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <p className="font-medium">Rider not assigned yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Map / Tracking */}
              {orders.status !== "Delivered" ? (
                <>
                  {orders.assignedDeliveryBoy ? (
                    <>
                      <div className="col-span-1 flex flex-col justify-center gap-3 px-3">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                          <div className="flex justify-between gap-6">
                            {/* Rider Info */}
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-800">
                                Rider Location
                              </p>
                              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                Lat:{" "}
                                {
                                  orders.assignedDeliveryBoy.location
                                    .coordinates[1]
                                }{" "}
                                <br />
                                Lon:{" "}
                                {
                                  orders.assignedDeliveryBoy.location
                                    .coordinates[0]
                                }
                              </p>
                            </div>

                            {/* Vertical Divider */}
                            <div className="w-px bg-gray-200"></div>

                            {/* Destination */}
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-800">
                                Destination
                              </p>
                              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                {currentOrder.deliveryAddress?.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DeliveryBoyTracking
                        data={{
                          //If the current delivery boy location is store in liveLocation whiche shows in live by socket.io then send it otherwise send the location get from API call
                          deliveryBoyLocation: liveLocation[
                            orders.assignedDeliveryBoy._id
                          ] || {
                            lat: orders.assignedDeliveryBoy.location
                              .coordinates[1],
                            lon: orders.assignedDeliveryBoy.location
                              .coordinates[0],
                          },
                          customerLocation: {
                            lat: currentOrder.deliveryAddress.latitude,
                            lon: currentOrder.deliveryAddress.longitude,
                          },
                        }}
                      />
                    </>
                  ) : (
                    <p className="mt-3 text-sm text-gray-600">
                      We haven’t assigned a rider yet. We’ll update you as soon
                      as someone picks up your order.
                    </p>
                  )}
                </>
              ) : (
                <div className="mt-3 flex items-center gap-3">
                  <svg
                    className="w-7 h-7 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-lg font-semibold text-green-700">
                    This order was delivered
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
