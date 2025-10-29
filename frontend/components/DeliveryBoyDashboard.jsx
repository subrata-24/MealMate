import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../src/App";
import DeliveryBoyTracking from "./DeliveryBoyTracking";

const DeliveryBoyDashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const [availableAssignment, setAvailableAssignment] = useState([]);
  const [currentOrder, setCurrentOrder] = useState();
  const [otp, setOtp] = useState("");

  const [showOTP, setShowOTP] = useState(false);

  const handleSendOTP = async () => {
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
      // console.log(result.data);
      setShowOTP(true);
    } catch (error) {
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
      console.log(result.data);
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
      console.log(result.data);
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
    getAssignment();
    getCurrentOrder();
  }, [userData]);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-700">
      <Navbar />

      <main className="w-full max-w-3xl px-4 py-1">
        <section className="mb-5">
          <div className="flex items-center justify-between bg-white border border-orange-100 rounded-2xl p-4 shadow-2xl">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Welcome,{" "}
                <span className="text-orange-500">{userData.fullname}</span>
              </h1>
              <p className="mt-1 text-sm md:text-base text-gray-600">
                Accept the orders that fit your route best.
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <div className="text-center px-3 py-1 bg-white border border-gray-100 rounded-lg shadow-lg">
                <div className="text-xs md:text-sm text-gray-500">Lat</div>
                <div className="text-sm md:text-base font-medium text-gray-900">
                  {userData.location.coordinates[1]}
                </div>
              </div>
              <div className="text-center px-3 py-1 bg-white border border-gray-100 rounded-lg shadow-lg">
                <div className="text-xs md:text-sm text-gray-500">Lng</div>
                <div className="text-sm md:text-base font-medium text-gray-900">
                  {userData.location.coordinates[0]}
                </div>
              </div>
            </div>
          </div>
        </section>

        {!currentOrder && (
          <section>
            <div className="bg-white rounded-2xl border border-orange-100 shadow-2xl p-4 md:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  Available Orders
                </h2>
                <span className="text-sm md:text-base text-orange-600 font-semibold bg-orange-50 px-3 py-1 rounded-full shadow-lg">
                  {availableAssignment.length}
                </span>
              </div>

              <div className="space-y-4">
                {availableAssignment.length > 0 ? (
                  availableAssignment.map((a, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-2xl 
             transition-all duration-300 hover:shadow-lg hover:border-orange-400 hover:ring-2 hover:ring-orange-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                              {a.shopName}
                            </h3>
                            <div className="text-sm md:text-base font-medium text-gray-800">
                              {" "}
                              Total amount: ৳ {a.subTotal}
                            </div>
                          </div>
                          <p className="mt-1 text-sm md:text-base text-gray-700 truncate">
                            {a.deliveryAddress.text}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="text-xs md:text-sm text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-medium shadow-2xl">
                            New
                          </div>
                          <button
                            className="text-sm md:text-base font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white shadow hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => acceptOrder(a.assignmentID)}
                          >
                            Accept
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-sm md:text-base text-gray-700">
                        {a.items.map((it, idx) => (
                          <React.Fragment key={idx}>
                            <div className="truncate">{it.name}</div>
                            <div className="text-right">x{it.quantity}</div>
                            <div className="text-right font-medium">
                              ৳ {it.price}
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-base md:text-lg text-gray-500">
                    No available order
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {currentOrder && (
          <div className="bg-white rounded-2xl p-5 shadow-2xl w-full max-w-3xl border border-orange-100 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              🚚 Currently Processing Order
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-2xl hover:shadow-md transition-all duration-300 hover:ring-2 hover:ring-orange-200 hover:border-orange-300">
              <p className="text-lg font-semibold text-gray-900 truncate">
                {currentOrder.shopName}
              </p>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                {currentOrder.deliveryAddress.text}
              </p>
              <p className="mt-2 text-gray-700 text-sm md:text-base font-medium">
                {currentOrder.shopOrders.shopOrderItems.length} items |{" "}
                <span className="font-bold text-gray-900">
                  ৳ {currentOrder.shopOrders.subTotal}
                </span>
              </p>
            </div>

            <DeliveryBoyTracking data={currentOrder} />

            {!showOTP ? (
              <button
                className="mt-5 w-full py-3 px-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer"
                onClick={handleSendOTP}
              >
                ✅ Mark as Delivered
              </button>
            ) : (
              <div className="mt-5 p-5 bg-white rounded-2xl shadow-2xl border border-gray-200">
                <p className="text-gray-700 font-semibold mb-3 text-sm md:text-base">
                  Enter the OTP sent to{" "}
                  <span className="text-headingText">
                    {currentOrder.user.fullname}
                  </span>
                </p>
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-sm transition-all duration-300 placeholder-gray-400"
                  placeholder="Enter OTP here"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                />
                <button
                  className="w-full py-3 font-bold text-white rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 hover:scale-105 shadow-button transition-transform duration-300 cursor-pointer"
                  onClick={handleVerifyOtp}
                >
                  Submit OTP
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default DeliveryBoyDashboard;
