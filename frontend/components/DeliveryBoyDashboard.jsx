import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const DeliveryBoyDashboard = () => {
  const { userData } = useSelector((state) => state.user);
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
      </div>
    </div>
  );
};

export default DeliveryBoyDashboard;
