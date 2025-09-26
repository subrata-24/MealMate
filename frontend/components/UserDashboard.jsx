import React from "react";
import Navbar from "./Navbar";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Page Body */}
      <div className="pt-24 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to MealMate Dashboard
        </h2>
        <p className="text-gray-600">
          Here you can manage your orders, browse restaurants, and explore food
          options.
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;
