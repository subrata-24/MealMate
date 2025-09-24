import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../../components/UserDashboard";
import OwnerDashboard from "../../components/OwnerDashboard";
import DeliveryBoyDashboard from "../../components/DeliveryBoyDashboard";

const Home = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-green-50 flex flex-col items-center pt-24 px-4 font-sans">
      {userData.role === "user" && <UserDashboard />}
      {userData.role === "owner" && <OwnerDashboard />}
      {userData.role === "deliveryBoy" && <DeliveryBoyDashboard />}
    </div>
  );
};

export default Home;
