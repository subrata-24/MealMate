import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../src/App";

const DeliveryBoyDashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const [availableAssignment, setAvailableAssignment] = useState([]);
  const getAssignment = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignmnet`, {
        withCredentials: true,
      });
      console.log(result);
      setAvailableAssignment(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAssignment();
  }, [userData]);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-4 items-center bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-y-auto">
      <Navbar />
      <div
        className="w-full max-w-[800px] flex flex-col gap-4 items-center
      "
      >
        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start items-center w-[90%] border border-orange-100 text-center gap-2">
          <h1 className="text-xl font-bold text-[#ff4d2d]">
            Welcome, {userData.fullname}
          </h1>
          <p className="text-[#ff4d2d]">
            {" "}
            <span className="font-semibold">Latitude: </span>
            {userData.location.coordinates[1]},{"  "}
            <span className="font-semibold">Longitude: </span>
            {userData.location.coordinates[0]}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100">
          <h1 className="text-lg font-bold mb-4 flex items-center gap-2">
            Available Orders
          </h1>

          <div className="space-y-4">
            {availableAssignment.length > 0 ? (
              availableAssignment.map((a, index) => (
                <div
                  className="border rounded-lg p-4 flex flex-col justify-between items-center"
                  key={index}
                >
                  <p>
                    <span className="font-semibold">Shop name: </span>
                    {a.shopName}
                  </p>
                  <p>
                    <span className="font-semibold">Delivery Address: </span>
                    {a.deliveryAddress.text}
                  </p>
                  {a.items.map((it, idx) => (
                    <>
                      <p>
                        <span>Item name: </span>
                        {it.name}
                      </p>
                      <p>
                        <span>Item price: </span>
                        {it.price}
                      </p>
                      <p>
                        <span>Item quantity: </span>
                        {it.quantity}
                      </p>
                    </>
                  ))}
                  <p>
                    <span>Total amount: </span>
                    {a.subTotal}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 font-sm">No available order</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBoyDashboard;
