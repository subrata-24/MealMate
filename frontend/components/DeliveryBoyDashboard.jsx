import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../src/App";
import DeliveryBoyTracking from "./DeliveryBoyTracking";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useNavigate } from "react-router-dom";

const DeliveryBoyDashboard = () => {
  const { userData, socket } = useSelector((state) => state.user);
  const [availableAssignment, setAvailableAssignment] = useState([]);
  const [currentOrder, setCurrentOrder] = useState();
  const [deliveryBoyPosition, setDeliveryBoyPosition] = useState(null);
  const [otp, setOtp] = useState("");
  const [todayDeliveries, setTodayDeliveries] = useState([]);
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!socket || userData.role != "deliveryBoy") return;
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setDeliveryBoyPosition({ lat: latitude, lon: longitude });
          socket.emit("updateLocation", {
            latitude,
            longitude,
            userId: userData._id,
          });
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [socket, userData]);

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrders._id,
        },
        {
          withCredentials: true,
        }
      );
      setShowOTP(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrders._id,
          otp,
        },
        { withCredentials: true }
      );
      navigate("/complete-order");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const handleTodayDeliveries = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-today-deliveries`,
        { withCredentials: true }
      );
      setTodayDeliveries(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAssignment = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignmnet`, {
        withCredentials: true,
      });
      setAvailableAssignment(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentOrder = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/get-current-order`,
        {
          withCredentials: true,
        }
      );
      setCurrentOrder(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptOrder = async (assignmentId) => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/order/accept-order/${assignmentId}`,
        {
          withCredentials: true,
        }
      );
      await getCurrentOrder();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewAssignment = (data) => {
      if (data.sentTo == userData._id && data.status == "Out of Delivery") {
        setAvailableAssignment((prev) => [data, ...prev]);
      }
    };

    socket.on("newAssignment", handleNewAssignment);

    return () => {
      socket.off("newAssignment", handleNewAssignment);
    };
  }, [socket, userData._id]);

  useEffect(() => {
    getAssignment();
    getCurrentOrder();
    handleTodayDeliveries();
  }, [userData]);

  const earningPerDelivery = 50;
  const totalEarning = todayDeliveries.reduce(
    (sum, delivery) => (sum += delivery.count * earningPerDelivery),
    0
  );

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <Navbar />

      <main className="w-full max-w-4xl px-4 py-6 sm:py-8 space-y-8">
        {/* Welcome Section with GPS Coordinates */}
        <section className="relative">
          <div className="relative bg-gradient-to-br from-white to-orange-50/30 rounded-2xl border-2 border-orange-100 shadow-xl hover:shadow-2xl p-6 sm:p-8 transition-all duration-500 overflow-hidden">
            {/* Decorative gradient orb */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl"></div>

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Welcome,{" "}
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {userData.fullname}
                  </span>
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-600 font-medium">
                  Accept the orders that fit your route best 🚴‍♂️
                </p>
              </div>

              {/* GPS Coordinates */}
              <div className="flex gap-3 items-center">
                <div className="group text-center px-4 py-2 bg-white border-2 border-orange-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Latitude
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {(
                      deliveryBoyPosition?.lat ||
                      userData?.location?.coordinates[1]
                    )?.toFixed(4) || "—"}
                  </div>
                </div>
                <div className="group text-center px-4 py-2 bg-white border-2 border-orange-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Longitude
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {(
                      deliveryBoyPosition?.lon ||
                      userData?.location?.coordinates[0]
                    )?.toFixed(4) || "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Today's Deliveries Chart & Earnings */}
        <section className="relative">
          <div className="bg-gradient-to-br from-orange-50 via-white to-green-50 rounded-2xl shadow-xl hover:shadow-2xl border-2 border-orange-100 p-6 sm:p-8 transition-all duration-500 overflow-hidden">
            {/* Decorative gradient orb */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl"></div>

            {/* Section Header */}
            <div className="relative mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Today's{" "}
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Performance
                </span>
              </h2>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Track your deliveries and earnings
              </p>
            </div>

            {/* Chart or Empty State */}
            {totalEarning > 0 ? (
              <div className="relative bg-white rounded-2xl border-2 border-orange-100 shadow-lg p-4 sm:p-6 mb-6">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={todayDeliveries}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f97316"
                      opacity={0.1}
                    />
                    <XAxis
                      dataKey="hour"
                      tickFormatter={(h) => `${h}:00`}
                      stroke="#9ca3af"
                      style={{ fontSize: "12px", fontWeight: "500" }}
                    />
                    <YAxis
                      allowDecimals={false}
                      stroke="#9ca3af"
                      style={{ fontSize: "12px", fontWeight: "500" }}
                    />
                    <Tooltip
                      formatter={(value) => [value, "deliveries"]}
                      labelFormatter={(label) => `${label}:00`}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "2px solid #fed7aa",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        fontWeight: "600",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="url(#colorGradient)"
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient
                        id="colorGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ea580c" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="relative bg-white rounded-2xl border-2 border-orange-100 shadow-lg p-8 mb-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-red-100">
                  <span className="text-3xl">📊</span>
                </div>
                <p className="text-base text-gray-600 font-medium">
                  You haven't completed any deliveries today yet.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  The chart will appear after your first delivery! 🚀
                </p>
              </div>
            )}

            {/* Earnings Card */}
            <div className="relative group/card max-w-sm mx-auto bg-gradient-to-br from-white to-green-50/30 rounded-2xl border-2 border-green-200 shadow-xl hover:shadow-2xl p-6 sm:p-8 transition-all duration-500 overflow-hidden">
              <div className="absolute -top-5 -right-5 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-2xl"></div>

              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg text-white text-2xl transform group-hover/card:scale-110 transition-transform duration-300">
                  💰
                </div>
              </div>

              <div className="relative text-center">
                <p className="text-xs text-gray-600 font-bold uppercase tracking-wider mb-3">
                  Today's Earnings
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">৳</span>
                  <span className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {totalEarning}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-2">
                  Keep up the great work! 🚀
                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
          </div>
        </section>

        {/* Available Orders Section */}
        {!currentOrder && (
          <section>
            <div className="bg-white rounded-2xl border-2 border-orange-100 shadow-xl hover:shadow-2xl p-6 sm:p-8 transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Available Orders
                </h2>
                <div className="relative">
                  <span className="inline-flex items-center justify-center min-w-[2.5rem] h-10 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-extrabold rounded-full shadow-lg">
                    {availableAssignment.length}
                  </span>
                  {availableAssignment.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse ring-2 ring-white"></span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {availableAssignment.length > 0 ? (
                  availableAssignment.map((a, index) => (
                    <div
                      key={index}
                      className="group/order relative bg-gradient-to-br from-white to-orange-50/20 border-2 border-orange-100 rounded-2xl shadow-md hover:shadow-2xl hover:border-orange-300 p-5 transition-all duration-500 overflow-hidden"
                    >
                      <div className="absolute -top-5 -right-5 w-24 h-24 bg-gradient-to-br from-orange-200/10 to-red-200/10 rounded-full blur-xl opacity-0 group-hover/order:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-md text-white text-lg flex-shrink-0">
                              🍽️
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-gray-900 truncate">
                                {a.shopName}
                              </h3>
                              <p className="text-sm text-gray-600 font-medium truncate mt-1">
                                📍 {a.deliveryAddress.text}
                              </p>
                            </div>
                          </div>

                          {/* Items Grid */}
                          <div className="bg-white rounded-xl border border-orange-100 p-3 mb-3">
                            <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
                              {a.items.map((it, idx) => (
                                <React.Fragment key={idx}>
                                  <div className="truncate font-medium">
                                    {it.name}
                                  </div>
                                  <div className="text-center text-gray-600">
                                    ×{it.quantity}
                                  </div>
                                  <div className="text-right font-bold text-orange-600">
                                    ৳{it.price}
                                  </div>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-600">
                              Total:
                            </span>
                            <span className="text-xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                              ৳{a.subTotal}
                            </span>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end gap-3">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 border-2 border-green-200 rounded-full text-xs font-bold shadow-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            New Order
                          </div>
                          <button
                            className="group/btn relative px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-extrabold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 overflow-hidden"
                            onClick={() => acceptOrder(a.assignmentID)}
                          >
                            <span className="relative z-10">Accept Order</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-orange-50">
                      <span className="text-4xl">📦</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-600">
                      No available orders
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      New orders will appear here automatically
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Current Order Processing */}
        {currentOrder && (
          <section>
            <div className="bg-gradient-to-br from-white to-blue-50/20 rounded-2xl border-2 border-blue-100 shadow-xl hover:shadow-2xl p-6 sm:p-8 transition-all duration-500 overflow-hidden relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>

              <div className="relative mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                  <span className="text-3xl">🚚</span>
                  Currently Processing
                </h2>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  Deliver this order to complete your route
                </p>
              </div>

              {/* Order Details Card */}
              <div className="relative bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-md text-white text-xl flex-shrink-0">
                    🏪
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {currentOrder.shopName}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium mb-3">
                      📍 {currentOrder.deliveryAddress.text}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-700 font-medium">
                        {currentOrder.shopOrders.shopOrderItems.length} items
                      </span>
                      <span className="text-xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        ৳{currentOrder.shopOrders.subTotal}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracking Map */}
              <div className="mb-6">
                <DeliveryBoyTracking
                  data={{
                    deliveryBoyLocation: deliveryBoyPosition || {
                      lat: userData.location.coordinates[1],
                      lon: userData.location.coordinates[0],
                    },
                    customerLocation: {
                      lat: currentOrder.deliveryAddress.latitude,
                      lon: currentOrder.deliveryAddress.longitude,
                    },
                  }}
                />
              </div>

              {/* OTP Section */}
              {!showOTP ? (
                <button
                  className={`group/btn relative w-full py-4 px-6 
    bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 
    hover:from-orange-600 hover:via-red-600 hover:to-orange-700 
    text-white font-extrabold text-lg rounded-2xl shadow-xl 
    hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 
    active:scale-95 transition-all duration-300 focus:outline-none 
    focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 overflow-hidden
    ${loading ? "cursor-not-allowed opacity-70" : ""}
  `}
                  onClick={handleSendOTP}
                  disabled={loading}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <span className="text-2xl">✅</span>
                        Mark as Delivered
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              ) : (
                <div className="bg-white rounded-2xl border-2 border-orange-100 shadow-xl p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white text-xl">
                      🔐
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                        Verify Delivery
                      </p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        OTP sent to{" "}
                        <span className="font-bold text-orange-600">
                          {currentOrder.user.fullname}
                        </span>
                      </p>
                    </div>
                  </div>

                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-500 transition-all duration-200 mb-4 text-center text-2xl font-bold tracking-widest"
                    placeholder="••••"
                    maxLength="4"
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                  />

                  {error && (
                    <p className="text-red-500 text-sm font-semibold mb-4">
                      {error}
                    </p>
                  )}

                  <button
                    className="group/btn relative w-full py-4 px-6 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 text-white font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-offset-2 overflow-hidden"
                    onClick={handleVerifyOtp}
                  >
                    <span className="relative z-10">Submit OTP</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default DeliveryBoyDashboard;
